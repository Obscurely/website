import { NextRequest, NextResponse } from "next/server";

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromEnv, fromIni } from "@aws-sdk/credential-providers";
import { SITE_CONFIG } from "@data/common/site";
import { rateLimit } from "@lib/rate-limit";
import { checkEmail, decodeHtml } from "@utils/portfolio/contact";
import sanitizeHtml from "sanitize-html";

// Validate required environment variables
const requiredEnvVars = {
  FROM_EMAIL: SITE_CONFIG.fromEmail,
  TO_EMAIL: SITE_CONFIG.toEmail,
} as const;

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// Create SES client
const createSESClient = () => {
  const region = process.env["AWS_REGION"] || "eu-central-1";

  // Try different credential sources in order
  const credentialProviders = [
    // 1. Try AWS credentials file first
    fromIni({
      profile: process.env["AWS_PROFILE"] || "default",
    }),
    // 2. Fall back to environment variables
    fromEnv(),
  ];

  return new SESClient({
    region,
    credentials: async () => {
      for (const provider of credentialProviders) {
        try {
          const credentials = await provider();
          console.log("Successfully loaded AWS credentials");
          return credentials;
        } catch (error) {
          console.warn(`Failed to load credentials from provider:`, error);
          continue;
        }
      }
      throw new Error("No valid AWS credentials found");
    },
  });
};

const ses = createSESClient();

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 60 minutes
  uniqueTokenPerInterval: 100, // Max 100 unique tokens per interval
});

// Input validation schema
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    const forwardedIPs = forwarded.split(",");
    if (forwardedIPs[0]) {
      return forwardedIPs[0].trim();
    }
  }

  if (realIP) {
    return realIP;
  }

  return "anonymous";
};

function validateInput(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Type guard to ensure data is an object
  if (!data || typeof data !== "object") {
    errors.push("Invalid data format");
    return { isValid: false, errors };
  }

  const formData = data as Record<string, unknown>;

  if (
    !formData["name"] ||
    typeof formData["name"] !== "string" ||
    formData["name"].trim().length < 2
  ) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!formData["email"] || typeof formData["email"] !== "string") {
    errors.push("Valid email is required");
  }

  if (
    !formData["subject"] ||
    typeof formData["subject"] !== "string" ||
    formData["subject"].trim().length < 3
  ) {
    errors.push("Subject must be at least 3 characters long");
  }

  if (
    !formData["message"] ||
    typeof formData["message"] !== "string" ||
    formData["message"].trim().length < 10
  ) {
    errors.push("Message must be at least 10 characters long");
  }

  // Check field lengths
  if (
    formData["name"] &&
    typeof formData["name"] === "string" &&
    formData["name"].length > 100
  ) {
    errors.push("Name must be less than 100 characters");
  }

  if (
    formData["subject"] &&
    typeof formData["subject"] === "string" &&
    formData["subject"].length > 200
  ) {
    errors.push("Subject must be less than 200 characters");
  }

  if (
    formData["message"] &&
    typeof formData["message"] === "string" &&
    formData["message"].length > 5000
  ) {
    errors.push("Message must be less than 5000 characters");
  }

  return { isValid: errors.length === 0, errors };
}

function sanitizeInput(data: ContactFormData): ContactFormData {
  const options = {
    allowedTags: [], // Remove ALL HTML tags
    allowedAttributes: {}, // Remove ALL attributes
    textFilter: (text: string) => text, // Prevent accidental text modification
  };

  return {
    name: decodeHtml(sanitizeHtml(data.name.trim(), options)),
    email: sanitizeHtml(data.email.trim().toLowerCase(), options),
    subject: decodeHtml(sanitizeHtml(data.subject.trim(), options)),
    message: decodeHtml(sanitizeHtml(data.message.trim(), options)),
  };
}

export async function POST(request: NextRequest) {
  try {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin":
        process.env["ALLOWED_ORIGIN"] || "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Rate limiting
    const ip = getClientIP(request);

    console.log(`Client IP: ${ip}`);

    try {
      await limiter.check(2, ip); // 2 requests per 60 minutes per IP
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders }
      );
    }

    console.log(`Rate limit check passed for IP: ${ip}`);

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate input
    const { isValid, errors } = validateInput(body);
    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(body);

    // Additional email validation using utility function
    const emailValidation = checkEmail(sanitizedData.email);
    if (!emailValidation) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          details: "The provided email doesn't match the RFC 5322 format",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log("Input sanitized and validated");

    // Send email via SES
    const command = new SendEmailCommand({
      Source: requiredEnvVars.FROM_EMAIL!,
      Destination: {
        ToAddresses: [requiredEnvVars.TO_EMAIL!],
      },
      Message: {
        Subject: {
          Data: `Portfolio Contact: ${sanitizedData.subject}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`,
            Charset: "UTF-8",
          },
        },
      },
    });

    await ses.send(command);

    console.log("Email sent successfully");

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Don't expose internal errors to client
    const isProduction = process.env.NODE_ENV === "production";
    const errorMessage = isProduction
      ? "An unexpected error occurred. Please try again later."
      : error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env["ALLOWED_ORIGIN"] || "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
