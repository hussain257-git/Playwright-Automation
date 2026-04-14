import { test, expect } from "@playwright/test";
import testData from "../../test-data/users.json";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Sauce Demo - Authentication Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com");
  });

  test("TC-001: Login with valid credentials (standard_user)", async ({ page }) => {
    const user = testData.validUsers[0];
    
    // Verify login page is loaded
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    
    // Perform login
    await loginPage.login(user.email, user.password);
    
    // Verify redirect to inventory page
    const url = await page.url();
    expect(url).toContain("/inventory.html");
    
    console.log(`✓ Logged in as ${user.email}`);
  });

  test("TC-002: Login with locked out user account", async ({ page }) => {
    const invalidUser = testData.invalidUsers[0];
    
    // Attempt login
    await loginPage.login(invalidUser.email, invalidUser.password);
    
    // Verify error message appears
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("locked out");
    
    console.log("✓ Error message correctly displayed for locked out user");
  });

  test("TC-003: Login with different valid users", async ({ page }) => {
    for (const user of testData.validUsers) {
      // Navigate to login
      await page.goto("https://www.saucedemo.com", { waitUntil: "networkidle" });
      
      // Wait for login page to load
      await page.locator("#user-name").waitFor({ state: "visible", timeout: 5000 });
      
      // Login
      await loginPage.login(user.email, user.password);
      
      // Wait for inventory page to load
      await page.locator(".inventory_list").waitFor({ state: "visible", timeout: 5000 });
      
      // Verify successful login
      const url = await page.url();
      expect(url).toContain("/inventory.html");
      
      console.log(`✓ Successfully logged in as ${user.email}`);
      
      // Logout for next iteration
      await loginPage.logout();
      
      // Wait a bit for page to settle
      await page.waitForLoadState("networkidle").catch(() => {});
      
      // Verify back on login page
      const loginPageUrl = await page.url();
      expect(loginPageUrl).toContain("saucedemo.com");
      expect(loginPageUrl).not.toContain("/inventory");
    }
  });

  test("TC-004: Empty username field validation", async ({ page }) => {
    // Try to login with empty username
    await loginPage.enterPassword("secret_sauce");
    await loginPage.clickLogin();
    
    // Verify error message
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    
    console.log("✓ Error correctly shown for empty username");
  });

  test("TC-005: Empty password field validation", async ({ page }) => {
    // Try to login with empty password
    await loginPage.enterEmail("standard_user");
    await loginPage.clickLogin();
    
    // Verify error message
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    
    console.log("✓ Error correctly shown for empty password");
  });

  test("TC-006: Successful logout", async ({ page }) => {
    const user = testData.validUsers[0];
    
    // Login first
    await loginPage.login(user.email, user.password);
    const loginUrl = await page.url();
    expect(loginUrl).toContain("/inventory.html");
    
    // Logout
    await loginPage.logout();
    
    // Verify back at login page
    const logoutUrl = await page.url();
    expect(logoutUrl).toContain("saucedemo.com");
    expect(logoutUrl).not.toContain("inventory");
    
    console.log("✓ Successfully logged out");
  });
});
