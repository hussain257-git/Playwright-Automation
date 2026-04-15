import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("E2E-001:Complete Purchase", () => {
  test("Complete purchase flow", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto("https://www.saucedemo.com");
    await loginPage.login("standard_user", "secret_sauce");
    expect(page.url()).toContain("inventory");

    const cntProducts = await productPage.getProductCount();
    expect(cntProducts).toBeGreaterThan(0);

    await productPage.addProductToCart(0);
    await page.waitForTimeout(300);
    await productPage.addProductToCart(1);
    await page.waitForTimeout(500);

    await cartPage.goto();
    const cntCart = await cartPage.getCartItemCount();
    expect(cntCart).toBe(2);

    await cartPage.checkout();
    await checkoutPage.fillUserInfo("John", "Doe", "12345");
    await checkoutPage.continueCheckout();
    await checkoutPage.completeOrder();

    const successMsg = await checkoutPage.getSuccessMessage();
    expect(successMsg).toContain("Thank");
  });
});

test.describe("E2E-002: Browse and Add to Cart", () => {
  test("Add multiple products and verify cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com");
    await loginPage.login("standard_user", "secret_sauce");
    expect(page.url()).toContain("inventory");

    // Verify products are displayed
    const productCount = await productPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(6);

    // Sort by price low to high and verify order
    await productPage.sortBy("lohi");
    const prices = await productPage.getProductPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace("$", "")));
    expect(numericPrices[0]).toBeLessThanOrEqual(numericPrices[1]);

    // Add 3 products to cart
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await productPage.addProductToCart(2);
    await page.waitForTimeout(300);

    // Verify cart badge shows 3
    const badgeCount = await productPage.getCartBadgeCount();
    expect(badgeCount).toBe(3);

    // Navigate to cart and verify items
    await cartPage.goto();
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(3);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames.length).toBe(3);
  });
});

test.describe("E2E-003: Remove Items from Cart", () => {
  test("Add items then remove one and verify count", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com");
    await loginPage.login("standard_user", "secret_sauce");

    // Add 3 products
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await productPage.addProductToCart(2);
    await page.waitForTimeout(300);

    // Navigate to cart and verify 3 items
    await cartPage.goto();
    let count = await cartPage.getCartItemCount();
    expect(count).toBe(3);

    // Remove first item
    await cartPage.removeItem(0);
    count = await cartPage.getCartItemCount();
    expect(count).toBe(2);

    // Remove another item
    await cartPage.removeItem(0);
    count = await cartPage.getCartItemCount();
    expect(count).toBe(1);

    // Verify cart is not empty yet
    const isEmpty = await cartPage.isEmpty();
    expect(isEmpty).toBe(false);
  });
});
