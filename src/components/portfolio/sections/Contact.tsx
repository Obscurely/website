"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import {
  IconMail,
  IconMapPin2,
  IconSend,
  IconLoader2,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Card, CardContent } from "@ui/card";
import { socials } from "@data/common/socials";
import { toast } from "sonner";

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}\.?$/;

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
        return !emailRegex.test(value) ? "Invalid email" : "";
      case "subject":
        return value.trim().length < 3 ? "Minimum 3 characters" : "";
      case "message":
        return value.trim().length < 10 ? "Minimum 10 characters" : "";
      default:
        return "";
    }
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    return isValid;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      toast.success("Message sent successfully!"); // Show success toast
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contactInfo = [
    {
      icon: <IconMail />,
      title: "Email",
      value: "contact@​adriancrismaruc.com",
      link: "mailto:contact@adriancrismaruc.com",
      description: "Send me an email anytime",
      sameTab: true,
    },
    {
      icon: <IconMapPin2 />,
      title: "Location",
      value: "Iași, Romania (UTC+3)",
      link: "https://maps.google.com/?q=Iași,+Romania",
      description: "Available for remote work",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-0 overflow-hidden bg-slate-900/40 py-20"
      aria-labelledby="contact-heading"
    >
      {/* Subtle background elements - matching About section */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - matching AboutHeader styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Get in Touch
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-slate-400">
              Have a job opportunity, project collaboration, or question in
              mind? Feel free to reach out!
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-10">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 lg:max-w-md"
            >
              <div className="h-full rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Contact Information
                </h3>

                <div className="mb-6 space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="group relative"
                    >
                      <Card className="h-full transform-gpu overflow-hidden border-slate-700/50 bg-slate-800/30 p-0 transition-all duration-300 ease-out will-change-transform hover:translate-y-[-2px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
                        <CardContent className="p-0">
                          <a
                            href={info.link}
                            target={info.sameTab ? "_self" : "_blank"}
                            rel={
                              info.sameTab ? undefined : "noopener noreferrer"
                            }
                            className="flex items-start gap-4 rounded-lg bg-none px-4 py-6 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
                            aria-label={`${info.title}: ${info.value}`}
                          >
                            <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-cyan-500">
                                {info.icon}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                                {info.title}
                              </h4>
                              <div className="text-base font-medium text-slate-300 transition-colors duration-300 group-hover:text-cyan-400">
                                {info.value}
                              </div>
                              <p className="mt-1 text-sm text-slate-400">
                                {info.description}
                              </p>
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <h4 className="mb-4 text-xl font-semibold text-white">
                    Connect With Me
                  </h4>
                  {/* Social Links */}
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-4 sm:justify-start"
                  >
                    {socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/90 text-cyan-500 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
                      >
                        <social.icon size={20} strokeWidth={2.5} />
                      </a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

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
                  {/* This container fills remaining space */}
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
                        className="flex flex-1 flex-col" // Form fills available space
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
                              aria-invalid={!!errors.subject}
                              className={`h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                errors.subject
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-slate-700/50 focus:border-cyan-500"
                              }`}
                            />
                          </div>

                          {/* Message field - takes remaining space */}
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
                              placeholder="What would you like to discuss?"
                              required
                              aria-invalid={!!errors.message}
                              className={`min-h-[100px] flex-1 resize-none rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-500/70 focus:bg-slate-900/70 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none dark:bg-slate-800/32 ${
                                errors.message
                                  ? "border-red-500 focus:border-red-400"
                                  : "border-slate-700/50 focus:border-cyan-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Button - always at bottom */}
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
