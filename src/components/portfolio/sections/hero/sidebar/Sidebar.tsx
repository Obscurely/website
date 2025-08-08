import Image from "next/image";

import { SITE_CONFIG } from "@data/common/site";
import { IconUser } from "@tabler/icons-react";

import { SidebarClock } from "./SidebarClock";

/**
 * The sidebar part of the hero section containing the 2 widgets (profile image and system status).
 */
export const Sidebar = () => {
  return (
    <div
      className="flex flex-col justify-between space-y-8 rounded-2xl will-change-transform md:flex-row md:space-y-0 md:space-x-6 lg:flex-col lg:space-y-8 lg:space-x-0 data-[state=once]:animate-zoom-fade-in"
      data-state="once"
    >
      {/* Profile Widget */}
      <div className="flex flex-1 flex-col rounded-2xl border border-slate-600/30 bg-slate-900/40 p-6 shadow-xl shadow-black/10 md:w-1/2 lg:w-full ">
        <div className="mb-3.25 flex items-center gap-2 font-mono text-sm text-slate-400">
          <IconUser size={16} />
          <span>profile.sys</span>
        </div>

        {/* Profile Image */}
        <div className="flex flex-1 items-center justify-center">
          <div className="xs:h-30 xs:w-30 relative h-50 w-50 sm:h-50 sm:w-50 md:h-40 md:w-40 lg:h-60 lg:w-60 xl:h-80 xl:w-80 2xl:h-98 2xl:w-98">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-75 blur-sm"></div>
            <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-md"></div>

            <div className="group relative mx-auto h-full w-full overflow-hidden rounded-full border-2 border-cyan-500/20 bg-slate-900">
              <Image
                src="/profile.webp"
                width={256}
                height={256}
                alt={SITE_CONFIG.name}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Widget */}
      <div className="flex-1 rounded-2xl border border-slate-600/30 bg-slate-900/30 p-6 shadow-xl shadow-black/10 md:w-1/2 lg:w-full">
        <div className="mb-4 font-mono text-base font-medium text-slate-300">
          System Status
        </div>

        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Status:</span>
            <span className="flex items-center gap-2 text-green-400">
              <div className="mb-0.5 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              Available for hire
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Timezone:</span>
            <span className="text-slate-200">UTC+3 (Iași, Romania)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Local Time:</span>
            <SidebarClock />
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Available for Work:</span>
            <span className="text-slate-200">08:00 – 23:00 (UTC+3)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Response Time:</span>
            <span className="text-cyan-400">~24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
