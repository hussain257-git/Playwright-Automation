import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly removeButtons: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(".cart_item");
    this.removeButtons = page.locator("button[data-test*='remove']");
    this.checkoutButton = page.locator("#checkout");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/cart.html", { waitUntil: "domcontentloaded" });
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator(".inventory_item_name").allTextContents();
  }

  async getCartItemPrices(): Promise<string[]> {
    return await this.page.locator(".inventory_item_price").allTextContents();
  }

  async removeItem(index: number): Promise<void> {
    const button = this.cartItems.nth(index).locator("button[data-test*='remove']");
    await button.click();
    await this.page.waitForTimeout(300);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL("**/checkout-step-one.html", { timeout: 5000 });
  }

  async isEmpty(): Promise<boolean> {
    return (await this.cartItems.count()) === 0;
  }

  async getItemDetails(index: number): Promise<{ name: string; price: string; quantity: string }> {
    const item = this.cartItems.nth(index);
    const name = await item.locator(".inventory_item_name").textContent();
    const price = await item.locator(".inventory_item_price").textContent();
    const quantity = await item.locator(".cart_quantity").textContent();
    return {
      name: name?.trim() || "",
      price: price?.trim() || "",
      quantity: quantity?.trim() || "",
    };
  }
}

