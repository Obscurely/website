"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import {
  IconSend,
  IconLoader2,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";
import { checkEmail } from "@utils/portfolio/contact";

const API_ENDPOINT = "/api/contact";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const INITIAL_TOUCHED_STATE = {
  name: true,
  email: true,
  subject: true,
  message: true,
};

/**
 * Contact component that displays a contact form and contact information.
 * Features modern design, accessibility, and enhanced user experience.
 *
 * @returns A section containing the contact form and contact details.
 */
export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Minimum 2 characters" : "";
      case "email":
        return !checkEmail(value) ? "Invalid email" : "";
      case "subject":
        return value.trim().length < 3 ? "Minimum 3 characters" : "";
      case "message":
        return value.trim().length < 10 ? "Minimum 10 characters" : "";
      default:
        return "";
    }
  }, []);

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, formData[name as keyof FormData]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [formData, validateField]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(INITIAL_TOUCHED_STATE);
    return isValid;
  }, [formData, validateField]);

  const isFormValid = useMemo((): boolean => {
    // Check if all required fields have values
    const hasAllValues = Object.values(formData).every(
      (value) => value.trim().length > 0
    );

    // Check current field values against validation rules in real-time
    const hasNoValidationErrors = Object.entries(formData).every(
      ([key, value]) => {
        const error = validateField(key, value);
        return !error;
      }
    );

    return hasAllValues && hasNoValidationErrors;
  }, [formData, validateField]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 429) {
            toast.error("Too many requests. Please try again later.");
          } else if (response.status === 400) {
            toast.error(data.error || "Please check your input and try again.");
          } else {
            toast.error(
              data.error || "Failed to send message. Please try again later."
            );
          }
          return;
        }

        // Success
        setIsSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData(INITIAL_FORM_DATA);
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, formData]
  );

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM_DATA);
    setTouched({});
    setErrors({});
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-0 overflow-hidden bg-slate-900/40 py-20"
      aria-labelledby="contact-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Header isInView={isInView} />

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-10">
            {/* Contact Information */}
            <ContactInfo isInView={isInView} />

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex-1 lg:flex-[2]"
            >
              <div className="flex h-full flex-col rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Send Message
                </h3>

                <div className="flex flex-1 flex-col">
                  {" "}
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-1 flex-col justify-center py-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 will-change-transform"
                        >
                          <IconCheck className="h-10 w-10" />
                        </motion.div>
                        <h4 className="mb-4 text-2xl font-bold text-white">
                          Message Delivered!
                        </h4>
                        <p className="mx-auto mb-6 max-w-md text-base leading-relaxed text-slate-400">
                          Thank you for reaching out. I'll review your message
                          and get back to you within 24 hours.
                        </p>
                        <Button
                          onClick={resetForm}
                          className="group relative mx-auto w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20 focus:ring-2 focus:ring-cyan-500/50 sm:w-auto sm:px-6"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3 text-base font-semibold">
                            Send Another Message
                          </span>
                          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col"
                        noValidate
                      >
                        <div className="flex flex-1 flex-col space-y-6">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Name field */}
                            <div className="space-y-2">
                              <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-slate-300"
                              >
                                Name *
                                {errors.name && (
                                  <span className="relative ml-2 inline-flex items-center gap-1 text-red-400">
                                    <IconAlertCircle className="absolute left-0 h-4 w-4" />
                                    <span className="ml-5">{errors.name}</span>
                                  </span>
                                )}
                              </label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                                onBlur={() => handleBlur("name")}
                                placeholder="John Doe"
                                required
                                maxLength={100}
                                aria-invalid={!!errors.name}
                                className={`h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                  errors.name
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-slate-700/50 focus:border-cyan-500"
                                }`}
                              />
                            </div>

                            {/* Email field */}
                            <div className="space-y-2">
                              <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-300"
                              >
                                Email Address *
                                {errors.email && (
                                  <span className="relative ml-2 inline-flex items-center gap-1 text-red-400">
                                    <IconAlertCircle className="absolute left-0 h-4 w-4" />
                                    <span className="ml-5">{errors.email}</span>
                                  </span>
                                )}
                              </label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                onBlur={() => handleBlur("email")}
                                placeholder="john@example.com"
                                required
                                aria-invalid={!!errors.email}
                                className={`h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                  errors.email
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-slate-700/50 focus:border-cyan-500"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Subject field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-semibold text-slate-300"
                            >
                              Subject *
                              {errors.subject && (
                                <span className="relative ml-2 inline-flex items-center gap-1 text-red-400">
                                  <IconAlertCircle className="absolute left-0 h-4 w-4" />
                                  <span className="ml-5">{errors.subject}</span>
                                </span>
                              )}
                            </label>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) =>
                                handleInputChange("subject", e.target.value)
                              }
                              onBlur={() => handleBlur("subject")}
                              placeholder="What can I help you with?"
                              required
                              maxLength={200}
                              aria-invalid={!!errors.subject}
                              className={`h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                errors.subject
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-slate-700/50 focus:border-cyan-500"
                              }`}
                            />
                          </div>

                          {/* Message field */}
                          <div className="flex flex-1 flex-col space-y-2">
                            <label
                              htmlFor="message"
                              className="block text-sm font-semibold text-slate-300"
                            >
                              Message *
                              {errors.message && (
                                <span className="relative ml-2 inline-flex items-center gap-1 text-red-400">
                                  <IconAlertCircle className="absolute left-0 h-4 w-4" />
                                  <span className="ml-5">{errors.message}</span>
                                </span>
                              )}
                            </label>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) =>
                                handleInputChange("message", e.target.value)
                              }
                              onBlur={() => handleBlur("message")}
                              placeholder="What would you like to discuss? (max 2000 characters)"
                              required
                              maxLength={2000}
                              aria-invalid={!!errors.message}
                              className={`min-h-[100px] flex-1 resize-none rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                errors.message
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-slate-700/50 focus:border-cyan-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Button */}
                        <div className="mt-6 pt-2">
                          <Button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className={`group relative w-full cursor-pointer overflow-hidden rounded-lg py-3 text-white transition-all duration-300 will-change-transform focus:ring-2 focus:ring-cyan-500/50 ${
                              isSubmitting || !isFormValid
                                ? "cursor-not-allowed bg-slate-600 opacity-60"
                                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/20"
                            }`}
                            aria-describedby="submit-status"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-base font-semibold">
                              {isSubmitting ? (
                                <>
                                  <IconLoader2 className="h-5 w-5 animate-spin" />
                                  <span id="submit-status">
                                    Sending your message...
                                  </span>
                                </>
                              ) : (
                                <>
                                  <IconSend className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                  <span id="submit-status">Send Message</span>
                                </>
                              )}
                            </span>
                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
