import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Cart Page Validation", { tag: ["@regression", "@cart"] }, () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await page.goto(`${BASE_URL}/inventory.html`);
  });

  test("TC-010: Items added to cart persist when navigating to cart page", { tag: ["@smoke"] }, async () => {
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await cartPage.goto();

    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test("TC-011: Cart item details match inventory - name and price consistency", async ({ page }) => {
    // Get product data from inventory before adding
    const inventoryNames = await productPage.getProductNames();
    const inventoryPrices = await productPage.getProductPrices();

    // Add first product
    await productPage.addProductToCart(0);
    await cartPage.goto();

    // Validate item in cart matches inventory
    const details = await cartPage.getItemDetails(0);
    expect(details.name).toBe(inventoryNames[0]);
    expect(details.price).toBe(inventoryPrices[0]);
    expect(details.quantity).toBe("1");
  });

  test("TC-012: Cart badge count matches items added", async () => {
    await productPage.addProductToCart(0);
    let badge = await productPage.getCartBadgeCount();
    expect(badge).toBe(1);

    await productPage.addProductToCart(1);
    badge = await productPage.getCartBadgeCount();
    expect(badge).toBe(2);

    await cartPage.goto();
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(2);
  });

  test("TC-013: Remove item from cart updates cart correctly", async () => {
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await cartPage.goto();

    expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.removeItem(0);
    expect(await cartPage.getCartItemCount()).toBe(1);

    await cartPage.removeItem(0);
    expect(await cartPage.isEmpty()).toBe(true);
  });
});
