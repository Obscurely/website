import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the main sections", async ({ page }) => {
    await page.goto("/");

    // Check if main sections are visible
    await expect(page.locator("main")).toBeVisible();

    // Check for hero section
    const heroSection = page.locator('[data-testid="hero-section"]');
    if ((await heroSection.count()) > 0) {
      await expect(heroSection).toBeVisible();
    }

    // Check for about section
    const aboutSection = page.locator('[data-testid="about-section"]');
    if ((await aboutSection.count()) > 0) {
      await expect(aboutSection).toBeVisible();
    }
  });

  test("should have proper page title and meta description", async ({
    page,
  }) => {
    await page.goto("/");

    // Check page title is not empty
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content");
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check page loads and is responsive
    await expect(page.locator("body")).toBeVisible();

    // Check if mobile menu exists (if applicable)
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    if ((await mobileMenu.count()) > 0) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test("should load without JavaScript errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Allow for some common framework errors that don't affect functionality
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("Warning:") &&
        !error.includes("favicon") &&
        !error.includes("404")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should pass basic accessibility checks", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
