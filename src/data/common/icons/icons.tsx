"use client";

import dynamic from "next/dynamic";

import { IconPlaceholder } from "@common/IconPlaceholder";
import { IconProps } from "@tabler/icons-react";

// footer
const FooterIcons = dynamic(() => import("./footerIcons"), {
  loading: () => <IconPlaceholder size={16} />,
  ssr: false,
});

export const IconForms = (props: IconProps) => (
  <FooterIcons icon="IconForms" {...props} />
);
export const IconMail = (props: IconProps) => (
  <FooterIcons icon="IconMail" {...props} />
);
export const IconMapPin = (props: IconProps) => (
  <FooterIcons icon="IconMapPin" {...props} />
);
export const IconArrowUp = (props: IconProps) => (
  <FooterIcons icon="IconArrowUp" {...props} />
);
