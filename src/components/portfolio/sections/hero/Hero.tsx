import { TimeProvider } from "@contexts/portfolio/TimeContext";

import { ArrowDown } from "./ArrowDown";
import { Sidebar } from "./sidebar/Sidebar";
import { Terminal } from "./terminal/Terminal";

/**
 * The hero section of the portfolio page
 */
export const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center pt-16 pb-6"
    >
      <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-8">
            <TimeProvider>
              {/* Left Column - Terminal Window */}
              <Terminal />

              {/* Right Column - Profile & Status Widgets */}
              <Sidebar />
            </TimeProvider>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform sm:block">
          <ArrowDown />
        </div>
      </div>
    </section>
  );
};
