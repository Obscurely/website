import { AboutHeader } from "./AboutHeader";
import { AboutJourney } from "./AboutJourney";
import { CertificationsSection } from "./CertificationsSection";
import { ServicesSection } from "./ServicesSection";
import { SkillsSection } from "./skills/SkillsSection";

/**
 * About component that serves as the main section for the "About" page.
 */
export const About = () => {
  return (
    <section
      id="about"
      className="data-[state=once]:animate-slide-fade-in relative z-0 overflow-hidden bg-main-bg-light sm:bg-slate-900/80 py-20 opacity-0 data-[state=once]:opacity-100"
      data-state="once"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-blue-500 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeader />

        <div
          className="relative mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
          style={{ zIndex: 30 }}
        >
          <AboutJourney />
          <SkillsSection />
        </div>

        <div className="mb-20">
          <CertificationsSection />
        </div>

        <div>
          <ServicesSection />
        </div>
      </div>
    </section>
  );
};
