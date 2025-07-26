import { SITE_CONFIG } from "@data/common/site";
import { IconMail, IconMapPin2 } from "@tabler/icons-react";

export const contactInfo = [
  {
    icon: <IconMail />,
    title: "Email",
    value: "contact@​adriancrismaruc.com",
    link: `mailto:${SITE_CONFIG.toEmail}`,
    description: "Send me an email anytime",
    sameTab: true,
  },
  {
    icon: <IconMapPin2 />,
    title: "Location",
    value: "Iași, Romania (UTC+3)",
    link: "https://maps.google.com/?q=Iași,+Romania",
    description: "Available for remote work",
  },
];
