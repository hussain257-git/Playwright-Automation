import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

const BASE_URL = "https://www.saucedemo.com";

test.describe("Product Listing Page (Inventory)", { tag: ["@regression", "@inventory"] }, () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await page.goto(`${BASE_URL}/inventory.html`);
  });

  test("TC-006: Verify at least 6 products are displayed", { tag: ["@smoke"] }, async () => {
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("TC-007: Validate product names and prices are visible", async ({ page }) => {
    const names = await productPage.getProductNames();
    const prices = await productPage.getProductPrices();

    expect(names.length).toBeGreaterThanOrEqual(6);
    expect(prices.length).toBeGreaterThanOrEqual(6);

    // Verify all names are non-empty
    names.forEach(name => expect(name.trim()).not.toBe(""));
    // Verify all prices start with $
    prices.forEach(price => expect(price.trim()).toMatch(/^\$/));

    // Verify product images are visible
    const images = page.locator(".inventory_item_img img");
    const imgCount = await images.count();
    expect(imgCount).toBeGreaterThanOrEqual(6);
    for (let i = 0; i < imgCount; i++) {
      await expect(images.nth(i)).toBeVisible();
    }
  });

  test("TC-008: Sort products low to high - prices are in ascending order", async () => {
    await productPage.sortBy("lohi");
    const prices = await productPage.getProductPrices();
    const numeric = prices.map(p => parseFloat(p.replace("$", "")));
    for (let i = 0; i < numeric.length - 1; i++) {
      expect(numeric[i]).toBeLessThanOrEqual(numeric[i + 1]);
    }
  });

  test("TC-009: Sort products high to low - prices are in descending order", async () => {
    await productPage.sortBy("hilo");
    const prices = await productPage.getProductPrices();
    const numeric = prices.map(p => parseFloat(p.replace("$", "")));
    for (let i = 0; i < numeric.length - 1; i++) {
      expect(numeric[i]).toBeGreaterThanOrEqual(numeric[i + 1]);
    }
  });
});
