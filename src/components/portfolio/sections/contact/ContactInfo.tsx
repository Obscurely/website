import React, { memo } from "react";
import { Card, CardContent } from "@ui/card";
import { socials } from "@data/common/socials";
import { contactInfo } from "@data/portfolio/contact";

/**
 * ContactInfo component displays contact information and social links.
 */
export const ContactInfo = memo(() => {
  return (
    <div className="flex-1 lg:max-w-md">
      <div className="border-slate-740 h-full rounded-xl border bg-slate-800/20 p-6">
        <h3 className="mb-6 text-2xl font-bold text-white">
          Contact Information
        </h3>

        <div className="mb-6 space-y-6">
          {contactInfo.map((info, index) => (
            <div
              key={`contact-${info.title}-${index}`}
              className="group relative"
            >
              <Card className="border-slate-740 hover:border-cyan-590 h-full overflow-hidden bg-slate-800/30 p-0 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-cyan-500/10">
                <CardContent className="p-0">
                  <a
                    href={info.link}
                    target={info.sameTab ? "_self" : "_blank"}
                    rel={info.sameTab ? undefined : "noopener noreferrer"}
                    className="flex items-start gap-4 rounded-lg bg-none px-4 py-6 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
                    aria-label={`${info.title}: ${info.value}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="bg-slate-980 flex h-12 w-12 items-center justify-center rounded-full text-cyan-500">
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
            </div>
          ))}
        </div>

        <h4 className="mb-4 text-xl font-semibold text-white">
          Connect With Me
        </h4>
        <div className="flex justify-center gap-4 sm:justify-start">
          {socials.map((social, index) => (
            <a
              key={`social-${social.href}-${index}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-890 flex h-12 w-12 items-center justify-center rounded-full text-cyan-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
            >
              <social.icon size={20} strokeWidth={2.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

ContactInfo.displayName = "ContactInfo";
