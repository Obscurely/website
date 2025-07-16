import { DESCRIPTION } from "./metadata";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adrian Crîșmaruc",
  givenName: "Adrian",
  familyName: "Crîșmaruc",
  jobTitle: "Full-Stack Developer",
  description: DESCRIPTION,
  url: "https://adriancrismaruc.com",
  image: "https://adriancrismaruc.com/og-home.jpg",
  email: "contact@adriancrismaruc.com",
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
    "https://github.com/Obscurely",
    "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
    "https://www.reddit.com/user/CrismarucAdrian/",
  ],
  potentialAction: [
    {
      "@type": "ContactAction",
      target: "mailto:contact@adriancrismaruc.com",
      name: "Contact for Work",
    },
    {
      "@type": "ViewAction",
      target: "https://github.com/Obscurely",
      name: "View GitHub Profile",
    },
    {
      "@type": "ViewAction",
      target: "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
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
    description:
      "Independent full-stack developer specializing in cloud-native solutions",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Self-Taught",
  },
  owns: [
    {
      "@type": "SoftwareApplication",
      name: "RekoSearch",
      description:
        "An AI-powered file search engine for images, videos, documents and audio that understands the content of your files, enabling semantic search across them.",
      url: "https://rekosearch.com",
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      programmingLanguage: ["Rust", "Python", "TypeScript"],
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
        "A privacy-focused tool and library for interacting with programming resources fast, efficiently, and asynchronously/parallelly using the CLI or GUI.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-Platform",
      programmingLanguage: "Rust",
      downloadUrl: "https://github.com/Obscurely/falion",
    },
    {
      "@type": "SoftwareApplication",
      name: "EStash",
      description:
        "A cross-platform, highly secure encrypted digital vault capable of setting a path and copying the contents to that file with the click of a button.",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Cross-Platform",
      programmingLanguage: "Rust",
      downloadUrl: "https://github.com/Obscurely/EStash",
    },
    {
      "@type": "SoftwareApplication",
      name: "Personal Website",
      description:
        "My personal static tech website portfolio and blog, made with Next.js, React, Typescript, TailwindCSS and Shadcn/ui, deployed using CI/CD on AWS.",
      url: "https://adriancrismaruc.com",
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
      downloadUrl: "https://github.com/Obscurely/RustTemplate",
    },
    {
      "@type": "SoftwareApplication",
      name: "NixObscurely",
      description:
        "My fully customized and automated NixOS (advanced Linux distribution) home-manager + flakes system configuration.",
      applicationCategory: "SystemApplication",
      operatingSystem: "NixOS",
      programmingLanguage: "Nix",
      downloadUrl: "https://github.com/Obscurely/NixObscurely",
    },
    {
      "@type": "SoftwareApplication",
      name: "ArchObscurely",
      description:
        "Automated, fully customized Arch Linux install for my machine.",
      applicationCategory: "SystemApplication",
      operatingSystem: "Arch Linux",
      programmingLanguage: "Bash",
      downloadUrl: "https://github.com/Obscurely/ArchObscurely",
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
      url: "https://adriancrismaruc.com",
      description: "Full-stack portfolio website with modern tech stack",
    },
    {
      "@type": "CreativeWork",
      name: "Falion",
      url: "https://github.com/Obscurely/falion",
      description: "Privacy-focused CLI/GUI tool for programming resources",
    },
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Adrian Crîșmaruc",
  url: "https://adriancrismaruc.com",
  logo: "https://adriancrismaruc.com/og-home.jpg",
  description: DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@adriancrismaruc.com",
    contactType: "Professional",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressCountry: "Romania",
  },
  sameAs: [
    "https://github.com/Obscurely",
    "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
    "https://www.reddit.com/user/CrismarucAdrian/",
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
  name: "Adrian Crîșmaruc",
  description: DESCRIPTION,
  url: "https://adriancrismaruc.com",
  author: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
  },
  mainEntity: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
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
        item: "https://adriancrismaruc.com",
      },
    ],
  },
};
