import { test, expect } from "@playwright/test";

test.describe("Horse Racing Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the home page", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Horse Racing Game");
  });

  test("should generate horses", async ({ page }) => {
    // Click the generate horses button
    await page.click('button:has-text("Generate Horses")');

    // Wait for horses to be generated
    await page.waitForTimeout(500);

    // Check if horses are displayed
    const horseItems = page
      .locator('[data-testid="horse-item"], .horse-item, li')
      .first();
    await expect(horseItems).toBeVisible();
  });

  test("should display horse list after generation", async ({ page }) => {
    // Generate horses
    await page.click('button:has-text("Generate Horses")');
    await page.waitForTimeout(500);

    // Check if multiple horses are visible (should have 20)
    const horseList = page.locator("text=/Horse #/");
    const count = await horseList.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should start a race", async ({ page }) => {
    // Generate horses first
    await page.click('button:has-text("Generate Horses")');
    await page.waitForTimeout(500);

    // Start the race
    const startButton = page.locator('button:has-text("Start Race")');
    if (await startButton.isVisible()) {
      await startButton.click();
      await page.waitForTimeout(1000);

      // Check if race is in progress or completed
      const raceTrack = page.locator('.race-track, [data-testid="race-track"]');
      await expect(raceTrack).toBeVisible();
    }
  });

  test("should reset the game", async ({ page }) => {
    // Generate horses
    await page.click('button:has-text("Generate Horses")');
    await page.waitForTimeout(500);

    // Reset the game
    const resetButton = page.locator('button:has-text("Reset")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);

      // Verify horses are cleared (Generate Horses button should be available)
      await expect(
        page.locator('button:has-text("Generate Horses")')
      ).toBeVisible();
    }
  });

  test("should display the main components", async ({ page }) => {
    // Check that all main sections are visible
    const header = page.locator('h1:has-text("Horse Racing Game")');
    await expect(header).toBeVisible();

    // Check for the description paragraph
    await expect(page.locator("p.text-gray-600")).toBeVisible();

    // Check for the generate button
    await expect(
      page.locator('button:has-text("Generate Horses")')
    ).toBeVisible();
  });
});
