import { IconForms, IconMail, IconMapPin } from "@tabler/icons-react";

export interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const getResourceLinks = (): FooterLink[] => [
  { name: "Resume", href: "/resume.pdf", external: true },
  { name: "RSS Feed", href: "/rss.xml", external: true },
  { name: "Sitemap", href: "/sitemap.xml", external: true },
];

export const getLegalLinks = (): FooterLink[] => [
  { name: "Privacy Policy", href: "/privacy-policy", external: true },
  { name: "Terms of Service", href: "/terms-of-service", external: true },
  { name: "Cookie Policy", href: "/cookie-policy", external: true },
];

export const navItemsPortfolio = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const navItemsBlog = [
  { name: "Home", href: "/blog" },
  { name: "Portfolio", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export const contactInfo = [
  {
    icon: IconMail,
    label: "Email",
    value: "contact@​adriancrismaruc.com",
    href: "mailto:contact@adriancrismaruc.com",
  },
  {
    icon: IconForms,
    label: "Contact Form",
    value: "Contact Me",
    href: "/#contact",
  },
  {
    icon: IconMapPin,
    label: "Location",
    value: "Iași, Romania",
    href: null,
  },
];
