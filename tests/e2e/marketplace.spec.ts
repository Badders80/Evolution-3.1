import { test, expect } from "@playwright/test";

test.describe("Marketplace", () => {
  test("can browse marketplace and view listing", async ({ page }) => {
    await page.goto("/marketplace");

    // Wait for listings to load
    await page.waitForSelector("[data-testid='listing-card']", {
      timeout: 10000,
    });

    // Verify marketplace page loads
    await expect(page.locator("h1")).toContainText(/marketplace/i);

    // Click first listing
    const firstListing = page.locator("[data-testid='listing-card']").first();
    await firstListing.click();

    // Verify detail page loads
    await page.waitForURL(/\/marketplace\/.+/);
    await expect(page.locator("h1")).toBeVisible();

    // Verify purchase section exists
    await expect(
      page.locator("button", { hasText: /buy|purchase|invest/i })
    ).toBeVisible();
  });

  test("routes are protected", async ({ page }) => {
    await page.goto("/mystable");
    await page.waitForURL(/\/auth/);
    await expect(page.locator("h1")).toContainText(/sign in|login/i);
  });
});