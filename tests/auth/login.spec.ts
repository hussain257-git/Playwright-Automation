import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Login Functionality", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test("TC-001: Valid login with standard_user", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    expect(page.url()).toContain("/inventory.html");
  });

  test("TC-002: Invalid login - wrong password", async () => {
    await loginPage.login("standard_user", "wrong_password");
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain("do not match");
  });

  test("TC-003: Locked out user login", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain("locked");
  });

  test("TC-004: Empty username shows error", async () => {
    await loginPage.login("", "secret_sauce");
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain("Username is required");
  });

  test("TC-005: Empty password shows error", async () => {
    await loginPage.login("standard_user", "");
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain("Password is required");
  });
});
