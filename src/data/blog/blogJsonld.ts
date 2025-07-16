import { DESCRIPTION } from "./metadata";

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Adrian Crîșmaruc - Blog",
  alternateName: "Adrian Crîșmaruc's Technical Blog",
  description: DESCRIPTION,
  url: "https://adriancrismaruc.com/blog",
  inLanguage: "en-US",
  dateCreated: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  author: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
    givenName: "Adrian",
    familyName: "Crîșmaruc",
    jobTitle: "Full-Stack Developer",
    url: "https://adriancrismaruc.com",
    email: "contact@adriancrismaruc.com",
    image: "https://adriancrismaruc.com/og-home.jpg",
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
      "Software Development",
      "Linux System Administration",
      "Server Management",
      "Full-Stack Development",
      "DevOps Engineering",
      "Cloud-Native Architecture",
      "Rust Programming",
      "Python Programming",
      "AWS Cloud Services",
      "Kubernetes",
      "Infrastructure as Code",
      "Performance Optimization",
      "System Administration",
      "CI/CD Pipelines",
      "Microservices Architecture",
    ],
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
  },
  publisher: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
    logo: "https://adriancrismaruc.com/og-home.jpg",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://adriancrismaruc.com/blog",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
    description:
      "Full-Stack Developer specializing in cloud-native solutions and DevOps engineering",
  },
  about: [
    "Software Development Tutorials",
    "Linux System Administration",
    "Server Management Guides",
    "Full-Stack Development",
    "DevOps Engineering",
    "Cloud-Native Technologies",
    "Rust Programming",
    "Python Programming",
    "AWS Cloud Services",
    "Kubernetes Administration",
    "Infrastructure as Code",
    "Performance Optimization",
    "System Administration",
    "CI/CD Pipelines",
    "Microservices Architecture",
    "Web Development",
    "Database Management",
    "Security Best Practices",
    "Automation Scripts",
    "Technical Problem Solving",
  ],
  audience: {
    "@type": "Audience",
    audienceType: [
      "Software Developers",
      "System Administrators",
      "DevOps Engineers",
      "Cloud Engineers",
      "Full-Stack Developers",
      "Linux Enthusiasts",
      "Programming Students",
      "Technical Professionals",
    ],
  },
  educationalLevel: "Intermediate to Advanced",
  genre: [
    "Technical Blog",
    "Educational Content",
    "Programming Tutorials",
    "System Administration Guides",
  ],
  potentialAction: [
    {
      "@type": "ReadAction",
      target: "https://adriancrismaruc.com/blog",
      name: "Read Blog Posts",
    },
    {
      "@type": "SubscribeAction",
      target: "https://adriancrismaruc.com/rss.xml",
      name: "Subscribe to RSS Feed",
    },
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://adriancrismaruc.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    {
      "@type": "ContactAction",
      target: "mailto:contact@adriancrismaruc.com",
      name: "Contact Author",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@adriancrismaruc.com",
    contactType: "Author",
    availableLanguage: "English",
  },
  copyrightHolder: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
  },
  copyrightYear: "2025",
  license: "https://github.com/Obscurely/website/blob/main/LICENSE",
  accessibilityFeature: [
    "readingOrder",
    "structuralNavigation",
    "alternativeText",
  ],
  accessibilityHazard: "none",
  accessibilityControl: ["fullKeyboardControl", "fullMouseControl"],
};

export const blogWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Adrian Crîșmaruc - Technical Blog",
  url: "https://adriancrismaruc.com/blog",
  description: DESCRIPTION,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://adriancrismaruc.com/blog?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  hasPart: {
    "@type": "Blog",
    name: "Adrian Crîșmaruc - Blog",
    url: "https://adriancrismaruc.com/blog",
  },
};

export const blogBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://adriancrismaruc.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://adriancrismaruc.com/blog",
    },
  ],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adrian Crîșmaruc",
  url: "https://adriancrismaruc.com",
  jobTitle: "Full-Stack Developer",
  image: "https://adriancrismaruc.com/og-home.jpg",
  sameAs: [
    "https://github.com/Obscurely",
    "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
    "https://www.reddit.com/user/CrismarucAdrian/",
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Adrian Crîșmaruc",
  url: "https://adriancrismaruc.com",
  logo: "https://adriancrismaruc.com/og-home.jpg",
};
