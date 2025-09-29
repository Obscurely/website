import { describe, expect, it } from "vitest";

import { socials } from "../../../data/common/socials";

describe("Socials Configuration", () => {
  it("should export an array of social media links", () => {
    expect(Array.isArray(socials)).toBe(true);
    expect(socials.length).toBeGreaterThan(0);
  });

  it("should contain expected social media platforms", () => {
    const platformNames = socials.map((social) => social.name);

    expect(platformNames).toContain("GitHub");
    expect(platformNames).toContain("Upwork");
    expect(platformNames).toContain("LinkedIn");
    expect(platformNames).toContain("Reddit");
  });

  it("should have correct structure for each social item", () => {
    socials.forEach((social) => {
      expect(social).toHaveProperty("name");
      expect(social).toHaveProperty("icon");
      expect(social).toHaveProperty("href");

      expect(typeof social.name).toBe("string");
      expect(typeof social.icon).toBe("object"); // React component is an object
      expect(typeof social.href).toBe("string");
    });
  });

  it("should have valid URLs for all social links", () => {
    const urlRegex = /^https?:\/\/.+/;

    socials.forEach((social) => {
      expect(social.href).toMatch(urlRegex);
    });
  });

  it("should have non-empty names", () => {
    socials.forEach((social) => {
      expect(social.name.trim()).toBeTruthy();
    });
  });

  it("should have correct GitHub configuration", () => {
    const github = socials.find((social) => social.name === "GitHub");

    expect(github).toBeDefined();
    expect(github?.href).toContain("github.com");
    expect(github?.href).toContain("Obscurely");
  });

  it("should have correct LinkedIn configuration", () => {
    const linkedin = socials.find((social) => social.name === "LinkedIn");

    expect(linkedin).toBeDefined();
    expect(linkedin?.href).toContain("linkedin.com");
    expect(linkedin?.href).toContain("adrian-crismaruc");
  });

  it("should have correct Upwork configuration", () => {
    const linkedin = socials.find((social) => social.name === "Upwork");

    expect(linkedin).toBeDefined();
    expect(linkedin?.href).toContain("upwork.com");
    expect(linkedin?.href).toContain("adriancrismaruc");
  });

  it("should have correct Reddit configuration", () => {
    const reddit = socials.find((social) => social.name === "Reddit");

    expect(reddit).toBeDefined();
    expect(reddit?.href).toContain("reddit.com");
    expect(reddit?.href).toContain("CrismarucAdrian");
  });

  it("should have unique names", () => {
    const names = socials.map((social) => social.name);
    const uniqueNames = [...new Set(names)];

    expect(names).toHaveLength(uniqueNames.length);
  });

  it("should have unique URLs", () => {
    const hrefs = socials.map((social) => social.href);
    const uniqueHrefs = [...new Set(hrefs)];

    expect(hrefs).toHaveLength(uniqueHrefs.length);
  });

  it("should have proper social media domains", () => {
    const expectedDomains = {
      GitHub: "github.com",
      Upwork: "upwork.com",
      LinkedIn: "linkedin.com",
      Reddit: "reddit.com",
    };

    socials.forEach((social) => {
      const expectedDomain =
        expectedDomains[social.name as keyof typeof expectedDomains];
      if (expectedDomain) {
        expect(social.href).toContain(expectedDomain);
      }
    });
  });

  it("should be ordered consistently", () => {
    const expectedOrder = ["GitHub", "LinkedIn", "Upwork", "Reddit"];
    const actualOrder = socials.map((social) => social.name);

    expect(actualOrder).toEqual(expectedOrder);
  });

  it("should link to the correct profiles", () => {
    const profileChecks = {
      GitHub: (href: string) => href.includes("/Obscurely"),
      Upwork: (href: string) => href.includes("/freelancers/adriancrismaruc"),
      LinkedIn: (href: string) => href.includes("/in/adrian-crismaruc"),
      Reddit: (href: string) => href.includes("/user/CrismarucAdrian"),
    };

    socials.forEach((social) => {
      const check = profileChecks[social.name as keyof typeof profileChecks];
      if (check) {
        expect(check(social.href)).toBe(true);
      }
    });
  });

  it("should use HTTPS for all links", () => {
    socials.forEach((social) => {
      expect(social.href).toMatch(/^https:\/\//);
    });
  });

  it("should not have trailing slashes in URLs", () => {
    socials.forEach((social) => {
      expect(social.href).not.toMatch(/\/$/);
    });
  });
});
