import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkout } from "../test-data/test-data";

test.describe("E2E-001:Complete Purchase", { tag: ["@regression", "@e2e", "@checkout"] }, () => {
  test("Complete purchase flow", { tag: ["@smoke"] }, async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto("https://www.saucedemo.com/inventory.html");
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
    await checkoutPage.fillUserInfo(checkout.validAddress.firstName, checkout.validAddress.lastName, checkout.validAddress.zipCode);
    await checkoutPage.continueCheckout();
    await checkoutPage.completeOrder();

    const successMsg = await checkoutPage.getSuccessMessage();
    expect(successMsg).toContain("Thank");
  });
});

test.describe("E2E-002: Browse and Add to Cart", { tag: ["@regression", "@e2e", "@cart"] }, () => {
  test("Add multiple products and verify cart", async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com/inventory.html");
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

test.describe("E2E-003: Remove Items from Cart", { tag: ["@regression", "@e2e", "@cart"] }, () => {
  test("Add items then remove one and verify count", async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com/inventory.html");

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
