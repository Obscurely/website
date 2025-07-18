"use client";

import { Button } from "@ui/button";
import { IconSend, IconLoader2, IconCheck } from "@tabler/icons-react";
import { useContact } from "@hooks/portfolio/useContact";
import { FormField } from "./FormField";
import { FormTextarea } from "./FormTextarea";

export const ContactForm = () => {
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
    <div className="flex-1 lg:flex-[2]">
      <div className="border-slate-740 flex h-full flex-col rounded-xl border bg-slate-800/20 p-6">
        <h3 className="mb-6 text-2xl font-bold text-white">Send Message</h3>

        <div className="flex flex-1 flex-col">
          {" "}
          {isSubmitted ? (
            <div
              key="success"
              className="min-h-none data-[state=show]:animate-in fade-in zoom-in-90 flex min-h-[484px] flex-1 flex-col justify-center py-8 text-center opacity-0 duration-500 ease-out will-change-transform data-[state=show]:opacity-100 sm:min-h-[483px] md:min-h-[387px]"
              data-state="show"
            >
              <div className="from-green-520 to-emerald-520 animate-spring-scale mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r text-green-400 will-change-transform">
                <IconCheck className="h-10 w-10" />
              </div>
              <h4 className="mb-4 text-2xl font-bold text-white">
                Message Delivered!
              </h4>
              <p className="mx-auto mb-6 max-w-md text-base leading-relaxed text-slate-400">
                Thank you for reaching out. I'll review your message and get
                back to you within 24 hours.
              </p>
              <Button
                onClick={resetForm}
                className="group overflow-hiddenpy-3 relative mx-auto w-full cursor-pointer text-white transition-all duration-300 will-change-transform focus:ring-2 sm:w-auto sm:px-6"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-base font-semibold">
                  Send Another Message
                </span>
              </Button>
            </div>
          ) : (
            <form
              key="form"
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
                  placeholder="What would you like to discuss? (max 5000 characters)"
                  required
                  maxLength={5000}
                  onChange={(value) => handleInputChange("message", value)}
                  onBlur={() => handleBlur("message")}
                />
              </div>

              {/* Button */}
              <div className="mt-6 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`group relative w-full cursor-pointer overflow-hidden rounded-lg py-3 text-white transition-all duration-300 will-change-transform focus:ring-2 ${
                    isSubmitting || !isFormValid
                      ? "cursor-not-allowed bg-slate-600 opacity-60"
                      : ""
                  }`}
                  aria-describedby="submit-status"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-base font-semibold">
                    {isSubmitting ? (
                      <>
                        <IconLoader2 className="h-5 w-5 animate-spin" />
                        <span id="submit-status">Sending your message...</span>
                      </>
                    ) : (
                      <>
                        <IconSend className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span id="submit-status">Send Message</span>
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
