"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { certifications } from "@data/skills/certifications";

interface CertificationsSectionProps {
  isInView: boolean;
}

/**
 * CertificationsSection component that displays a list of certifications.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const CertificationsSection = ({
  isInView,
}: CertificationsSectionProps) => {
  // Memoize animation props to prevent recalculation
  const animationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { duration: 0.7, delay: 0.3 },
    }),
    [isInView]
  );

  return (
    <motion.div
      {...animationProps}
      className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6"
    >
      <h3 className="mb-6 text-2xl font-bold text-white">My Certifications</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </motion.div>
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
      className="group flex flex-col rounded-lg border border-slate-700/30 bg-slate-800/40 p-4 transition-all duration-300 ease-out hover:translate-y-[-2px] hover:border-cyan-500/30 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      <div className="flex items-center">
        <div className="relative h-16 w-16 overflow-hidden">
          <Image
            src={certification.icon}
            alt={certification.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-contain p-1"
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
        <span className="text-xs text-slate-500">{formattedDate}</span>
        <span className="text-xs text-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View credential →
        </span>
      </div>
    </a>
  );
});

CertificationCard.displayName = "CertificationCard";
