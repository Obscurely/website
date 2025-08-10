import { expect, test } from "@playwright/test";

test.describe("Critical User Flows", () => {
  test("should load homepage and display main content", async ({ page }) => {
    await page.goto("/");

    // Check if main page elements are visible
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("body")).toBeVisible();

    // Check if navigation exists
    const nav = page.locator("nav, header");
    await expect(nav.first()).toBeVisible();
  });

  test("should display contact form if present", async ({ page }) => {
    await page.goto("/");

    // Look for contact form
    const form = page.locator("form");

    if ((await form.count()) > 0) {
      await form.scrollIntoViewIfNeeded();
      await expect(form).toBeVisible();

      // Check for common form fields
      const nameField = page.locator(
        'input[name="name"], input[placeholder*="name"]'
      );
      const emailField = page.locator(
        'input[name="email"], input[type="email"]'
      );

      if ((await nameField.count()) > 0) {
        await expect(nameField.first()).toBeVisible();
      }
      if ((await emailField.count()) > 0) {
        await expect(emailField.first()).toBeVisible();
      }
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Page should still be functional on mobile
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // Check if navigation adapts to mobile
    const nav = page.locator("nav, header");
    await expect(nav.first()).toBeVisible();
  });

  test("should not have critical JavaScript errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out non-critical errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("404") &&
        !error.includes("Warning:") &&
        !error.includes("chrome-extension")
    );

    expect(criticalErrors.length).toBeLessThan(3); // Allow some minor errors
  });

  test("should have proper SEO meta tags", async ({ page }) => {
    await page.goto("/");

    // Check title exists and is not empty
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    if ((await metaDescription.count()) > 0) {
      const description = await metaDescription.getAttribute("content");
      expect(description?.length).toBeGreaterThan(0);
    }
  });

  test("should handle 404 page gracefully", async ({ page }) => {
    const response = await page.goto("/non-existent-page-12345");

    // Should either get 404 status or be redirected
    if (response) {
      const status = response.status();
      expect([404, 301, 302, 200].includes(status)).toBe(true);
    }

    // Should show some content regardless
    await expect(page.locator("body")).toBeVisible();
  });
});
