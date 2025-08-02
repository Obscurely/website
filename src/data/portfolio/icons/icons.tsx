"use client";

import dynamic from "next/dynamic";

import { IconPlaceholder } from "@common/IconPlaceholder";
import { IconProps } from "@tabler/icons-react";

// Dynamically import the services icons
const ServicesIcons = dynamic(() => import("./servicesIcons"), {
  loading: () => <IconPlaceholder size={40} />,
  ssr: false,
});

export const IconCode = (props: IconProps) => (
  <ServicesIcons icon="IconCode" {...props} />
);
export const IconCloud = (props: IconProps) => (
  <ServicesIcons icon="IconCloud" {...props} />
);
export const IconRocket = (props: IconProps) => (
  <ServicesIcons icon="IconRocket" {...props} />
);
export const IconSettings = (props: IconProps) => (
  <ServicesIcons icon="IconSettings" {...props} />
);

// projects
const ProjectsIcons = dynamic(() => import("./projectsIcons"), {
  loading: () => <IconPlaceholder size={20} />,
  ssr: false,
});

export const IconApps = (props: IconProps) => (
  <ProjectsIcons icon="IconApps" {...props} />
);
export const IconDeviceDesktop = (props: IconProps) => (
  <ProjectsIcons icon="IconDeviceDesktop" {...props} />
);
export const IconStar = (props: IconProps) => (
  <ProjectsIcons icon="IconStar" {...props} />
);
export const IconTools = (props: IconProps) => (
  <ProjectsIcons icon="IconTools" {...props} />
);
export const IconWorld = (props: IconProps) => (
  <ProjectsIcons icon="IconWorld" {...props} />
);
export const IconChevronLeft = (props: IconProps) => (
  <ProjectsIcons icon="IconChevronLeft" {...props} />
);
export const IconChevronRight = (props: IconProps) => (
  <ProjectsIcons icon="IconChevronRight" {...props} />
);

// contact
const ContactIcons = dynamic(() => import("./contactIcons"), {
  loading: () => <IconPlaceholder size={22} />,
  ssr: false,
});

export const IconMail = (props: IconProps) => (
  <ContactIcons icon="IconMail" {...props} />
);
export const IconMapPin2 = (props: IconProps) => (
  <ContactIcons icon="IconMapPin2" {...props} />
);
