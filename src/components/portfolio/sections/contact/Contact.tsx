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
      className="bg-main-bg-light relative z-0 overflow-hidden py-20"
    >
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
