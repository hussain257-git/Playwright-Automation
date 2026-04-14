import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  // Sauce Demo Locators
  readonly productItem: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly sortContainer: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDesc: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    super(page);
    // Sauce Demo inventory page locators
    this.productItem = page.locator(".inventory_item");
    this.productName = page.locator(".inventory_item_name");
    this.productPrice = page.locator(".inventory_item_price");
    this.addToCartButton = page.locator("button[data-test*='add-to-cart']");
    this.sortContainer = page.locator(".product_sort_container");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.inventoryItemName = page.locator(".inventory_item_name");
    this.inventoryItemDesc = page.locator(".inventory_item_desc");
    this.inventoryItemPrice = page.locator(".inventory_item_price");
  }

  async navigateToProducts(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
    await this.page.waitForLoadState("networkidle");
  }

  async getProductCount(): Promise<number> {
    return await this.productItem.count();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const button = this.productItem.nth(index).locator("button[data-test*='add-to-cart']");
    await button.click();
    await this.page.waitForTimeout(500);
  }

  async removeProductFromCart(index: number = 0): Promise<void> {
    // Find remove button in the product item
    const button = this.productItem.nth(index).locator("button[data-test*='remove']");
    await button.click();
    await this.page.waitForTimeout(500);
  }

  async sortBy(sortValue: string): Promise<void> {
    // Sort options: az, za, lowestprice, highestprice
    await this.sortContainer.selectOption(sortValue);
    await this.page.waitForTimeout(1000);
  }

  async clickOnProduct(index: number = 0): Promise<void> {
    await this.productItem.nth(index).locator(this.inventoryItemName).click();
    await this.page.waitForLoadState("networkidle");
  }

  async waitForLoadingToComplete(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async searchProduct(productName: string): Promise<void> {
    // Sauce Demo doesn't have search functionality
    // Click on product by name instead
    const product = this.page.locator(`.inventory_item_name:has-text("${productName}")`).first();
    if (await product.isVisible()) {
      await product.click();
    }
  }

  async filterByCategory(category: string): Promise<void> {
    // Sauce Demo doesn't have category filters
    // Placeholder for compatibility
    await this.page.waitForTimeout(500);
  }

  async filterByPrice(maxPrice: string): Promise<void> {
    // Sauce Demo doesn't have price filters in inventory view
    // Placeholder for compatibility
    await this.page.waitForTimeout(500);
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
      const name = await this.productName.nth(i).textContent();
      const price = await this.productPrice.nth(i).textContent();
      products.push({ title: name?.trim() || "", price: price?.trim() || "" });
    }
    return products;
  }
}

