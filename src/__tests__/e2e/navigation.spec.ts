import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to different pages", async ({ page }) => {
    await page.goto("/");

    // Check if navigation links exist and work
    const navLinks = [
      { selector: 'a[href="/blog"]', expectedUrl: "/blog" },
      { selector: 'a[href*="contact"]', expectedUrl: "/" },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(link.selector).first();
      if ((await navLink.count()) > 0) {
        await navLink.click();
        await page.waitForURL(`**${link.expectedUrl}**`);
        expect(page.url()).toContain(link.expectedUrl);
        await page.goBack();
      }
    }
  });

  test("should handle blog navigation", async ({ page }) => {
    await page.goto("/blog");

    // Add delay before checking
    await page.waitForTimeout(1000);

    // Check if blog page loads
    await expect(page.locator("main")).toBeVisible();

    // Check if blog posts are present (if any)
    const blogPosts = page.locator('[data-testid="blog-post"]');
    const postCount = await blogPosts.count();

    if (postCount > 0) {
      // Click on first blog post
      await blogPosts.first().click();
      await page.waitForLoadState("networkidle");

      // Should navigate to individual post
      expect(page.url()).toMatch(/\/blog\/.+/);
    }
  });

  test("should have working footer links", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();

    // Check social links (if they exist)
    const socialLinks = page.locator('footer a[href^="http"]');
    const linkCount = await socialLinks.count();

    if (linkCount > 0) {
      // Test first social link opens in new tab
      const [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
        socialLinks.first().click(),
      ]);

      await newPage.waitForLoadState();
      expect(newPage.url()).toMatch(/^https?:\/\/.+/);
      await newPage.close();
    }
  });

  test("should handle 404 pages gracefully", async ({ page }) => {
    await page.goto("/non-existent-page");

    // Should show 404 page or redirect to home
    const response = page.url();
    if (response.includes("non-existent-page")) {
      // Check if 404 page has proper content
      await expect(page.locator("main")).toBeVisible();
    } else {
      // Should redirect to home or another valid page
      expect(page.url()).not.toContain("non-existent-page");
    }
  });
});
