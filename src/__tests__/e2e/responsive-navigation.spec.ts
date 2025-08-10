import { expect, test } from "@playwright/test";

test.describe("Responsive Navigation", () => {
  const testViewports = [
    { width: 375, height: 667, device: "Mobile" },
    { width: 768, height: 1024, device: "Tablet" },
    { width: 1200, height: 800, device: "Desktop" },
  ];

  test("should handle mobile menu interactions", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const mobileMenuButton = page.locator(
      '[data-testid="mobile-menu-button"], button:has-text("Menu"), .hamburger, .mobile-menu-toggle'
    );

    if (await mobileMenuButton.isVisible()) {
      // Open mobile menu
      await mobileMenuButton.click();

      // Mobile menu should be visible
      const mobileMenu = page.locator(
        '[data-testid="mobile-menu"], .mobile-menu, .mobile-nav'
      );
      await expect(mobileMenu).toBeVisible();

      // Menu items should be visible
      const mobileNavLinks = page.locator(
        '[data-testid="mobile-menu"] a, .mobile-menu a, .mobile-nav a'
      );
      if ((await mobileNavLinks.count()) > 0) {
        await expect(mobileNavLinks.first()).toBeVisible();
      }

      // Close menu by clicking button again
      await mobileMenuButton.click();

      // Menu should be hidden
      await expect(mobileMenu).not.toBeVisible();
    }
  });

  test("should handle mobile menu navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const mobileMenuButton = page.locator(
      '[data-testid="mobile-menu-button"], .hamburger'
    );

    if (await mobileMenuButton.isVisible()) {
      // Open mobile menu
      await mobileMenuButton.click();

      // Find navigation links
      const mobileNavLinks = page.locator(
        '[data-testid="mobile-menu"] a, .mobile-menu a'
      );
      const linkCount = await mobileNavLinks.count();

      if (linkCount > 0) {
        // Test navigation to different sections/pages
        for (let i = 0; i < Math.min(linkCount, 3); i++) {
          const link = mobileNavLinks.nth(i);
          const href = await link.getAttribute("href");

          if (href && !href.startsWith("http")) {
            // Internal link
            await link.click();

            // Menu should close after navigation
            const mobileMenu = page.locator(
              '[data-testid="mobile-menu"], .mobile-menu'
            );
            await expect(mobileMenu).not.toBeVisible({ timeout: 2000 });

            // Should navigate to correct section/page
            if (href.startsWith("#")) {
              // Anchor link - check if scrolled to section
              const targetElement = page.locator(href);
              if ((await targetElement.count()) > 0) {
                await expect(targetElement).toBeInViewport();
              }
            } else if (href !== "/") {
              // Different page - check URL
              expect(page.url()).toContain(href);
            }

            // Return to homepage for next test
            if (href !== "/") {
              await page.goto("/");
            }

            // Reopen menu for next iteration
            if (i < Math.min(linkCount, 3) - 1) {
              await mobileMenuButton.click();
            }
          }
        }
      }
    }
  });

  test("should close mobile menu when clicking outside", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const mobileMenuButton = page.locator(
      '[data-testid="mobile-menu-button"], .hamburger'
    );

    if (await mobileMenuButton.isVisible()) {
      // Open mobile menu
      await mobileMenuButton.click();

      const mobileMenu = page.locator(
        '[data-testid="mobile-menu"], .mobile-menu'
      );
      await expect(mobileMenu).toBeVisible();

      // Click outside the menu (on main content)
      await page.locator("main, body").click({ position: { x: 100, y: 300 } });

      // Menu should close
      await expect(mobileMenu).not.toBeVisible();
    }
  });

  test("should maintain navigation accessibility across screen sizes", async ({
    page,
  }) => {
    for (const viewport of testViewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");

      // Check if navigation is keyboard accessible
      await page.keyboard.press("Tab");

      const focusedElement = page.locator(":focus");
      await expect(focusedElement).toBeVisible();

      // On mobile, first tab should focus mobile menu button
      if (viewport.width < 768) {
        const mobileMenuButton = page.locator(
          '[data-testid="mobile-menu-button"], .hamburger'
        );
        if (await mobileMenuButton.isVisible()) {
          await mobileMenuButton.focus();
          await expect(mobileMenuButton).toBeFocused();

          // Test opening menu with keyboard
          await page.keyboard.press("Enter");

          const mobileMenu = page.locator(
            '[data-testid="mobile-menu"], .mobile-menu'
          );
          if ((await mobileMenu.count()) > 0) {
            await expect(mobileMenu).toBeVisible();

            // Test keyboard navigation within menu
            await page.keyboard.press("Tab");
            const menuFocusedElement = page.locator(":focus");
            await expect(menuFocusedElement).toBeVisible();
          }
        }
      } else {
        // On desktop, tab navigation should work through nav links
        const navLinks = page.locator("nav a");
        if ((await navLinks.count()) > 0) {
          const firstLink = navLinks.first();
          await firstLink.focus();
          await expect(firstLink).toBeFocused();
        }
      }
    }
  });

  test("should handle navigation logo/brand link", async ({ page }) => {
    await page.goto("/");

    // Look for logo or brand link in navigation
    const logoLink = page.locator(
      'nav a[href="/"], header a[href="/"], [data-testid="logo-link"], .logo a'
    );

    if ((await logoLink.count()) > 0) {
      const currentUrl = page.url();

      // If not on homepage, test logo link navigation
      if (!currentUrl.endsWith("/") && !currentUrl.endsWith("/#")) {
        await page.goto("/blog");

        await logoLink.click();
        await page.waitForLoadState();

        // Should navigate back to homepage
        expect(page.url()).toMatch(/\/$|\/$/);
      }

      // Test logo link is visible across viewports
      for (const viewport of testViewports) {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.reload();

        await expect(logoLink).toBeVisible();
      }
    }
  });
});
