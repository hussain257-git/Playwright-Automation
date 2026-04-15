import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Negative & Edge Cases", () => {
  test("TC-021: Checkout without first name shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillUserInfo("", "", "");
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain("First Name is required");
  });

  test("TC-022: Checkout without last name shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillUserInfo("John", "", "");
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain("Last Name is required");
  });

  test("TC-023: Checkout without zip code shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.login("standard_user", "secret_sauce");
    await productPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillUserInfo("John", "Doe", "");
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain("Postal Code is required");
  });

  test("TC-024: Accessing inventory without login redirects to login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    expect(page.url()).not.toContain("inventory.html");
  });
});
