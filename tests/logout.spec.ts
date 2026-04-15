import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Logout Functionality", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login("standard_user", "secret_sauce");
    expect(page.url()).toContain("/inventory.html");
  });

  test("TC-014: Logout from burger menu redirects to login page", async ({ page }) => {
    await loginPage.logout();
    expect(page.url()).not.toContain("/inventory.html");
    // Verify login button is visible again
    const isLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoaded).toBe(true);
  });

  test("TC-015: After logout, accessing inventory redirects to login", async ({ page }) => {
    await loginPage.logout();
    // Try accessing inventory directly
    await page.goto("https://www.saucedemo.com/inventory.html");
    // Should be redirected back to login
    expect(page.url()).not.toContain("/inventory.html");
    expect(await loginPage.isLoginPageLoaded()).toBe(true);
  });
});
