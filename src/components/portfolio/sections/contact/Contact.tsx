"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { ContactHeader } from "./ContactHeader";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

/**
 * Contact component that displays a contact form and contact information.
 * @returns A section containing the contact form and contact details.
 */
export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-main-bg-dark relative z-0 overflow-hidden py-20"
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
        <ContactHeader isInView={isInView} />

        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-10">
            {/* Contact Information */}
            <ContactInfo isInView={isInView} />

            {/* Contact Form */}
            <ContactForm isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
};
