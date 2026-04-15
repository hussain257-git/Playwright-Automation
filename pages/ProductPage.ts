import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private readonly productItem: Locator;
  private readonly sortContainer: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.productItem = page.locator(".inventory_item");
    this.sortContainer = page.locator(".product_sort_container");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/inventory.html", { waitUntil: "domcontentloaded" });
    // Wait for at least one product to load
    await this.productItem.first().waitFor({ state: "visible", timeout: 5000 });
  }

  async getProductCount(): Promise<number> {
    return await this.productItem.count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator(".inventory_item_name").allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.page.locator(".inventory_item_price").allTextContents();
  }

  async addProductToCart(index: number): Promise<void> {
    const button = this.productItem.nth(index).locator("button[data-test*='add-to-cart']");
    await button.waitFor({ state: "visible", timeout: 5000 });
    await button.click();
    // Small wait for cart badge to update
    await this.page.waitForTimeout(300);
  }

  async addProductByName(productName: string): Promise<void> {
    const button = this.page.locator(`button[data-test*='add-to-cart-${productName.toLowerCase().replace(/\\s+/g, "-")}']`);
    await button.click();
    await this.page.waitForTimeout(300);
  }

  async removeProductFromCart(index: number): Promise<void> {
    const button = this.productItem.nth(index).locator("button[data-test*='remove']");
    await button.click();
    await this.page.waitForTimeout(300);
  }

  async sortBy(sortOption: string): Promise<void> {
    // Maps like "lohi", "hilo", "az", "za"
    await this.sortContainer.selectOption(sortOption);
    await this.page.waitForTimeout(500);
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent().catch(() => null);
    return text ? parseInt(text) : 0;
  }

  async isNoResultsDisplayed(): Promise<boolean> {
    return false; // Sauce Demo always shows products
  }

  async isLoadingSpinnerVisible(): Promise<boolean> {
    return false; // Sauce Demo doesn't use spinners
  }

  async getProductsData(): Promise<Array<{ title: string; price: string }>> {
    const products = [];
    const count = await this.productItem.count();
    for (let i = 0; i < count; i++) {
      const name = await this.page.locator(".inventory_item_name").nth(i).textContent();
      const price = await this.page.locator(".inventory_item_price").nth(i).textContent();
      products.push({ title: name?.trim() || "", price: price?.trim() || "" });
    }
    return products;
  }
}

