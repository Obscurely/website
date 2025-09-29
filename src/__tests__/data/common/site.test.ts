import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SITE_CONFIG, SITE_URL } from "../../../data/common/site";

describe("Site Configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("SITE_URL", () => {
    it("should use environment variable when provided", async () => {
      process.env["NEXT_PUBLIC_SITE_URL"] = "https://test.example.com";

      // Re-import to get updated environment value
      const { SITE_URL } = await import("../../../data/common/site");
      expect(SITE_URL).toBe("https://test.example.com");
    });

    it("should fall back to default URL when environment variable is not set", async () => {
      delete process.env["NEXT_PUBLIC_SITE_URL"];

      const { SITE_URL } = await import("../../../data/common/site");
      expect(SITE_URL).toBe("https://adriancrismaruc.com");
    });
  });

  describe("SITE_CONFIG", () => {
    it("should have correct basic configuration", () => {
      expect(SITE_CONFIG.name).toBe("Adrian Crîșmaruc");
      expect(SITE_CONFIG.firstName).toBe("Adrian");
      expect(SITE_CONFIG.lastName).toBe("Crîșmaruc");
    });

    it("should have detailed description", () => {
      expect(SITE_CONFIG.description).toContain("Full-Stack Developer");
      expect(SITE_CONFIG.description).toContain("Adrian Crîșmaruc");
      expect(SITE_CONFIG.description).toContain("Rust");
      expect(SITE_CONFIG.description).toContain("Python");
      expect(SITE_CONFIG.description).toContain("React");
      expect(SITE_CONFIG.description).toContain("TypeScript");
      expect(SITE_CONFIG.description).toContain("AWS");
      expect(SITE_CONFIG.description).toContain("Kubernetes");
    });

    it("should have blog-specific description", () => {
      expect(SITE_CONFIG.blogDescription).toContain("Practical tutorials");
      expect(SITE_CONFIG.blogDescription).toContain("Adrian Crîșmaruc");
      expect(SITE_CONFIG.blogDescription).toContain("Full-Stack Developer");
    });

    it("should have correct URL configuration", () => {
      expect(SITE_CONFIG.url).toBe(SITE_URL);
    });

    it("should have author information", () => {
      expect(SITE_CONFIG.author).toEqual({
        name: "Adrian Crîșmaruc",
        url: SITE_URL,
      });
    });

    it("should use environment variables for email configuration", async () => {
      process.env["FROM_EMAIL"] = "from@test.com";
      process.env["TO_EMAIL"] = "to@test.com";

      const { SITE_CONFIG } = await import("../../../data/common/site");
      expect(SITE_CONFIG.fromEmail).toBe("from@test.com");
      expect(SITE_CONFIG.toEmail).toBe("to@test.com");
    });

    it("should fall back to default emails when environment variables are not set", async () => {
      delete process.env["FROM_EMAIL"];
      delete process.env["TO_EMAIL"];

      const { SITE_CONFIG } = await import("../../../data/common/site");
      expect(SITE_CONFIG.fromEmail).toBe("contact@adriancrismaruc.com");
      expect(SITE_CONFIG.toEmail).toBe("contact@adriancrismaruc.com");
    });

    it("should have social media links", () => {
      expect(SITE_CONFIG.social).toEqual({
        github: "https://github.com/Obscurely",
        linkedIn: "https://www.linkedin.com/in/adrian-crismaruc",
        upwork: "https://www.upwork.com/freelancers/adriancrismaruc",
        reddit: "https://www.reddit.com/user/CrismarucAdrian",
      });
    });

    it("should have website source link", () => {
      expect(SITE_CONFIG.websiteSource).toBe(
        "https://github.com/Obscurely/website"
      );
    });

    it("should be marked as const", () => {
      // Test that the config object is readonly
      expect(() => {
        // @ts-expect-error - Testing readonly behavior
        SITE_CONFIG.name = "New Name";
      }).not.toThrow(); // Runtime doesn't prevent this, but TypeScript should
    });

    it("should have valid URL formats", () => {
      const urlRegex = /^https?:\/\/.+/;

      expect(SITE_CONFIG.url).toMatch(urlRegex);
      expect(SITE_CONFIG.social.github).toMatch(urlRegex);
      expect(SITE_CONFIG.social.linkedIn).toMatch(urlRegex);
      expect(SITE_CONFIG.social.reddit).toMatch(urlRegex);
      expect(SITE_CONFIG.websiteSource).toMatch(urlRegex);
    });

    it("should have valid email formats", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(SITE_CONFIG.fromEmail).toMatch(emailRegex);
      expect(SITE_CONFIG.toEmail).toMatch(emailRegex);
    });

    it("should include all required fields", () => {
      const requiredFields = [
        "name",
        "firstName",
        "lastName",
        "description",
        "blogDescription",
        "url",
        "author",
        "fromEmail",
        "toEmail",
        "social",
        "websiteSource",
      ];

      requiredFields.forEach((field) => {
        expect(SITE_CONFIG).toHaveProperty(field);
        expect(SITE_CONFIG[field as keyof typeof SITE_CONFIG]).toBeDefined();
      });
    });

    it("should have all required social media platforms", () => {
      const requiredSocials = ["github", "upwork", "linkedIn", "reddit"];

      requiredSocials.forEach((platform) => {
        expect(SITE_CONFIG.social).toHaveProperty(platform);
        expect(
          SITE_CONFIG.social[platform as keyof typeof SITE_CONFIG.social]
        ).toBeTruthy();
      });
    });
  });
});
