import { ContactForm } from "./ContactForm";
import { ContactHeader } from "./ContactHeader";
import { ContactInfo } from "./ContactInfo";

/**
 * Contact component that displays a contact form and contact information.
 * @returns A section containing the contact form and contact details.
 */
export const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-main-bg-dark relative z-0 overflow-hidden py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ContactHeader />

        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-10">
            {/* Contact Information */}
            <ContactInfo />

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
