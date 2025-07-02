"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@ui/button";
import { IconSend, IconLoader2, IconCheck } from "@tabler/icons-react";
import { useContact } from "@hooks/portfolio/useContact";
import { FormField } from "./FormField";
import { FormTextarea } from "./FormTextarea";

interface ContactFormProps {
  isInView: boolean;
}

export const ContactForm = ({ isInView }: ContactFormProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isFormValid,
  } = useContact();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="flex-1 lg:flex-[2]"
    >
      <div className="flex h-full flex-col rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
        <h3 className="mb-6 text-2xl font-bold text-white">Send Message</h3>

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
                  Thank you for reaching out. I'll review your message and get
                  back to you within 24 hours.
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
                    <FormField
                      id="name"
                      label="Name"
                      value={formData.name}
                      error={errors.name}
                      placeholder="John Doe"
                      required
                      maxLength={100}
                      onChange={(value) => handleInputChange("name", value)}
                      onBlur={() => handleBlur("name")}
                    />

                    {/* Email field */}
                    <FormField
                      id="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      error={errors.email}
                      placeholder="john@example.com"
                      required
                      onChange={(value) => handleInputChange("email", value)}
                      onBlur={() => handleBlur("email")}
                    />
                  </div>

                  {/* Subject field */}
                  <FormField
                    id="subject"
                    label="Subject"
                    value={formData.subject}
                    error={errors.subject}
                    placeholder="What can I help you with?"
                    required
                    maxLength={200}
                    onChange={(value) => handleInputChange("subject", value)}
                    onBlur={() => handleBlur("subject")}
                  />

                  {/* Message field */}
                  <FormTextarea
                    id="message"
                    label="Message"
                    value={formData.message}
                    error={errors.message}
                    placeholder="What would you like to discuss? (max 2000 characters)"
                    required
                    maxLength={2000}
                    onChange={(value) => handleInputChange("message", value)}
                    onBlur={() => handleBlur("message")}
                  />
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
  );
};
