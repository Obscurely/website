import { describe, expect, it } from "vitest";

import { checkEmail } from "../../utils/portfolio/contact";

describe("Contact Utils", () => {
  describe("checkEmail", () => {
    it("validates correct email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
        "user123@test-domain.com",
      ];

      validEmails.forEach((email) => {
        expect(checkEmail(email)).toBe(true);
      });
    });

    it("rejects invalid email addresses", () => {
      const invalidEmails = [
        "",
        "invalid-email",
        "@domain.com",
        "user@",
        "user@@domain.com",
        "user@domain",
        "user name@domain.com",
      ];

      invalidEmails.forEach((email) => {
        expect(checkEmail(email)).toBe(false);
      });
    });

    it("handles edge cases", () => {
      expect(checkEmail("test@sub.domain.com")).toBe(true);
      expect(checkEmail("user@domain-name.co")).toBe(true);
      expect(checkEmail("user.email@example.co.uk")).toBe(true);
    });
  });
});
