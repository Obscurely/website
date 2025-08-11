import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage should be accessible", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("homepage should have no WCAG violations", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("navigation should be accessible", async ({ page }) => {
    await page.goto("/");

    // Test main navigation
    const navigation = page.locator("nav");
    if ((await navigation.count()) > 0) {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include("nav")
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("forms should be accessible", async ({ page }) => {
    // Navigate to contact page if it exists
    await page.goto("/");

    const contactLink = page.getByRole("link", { name: /#contact/i });
    if ((await contactLink.count()) > 0) {
      await contactLink.click();
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include("form")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["image-alt"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");

    // Test tab navigation
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["focus-order-semantics", "tabindex"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper headings structure", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["heading-order", "empty-heading"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("mobile accessibility", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
