import { SITE_CONFIG } from "@data/common/site";
import { Solution } from "@lib/solutions";

export const getSolutionsPageJsonLd = (solutions: Solution[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Engineering Solutions | ${SITE_CONFIG.name}`,
    alternateName: `Engineering Solutions by ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.solutionsDescription,
    url: `${SITE_CONFIG.url}/solutions`,
    inLanguage: "en-US",
    dateCreated: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    image: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/og-solutions.jpg`,
      width: 1200,
      height: 630,
      caption: "Engineering Solutions as Fixed-Price Packages",
    },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Software & Cloud Engineering Packages",
      itemListElement: solutions.map((solution, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: solution.frontmatter.title,
          description: solution.frontmatter.description,
          url: `${SITE_CONFIG.url}/solutions/${solution.slug}`,
          priceSpecification: {
            "@type": "PriceSpecification",
            price: solution.frontmatter.price,
            priceCurrency: solution.frontmatter.currency,
          },
        },
      })),
    },
    provider: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      givenName: SITE_CONFIG.firstName,
      familyName: SITE_CONFIG.lastName,
      jobTitle: SITE_CONFIG.jobTitle,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.toEmail,
      image: `${SITE_CONFIG.url}/og-solutions.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Iași",
        addressCountry: "Romania",
      },
      sameAs: [
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.linkedIn,
        SITE_CONFIG.social.reddit,
        SITE_CONFIG.social.upwork,
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: SITE_CONFIG.jobTitle,
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
      knowsAbout: [
        "Software Development",
        "Full-Stack Development",
        "Cloud-Native Architecture",
        "DevOps Engineering",
        "Rust Programming",
        "Python Programming",
        "AWS Cloud Services",
        "Rust on AWS Lambda",
        "Kubernetes",
        "Infrastructure as Code",
        "Performance Optimization",
        "System Administration",
        "CI/CD Pipelines",
        "Microservices Architecture",
        "Server Management",
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
          name: "NixObscurely",
          url: `${SITE_CONFIG.social.github}/NixObscurely`,
          description:
            "Infrastructure-as-Code NixOS system configuration with 500+ commits",
        },
        {
          "@type": "CreativeWork",
          name: "Falion",
          url: `${SITE_CONFIG.social.github}/falion`,
          description: "Privacy-focused CLI/GUI tool for programming resources",
        },
      ],
      founder: [
        {
          "@type": "SoftwareApplication",
          name: "RekoSearch",
          url: "https://rekosearch.com",
        },
      ],
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/og-solutions.jpg`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/solutions`,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_CONFIG.url}/solutions`,
      availableLanguage: "English",
    },
    breadcrumb: {
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
          name: "Solutions",
          item: `${SITE_CONFIG.url}/solutions`,
        },
      ],
    },
    about: [
      "Enterprise Cloud Infrastructure",
      "Kubernetes Cluster Provisioning",
      "Rust Backend Optimization",
      "AWS Cost Reduction",
      "Serverless Architecture Migration",
      "High-Performance Computing",
      "Infrastructure as Code (IaC)",
      "Secure VPS Hardening",
      "SaaS Technical Architecture",
      "Legacy Code Refactoring",
      "Cloud Native Deployment",
      "System Security Audits",
      "Performance Optimization",
      "Microservices Architecture",
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: [
        "SaaS Founders",
        "Chief Technology Officers (CTO)",
        "VP of Engineering",
        "Technical Leads",
        "Startup Owners",
        "Enterprise Decision Makers",
        "Product Managers",
        "Cloud Architects",
        "DevOps Engineers",
        "Tech Entrepreneurs",
      ],
    },
    potentialAction: [
      {
        "@type": "OrderAction",
        target: `${SITE_CONFIG.url}/solutions`,
        name: "Order Engineering Solution Package",
      },
      {
        "@type": "QuoteAction",
        target: `mailto:${SITE_CONFIG.toEmail}?subject=Engineering%20Solution%20Inquiry`,
        name: "Request a Custom Quote",
      },
      {
        "@type": "CommunicateAction",
        target: `mailto:${SITE_CONFIG.toEmail}`,
        name: "Schedule Consultation",
      },
      {
        "@type": "ContactAction",
        target: `mailto:${SITE_CONFIG.toEmail}`,
        name: "Contact for Work",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.toEmail,
      contactType: "Sales",
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
    genre: [
      "Professional Services",
      "Cloud Consulting",
      "Software Engineering",
      "Infrastructure Automation",
      "DevOps Consulting",
    ],
    license: `${SITE_CONFIG.websiteSource}/blob/main/LICENSE`,
    copyrightYear: "2026",
    copyrightHolder: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    accessibilityFeature: [
      "readingOrder",
      "structuralNavigation",
      "alternativeText",
    ],
    accessibilityHazard: "none",
    accessibilityControl: ["fullKeyboardControl", "fullMouseControl"],
  };
};

export const generateSolutionJsonLd = (solution: Solution) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.frontmatter.title,
    description: solution.frontmatter.description,
    url: `${SITE_CONFIG.url}/solutions/${solution.slug}`,
    image: {
      "@type": "ImageObject",
      url: solution.frontmatter.image || `${SITE_CONFIG.url}/og-solutions.jpg`,
      width: 1200,
      height: 630,
      caption: solution.frontmatter.title,
    },
    abstract: solution.frontmatter.description,
    serviceType: solution.frontmatter.category,
    provider: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      givenName: SITE_CONFIG.firstName,
      familyName: SITE_CONFIG.lastName,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.toEmail,
      jobTitle: SITE_CONFIG.jobTitle,
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
        SITE_CONFIG.social.upwork,
      ],
      knowsAbout: [
        "Software Development",
        "Full-Stack Development",
        "Cloud-Native Architecture",
        "DevOps Engineering",
        "Rust Programming",
        "Python Programming",
        "AWS Cloud Services",
        "Rust on AWS Lambda",
        "Kubernetes",
        "Infrastructure as Code",
        "Performance Optimization",
        "System Administration",
        "CI/CD Pipelines",
        "Microservices Architecture",
        "Server Management",
      ],
    },
    offers: {
      "@type": "Offer",
      price: solution.frontmatter.price.toString(),
      priceCurrency: solution.frontmatter.currency,
      availability: solution.frontmatter.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_CONFIG.url}/solutions/${solution.slug}`,
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 year from now
      description: `Fixed-price package: ${solution.frontmatter.description}`,
      eligibleRegion: "Worldwide",
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_CONFIG.url}/solutions/${solution.slug}`,
      availableLanguage: "English",
    },
    ...(solution.frontmatter.deliveryTime && {
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        description: `Typical delivery: ${solution.frontmatter.deliveryTime}`,
      },
    }),
    ...(solution.frontmatter.tags && {
      keywords: solution.frontmatter.tags,
      about: solution.frontmatter.tags.map((tag: string) => ({
        "@type": "Thing",
        name: tag,
      })),
    }),
    termsOfService: `${SITE_CONFIG.url}/terms-of-service`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/solutions/${solution.slug}`,
    },
    isPartOf: {
      "@type": "Service",
      name: `Engineering Solutions | ${SITE_CONFIG.name}`,
      url: `${SITE_CONFIG.url}/solutions`,
      description: SITE_CONFIG.solutionsDescription,
    },
    breadcrumb: {
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
          name: "Solutions",
          item: `${SITE_CONFIG.url}/solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: solution.frontmatter.title,
          item: `${SITE_CONFIG.url}/solutions/${solution.slug}`,
        },
      ],
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: [
        "SaaS Founders",
        "CTOs",
        "Technical Leads",
        "DevOps Engineers",
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5", // Based on UpWork stats
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "UpWork Client" },
        datePublished: "2025-12-08",
        reviewBody:
          "Adrian did exceptionally well. Underpromised and overdelivered on the given task. I can't ask for more. 10/10 for work delivered, under budget and ahead of schedule. Very clear communicator. I will definitely work again with Adrian in the future.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "UpWork Client" },
        datePublished: "2025-10-30",
        reviewBody:
          "Adrian did an excellent job setting up an Overpass API instance. He demonstrated deep technical knowledge, handled data imports and diff updates smoothly, and optimised the system for performance and reliability. His documentation was clear and easy to follow. Highly recommended.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "UpWork Client" },
        datePublished: "2025-10-13",
        reviewBody: "",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
    ],
    license: `${SITE_CONFIG.websiteSource}/blob/main/LICENSE`,
    copyrightHolder: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    copyrightYear: "2026",
    accessibilityFeature: [
      "readingOrder",
      "structuralNavigation",
      "alternativeText",
    ],
    accessibilityHazard: "none",
    accessibilityControl: ["fullKeyboardControl", "fullMouseControl"],
  };
};

export const solutionsWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `Engineering Solutions | ${SITE_CONFIG.name}`,
  url: `${SITE_CONFIG.url}/solutions`,
  description: SITE_CONFIG.solutionsDescription,
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
      urlTemplate: `${SITE_CONFIG.url}/solutions?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  hasPart: {
    "@type": "Service",
    name: `Engineering Solutions | ${SITE_CONFIG.name}`,
    url: `${SITE_CONFIG.url}/solutions`,
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  givenName: SITE_CONFIG.firstName,
  familyName: SITE_CONFIG.lastName,
  url: SITE_CONFIG.url,
  jobTitle: SITE_CONFIG.jobTitle,
  image: `${SITE_CONFIG.url}/og-home.jpg`,
  email: SITE_CONFIG.toEmail,
  description: SITE_CONFIG.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressCountry: "Romania",
  },
  sameAs: [
    SITE_CONFIG.social.github,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.reddit,
    SITE_CONFIG.social.upwork,
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: SITE_CONFIG.jobTitle,
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
  knowsAbout: [
    "Full-Stack Development",
    "Cloud-Native Architecture",
    "DevOps Engineering",
    "Rust Programming",
    "Python Programming",
    "AWS Cloud Services",
    "Kubernetes",
    "Infrastructure as Code",
    "Performance Optimization",
    "Microservices Architecture",
    "CI/CD Pipelines",
    "System Administration",
  ],
  subjectOf: {
    "@type": "VideoObject",
    name: `Introduction to ${SITE_CONFIG.name}`,
    description:
      "Introduction to my software & cloud engineering skill and background.",
    thumbnailUrl: `${SITE_CONFIG.url}/og-home.jpg`,
    uploadDate: "2025-09-29",
    contentUrl: SITE_CONFIG.videoIntroductionUrl,
    embedUrl: SITE_CONFIG.videoIntroductionUrl.replace("watch?v=", "embed/"),
  },
  brand: {
    "@type": "Brand",
    name: `${SITE_CONFIG.name} Engineering`,
    slogan: "High-Performance Systems",
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
    name: `${SITE_CONFIG.name} Engineering`,
    description: SITE_CONFIG.description,
  },
  founder: [
    {
      "@type": "SoftwareApplication",
      name: "RekoSearch",
      url: "https://rekosearch.com",
    },
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
