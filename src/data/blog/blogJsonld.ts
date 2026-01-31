import { SITE_CONFIG } from "@data/common/site";

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE_CONFIG.name} - Blog`,
  alternateName: `${SITE_CONFIG.name}'s Technical Blog`,
  description: SITE_CONFIG.blogDescription,
  url: `${SITE_CONFIG.url}/blog`,
  inLanguage: "en-US",
  dateCreated: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  author: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    givenName: SITE_CONFIG.firstName,
    familyName: SITE_CONFIG.lastName,
    jobTitle: "Full-Stack Developer",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.toEmail,
    image: `${SITE_CONFIG.url}/og-home.jpg`,
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
        name: "AWS Certified Generative AI Developer - Professional",
        credentialCategory: "Professional Certification",
        dateEarned: "2026-01-22",
        url: "https://www.credly.com/badges/e8fbc33d-ce96-415e-b60c-3167f0d3f9a4",
        recognizedBy: {
          "@type": "Organization",
          name: "Amazon Web Services",
          url: "https://aws.amazon.com",
        },
      },
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
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/og-home.jpg`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}/blog`,
  },
  isPartOf: {
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
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
      target: `${SITE_CONFIG.url}/blog`,
      name: "Read Blog Posts",
    },
    {
      "@type": "SubscribeAction",
      target: `${SITE_CONFIG.url}/rss.xml`,
      name: "Subscribe to RSS Feed",
    },
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    {
      "@type": "ContactAction",
      target: `mailto:${SITE_CONFIG.toEmail}`,
      name: "Contact Author",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_CONFIG.toEmail,
    contactType: "Author",
    availableLanguage: "English",
  },
  copyrightHolder: {
    "@type": "Person",
    name: SITE_CONFIG.name,
  },
  copyrightYear: "2025",
  license: `${SITE_CONFIG.websiteSource}/blob/main/LICENSE`,
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
  name: `${SITE_CONFIG.name} - Technical Blog`,
  url: `${SITE_CONFIG.url}/blog`,
  description: SITE_CONFIG.blogDescription,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  hasPart: {
    "@type": "Blog",
    name: `${SITE_CONFIG.name} - Blog`,
    url: `${SITE_CONFIG.url}/blog`,
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
      item: SITE_CONFIG.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_CONFIG.url}/blog`,
    },
  ],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  jobTitle: "Full-Stack Developer",
  image: `${SITE_CONFIG.url}/og-home.jpg`,
  sameAs: [
    SITE_CONFIG.social.github,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.reddit,
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_CONFIG.url}/og-home.jpg`,
  },
};
