import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("UI/UX Validation", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("TC-016: App logo is visible on inventory page", async ({ page }) => {
    const logo = page.locator(".app_logo");
    await expect(logo).toBeVisible();
    expect(await logo.textContent()).toContain("Swag Labs");
  });

  test("TC-017: Page title contains Swag Labs", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Swag Labs");
  });

  test("TC-018: Shopping cart icon is visible", async ({ page }) => {
    await expect(page.locator(".shopping_cart_link")).toBeVisible();
  });

  test("TC-019: Burger menu button is visible", async ({ page }) => {
    await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
  });

  test("TC-020: All product items contain name, price and button", async ({ page }) => {
    const items = page.locator(".inventory_item");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(6);
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i).locator(".inventory_item_name")).toBeVisible();
      await expect(items.nth(i).locator(".inventory_item_price")).toBeVisible();
      await expect(items.nth(i).locator("button[data-test*='add-to-cart']")).toBeVisible();
    }
  });
});
