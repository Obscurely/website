import { SITE_CONFIG } from "@data/common/site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  givenName: SITE_CONFIG.firstName,
  familyName: SITE_CONFIG.lastName,
  jobTitle: "Full-Stack Developer, Founder & CEO of RekoSearch",
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/og-home.jpg`,
  email: SITE_CONFIG.toEmail,
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Developer",
    occupationLocation: {
      "@type": "City",
      name: "Iași, Romania",
    },
    skills: [
      "Rust Programming",
      "Python Programming",
      "React Development",
      "AWS Cloud Services",
      "Kubernetes",
      "DevOps Engineering",
    ],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressCountry: "Romania",
  },
  sameAs: [
    SITE_CONFIG.social.github,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.reddit,
  ],
  potentialAction: [
    {
      "@type": "ContactAction",
      target: `mailto:${SITE_CONFIG.toEmail}`,
      name: "Contact for Work",
    },
    {
      "@type": "ViewAction",
      target: SITE_CONFIG.social.github,
      name: "View GitHub Profile",
    },
    {
      "@type": "ViewAction",
      target: SITE_CONFIG.social.linkedIn,
      name: "View LinkedIn Profile",
    },
  ],
  knowsAbout: [
    "Full-Stack Development",
    "Cloud-Native Architecture",
    "DevOps Engineering",
    "Rust Programming",
    "AWS Cloud Services",
    "Kubernetes",
    "React Development",
    "Infrastructure as Code",
    "Performance Optimization",
    "Microservices Architecture",
    "CI/CD Pipelines",
    "System Administration",
  ],
  seeks: {
    "@type": "Demand",
    name: "Full-Stack Development Opportunities",
    description:
      "Remote development roles focusing on cloud-native applications, DevOps, and performance optimization.",
    eligibleRegion: "Worldwide",
    availabilityStarts: "2025-01-01",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Kubernetes Certified Application Developer (CKAD)",
      credentialCategory: "Professional Certification",
      dateEarned: "2024-04-02",
      url: "https://www.credly.com/badges/72c7934e-35c4-4108-9010-aea6d2414b74",
      recognizedBy: {
        "@type": "Organization",
        name: "The Linux Foundation",
        url: "https://www.linuxfoundation.org",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Certified Developer - Associate",
      credentialCategory: "Professional Certification",
      dateEarned: "2023-12-20",
      url: "https://www.credly.com/badges/b5cb4ed1-d487-44c8-a26c-03c5c6458655",
      recognizedBy: {
        "@type": "Organization",
        name: "Amazon Web Services",
        url: "https://aws.amazon.com",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Cloud Practitioner",
      credentialCategory: "Professional Certification",
      dateEarned: "2023-10-31",
      url: "https://www.credly.com/badges/3d166bad-e8f2-4825-9937-53ce6a7b1dcf",
      recognizedBy: {
        "@type": "Organization",
        name: "Amazon Web Services",
        url: "https://aws.amazon.com",
      },
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance Developer",
    description: SITE_CONFIG.description,
  },
  alumniOf: {
    "@type": "Organization",
    name: "Self-Taught",
  },
  founder: [
    {
      "@type": "SoftwareApplication",
      name: "RekoSearch",
      url: "https://rekosearch.com",
    },
  ],
  brand: {
    "@type": "Brand",
    name: "RekoSearch",
    url: "https://rekosearch.com",
  },
  owns: [
    {
      "@type": "SoftwareApplication",
      name: "RekoSearch",
      description: `An AI-powered file search engine for images, videos, documents and audio that understands the content of your files, enabling semantic search across them. Founded and developed by ${SITE_CONFIG.name}.`,
      url: "https://rekosearch.com",
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      programmingLanguage: ["Rust", "Python", "TypeScript"],
      founder: {
        "@type": "Person",
        name: SITE_CONFIG.name,
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Falion",
      description:
        "A privacy-focused tool and library for interacting with multiple developer resources (like Stack Overflow) at once with combined sub-1.5 seconds response times for full results.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-Platform",
      programmingLanguage: "Rust",
      downloadUrl: `${SITE_CONFIG.social.github}/falion`,
    },
    {
      "@type": "SoftwareApplication",
      name: "EStash",
      description:
        "A cross-platform, highly secure encrypted digital vault using using ECIES (X25519 + XChaCha20Poly1305), capable of setting a path and copying the contents to that file with the click of a button.",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Cross-Platform",
      programmingLanguage: "Rust",
      downloadUrl: `${SITE_CONFIG.social.github}/EStash`,
    },
    {
      "@type": "SoftwareApplication",
      name: "Personal Website",
      description:
        "My personal static tech website portfolio and blog, made with Next.js, React, Typescript, TailwindCSS and Shadcn/ui, deployed using CI/CD on Vercel. Optimized for performance and SEO.",
      url: SITE_CONFIG.url,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      programmingLanguage: ["TypeScript", "JavaScript"],
    },
    {
      "@type": "SoftwareApplication",
      name: "RustTemplate",
      description:
        "A complete template for cross-platform Rust projects. It includes scripts to customize the repository automatically and CI/CD pipelines to deploy on any platform in multiple formats.",
      applicationCategory: "DeveloperApplication",
      programmingLanguage: "Rust",
      downloadUrl: `${SITE_CONFIG.social.github}/RustTemplate`,
    },
    {
      "@type": "SoftwareApplication",
      name: "NixObscurely",
      description:
        "Infrastructure-as-Code NixOS (advanced Linux distribution) system configuration. Actively maintained with 500+ commits across multiple machines with reproducible builds.",
      applicationCategory: "SystemApplication",
      operatingSystem: "NixOS",
      programmingLanguage: "Nix",
      downloadUrl: `${SITE_CONFIG.social.github}/NixObscurely`,
    },
    {
      "@type": "SoftwareApplication",
      name: "ArchObscurely",
      description:
        "Automated, fully customized Arch Linux install for my machine.",
      applicationCategory: "SystemApplication",
      operatingSystem: "Arch Linux",
      programmingLanguage: "Bash",
      downloadUrl: `${SITE_CONFIG.social.github}/ArchObscurely`,
    },
  ],
  workExample: [
    {
      "@type": "CreativeWork",
      name: "RekoSearch",
      url: "https://rekosearch.com",
      description:
        "AI-powered file search engine with semantic search capabilities",
    },
    {
      "@type": "CreativeWork",
      name: "Personal Portfolio",
      url: SITE_CONFIG.url,
      description: "Full-stack portfolio website with modern tech stack",
    },
    {
      "@type": "CreativeWork",
      name: "Falion",
      url: `${SITE_CONFIG.social.github}/falion`,
      description: "Privacy-focused CLI/GUI tool for programming resources",
    },
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/og-home.jpg`,
  description: SITE_CONFIG.description,
  founder: {
    "@type": "Person",
    name: SITE_CONFIG.name,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_CONFIG.toEmail,
    contactType: "Professional",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressCountry: "Romania",
  },
  sameAs: [
    SITE_CONFIG.social.github,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.reddit,
  ],
  knowsAbout: [
    "Full-Stack Development",
    "Cloud-Native Architecture",
    "DevOps Engineering",
    "Rust Programming",
    "Python Programming",
    "React Development",
    "AWS Cloud Services",
    "Kubernetes",
    "Infrastructure as Code",
    "Performance Optimization",
    "Automation",
    "RekoSearch Development",
    "AI-Powered Search Engines",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Full-Stack Development",
        description:
          "Responsive, fast and secure end-to-end applications with modern, type-safe technologies like React, Next.js and Rust.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: "Worldwide",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Cloud-Native Infrastructure",
        description:
          "Design and deploy scalable applications on AWS and Kubernetes using microservices architectures and modern techniques.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: "Worldwide",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "DevOps & Automation",
        description:
          "Optimize workflows with CI/CD pipelines, Terraform, Docker and scripts for speed and efficiency, saving valuable time.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: "Worldwide",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Performance Optimization",
        description:
          "Improve application speed through efficient concurrency techniques and optimizing web metrics while also enhancing security.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: "Worldwide",
    },
  ],
};

export const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  author: {
    "@type": "Person",
    name: SITE_CONFIG.name,
  },
  mainEntity: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  dateCreated: "2025-01-01",
  inLanguage: "en-US",
  genre: "Portfolio",
  about: [
    "Full-Stack Development",
    "Cloud-Native Technologies",
    "DevOps Engineering",
    "Software Architecture",
    "System Administration",
    "Rust Programming",
    "Python Programming",
    "React Development",
    "AWS Cloud Services",
    "Kubernetes",
    "Infrastructure as Code",
    "Performance Optimization",
    "Automation",
    "Linux System Administration",
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
    ],
  },
};
