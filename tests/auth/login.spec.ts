import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { users } from "../../test-data/test-data";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Login Functionality", { tag: ["@regression", "@login"] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Login tests need clean browser
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test("TC-001: Valid login with standard_user", { tag: ["@smoke"] }, async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    expect(page.url()).toContain("/inventory.html");
  });

  test("TC-002: Invalid login - wrong password", async () => {
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain(users.invalidPassword.expectedError);
  });

  test("TC-003: Locked out user login", async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain(users.locked.expectedError);
  });

  test("TC-004: Empty username shows error", async () => {
    await loginPage.login(users.emptyUsername.username, users.emptyUsername.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain(users.emptyUsername.expectedError);
  });

  test("TC-005: Empty password shows error", async () => {
    await loginPage.login(users.emptyPassword.username, users.emptyPassword.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain(users.emptyPassword.expectedError);
  });
});
