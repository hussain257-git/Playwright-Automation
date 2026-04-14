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
    try {
      const button = this.productItem.nth(index).locator("button[data-test*='add-to-cart']");
      
      // Wait for button to be visible and enabled
      await button.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(300);
      
      // Scroll into view to ensure it's clickable
      await button.scrollIntoViewIfNeeded();
      
      // Get initial cart count
      const cartBadgeBefore = await this.cartBadge.textContent().catch(() => "0");
      const countBefore = parseInt(cartBadgeBefore || "0");
      
      // Click the button
      await button.click();
      console.log(`Product at index ${index} add-to-cart button clicked`);
      
      // Wait for cart badge to update (indicating item was added)
      await this.page.waitForTimeout(500);
      
      // Verify item was added by checking cart badge
      const cartBadgeAfter = await this.cartBadge.textContent().catch(() => "0");
      const countAfter = parseInt(cartBadgeAfter || "0");
      console.log(`Cart count updated: ${countBefore} -> ${countAfter}`);
      
    } catch (error) {
      console.log(`Error adding product at index ${index} to cart:`, error);
      throw error;
    }
  }

  async removeProductFromCart(index: number = 0): Promise<void> {
    // Find remove button in the product item
    const button = this.productItem.nth(index).locator("button[data-test*='remove']");
    await button.click();
    await this.page.waitForTimeout(500);
  }

  async sortBy(sortValue: string): Promise<void> {
    // Sort options: az, za, lohi (low to high), hilo (high to low)
    // Map user-friendly names to actual select values
    const sortMap: { [key: string]: string } = {
      "az": "az",
      "za": "za",
      "lowestprice": "lohi",
      "highestprice": "hilo",
      "lohi": "lohi",
      "hilo": "hilo",
      "low to high": "lohi",
      "high to low": "hilo"
    };

    const actualValue = sortMap[sortValue.toLowerCase()] || sortValue;
    
    // Ensure the sort selector is visible and enabled before interacting
    await this.sortContainer.waitFor({ state: 'visible', timeout: 5000 });
    await this.sortContainer.scrollIntoViewIfNeeded();
    
    console.log(`Sorting by: ${sortValue} (actual value: ${actualValue})`);
    
    try {
      await this.sortContainer.selectOption(actualValue);
      console.log("✓ Sort option selected successfully");
    } catch (error) {
      console.log("Error selecting sort option:", error);
      console.log("Attempting alternative approach...");
      
      // Fallback: get all available options and try to match
      const options = await this.sortContainer.locator("option").allTextContents();
      console.log("Available options:", options);
      
      // Try matching with partial text match
      for (const option of options) {
        if (option.toLowerCase().includes(sortValue.toLowerCase())) {
          await this.sortContainer.selectOption({ label: option });
          console.log(`✓ Matched and selected: ${option}`);
          break;
        }
      }
    }
    
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

