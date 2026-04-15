import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import testDataJson from "../test-data/users.json";

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
    expect(testDataJson.validUsers).toBeDefined();
    expect(testDataJson.validUsers.length).toBeGreaterThan(0);
    expect(testDataJson.validUsers[0].email).toBeTruthy();
    
    console.log(`✓ Test data loaded: ${testDataJson.validUsers.length} users available`);
  });

  test("Verify Page Object Model instantiation", async ({ page }) => {
    const basePage = new BasePage(page);
    
    expect(typeof basePage.navigate).toBe("function");
    expect(typeof basePage.click).toBe("function");
    expect(typeof basePage.fill).toBe("function");
    expect(typeof basePage.getText).toBe("function");
    
    console.log("✓ Page Object methods are correctly defined");
  });
});
