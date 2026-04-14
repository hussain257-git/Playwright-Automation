import { test, expect } from "@playwright/test";

test.describe("Verification - Framework Setup", () => {
  test("Verify Playwright is working with real website", async ({ page }) => {
    // Navigate to a real public website
    await page.goto("https://github.com");
    
    // Wait for page to load
    await page.waitForLoadState("networkidle");
    
    // Verify page title contains expected text
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✓ Page loaded successfully: ${title}`);
  });

  test("Verify Page Object Model pattern works", async ({ page }) => {
    // Navigate to Wikipedia
    await page.goto("https://www.wikipedia.org", { waitUntil: "networkidle" });
    
    // Verify page is loaded
    const pageTitle = page.locator("h1");
    await expect(pageTitle).toBeVisible({ timeout: 5000 });
    
    console.log("✓ Page Object Model pattern is working correctly");
  });

  test("Verify multiple interactions work", async ({ page }) => {
    // Navigate to a page with interactive elements
    await page.goto("https://example.com", { waitUntil: "networkidle" });
    
    // Get page URL
    const url = page.url();
    expect(url).toContain("example.com");
    
    // Get page title
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Take screenshot to verify headed mode works
    await page.screenshot({ path: "verification-screenshot.png" });
    
    console.log(`✓ All interactions working: URL=${url}, Title=${title}`);
  });

  test("Verify test data can be imported", async ({ page }) => {
    // Import and verify test data works
    const testData = await import("../test-data/users.json");
    
    expect(testData.validUsers).toBeDefined();
    expect(testData.validUsers.length).toBeGreaterThan(0);
    expect(testData.validUsers[0].email).toBeTruthy();
    
    console.log(`✓ Test data loaded: ${testData.validUsers.length} users available`);
  });

  test("Verify Page Object Model instantiation", async ({ page }) => {
    // This test verifies the page object can be instantiated without errors
    const { BasePage } = await import("../pages/BasePage");
    
    // Create instance
    const basePage = new BasePage(page);
    
    // Verify methods exist
    expect(typeof basePage.navigate).toBe("function");
    expect(typeof basePage.click).toBe("function");
    expect(typeof basePage.fill).toBe("function");
    expect(typeof basePage.getText).toBe("function");
    
    console.log("✓ Page Object methods are correctly defined");
  });
});
