import { memo, useMemo } from "react";

import Image from "next/image";

import { certifications } from "@data/portfolio/skills/certifications";

/**
 * CertificationsSection component that displays a list of certifications.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const CertificationsSection = () => {
  return (
    <div className="border-slate-730 rounded-xl border bg-slate-800/20 p-6">
      <h3 className="mb-6 text-2xl font-bold text-white">My Certifications</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(4):last-child]:lg:col-start-2">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </div>
  );
};

const CertificationCard = memo(function CertificationCard({
  certification,
}: {
  certification: {
    id: string;
    name: string;
    issuer: string;
    icon: string;
    date: string;
    url: string;
  };
}) {
  const formattedDate = useMemo(() => {
    const date = new Date(certification.date);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [certification.date]);

  return (
    <a
      href={certification.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-slate-730 hover:border-cyan-590 flex h-full flex-col justify-between rounded-lg border bg-slate-800/40 p-4 transition-all duration-300 ease-out hover:bg-slate-800/40 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      <div className="flex items-center">
        <div className="relative h-16 w-16 overflow-hidden">
          <Image
            src={certification.icon}
            alt={certification.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-contain p-1"
            loading="lazy"
            priority={false}
          />
        </div>
        <div className="ml-4 flex-1">
          <h4 className="font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
            {certification.name}
          </h4>
          <p className="text-sm text-slate-400">{certification.issuer}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">{formattedDate}</span>
        <span className="text-xs text-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View credential →
        </span>
      </div>
    </a>
  );
});

CertificationCard.displayName = "CertificationCard";
