import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  // Sauce Demo Locators
  readonly cartItems: Locator;
  readonly cartItemCount: Locator;
  readonly removeButton: Locator;
  readonly quantityInput: Locator;
  readonly subtotalPrice: Locator;
  readonly taxPrice: Locator;
  readonly totalPrice: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;
  readonly emptyCartMessage: Locator;
  readonly applyPromoCodeButton: Locator;
  readonly cartQuantity: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;

  constructor(page: Page) {
    super(page);
    // Sauce Demo cart page locators
    this.cartItems = page.locator(".cart_item");
    this.cartItemCount = page.locator(".shopping_cart_badge");
    this.removeButton = page.locator("button[data-test*='remove']");
    this.quantityInput = page.locator(".cart_quantity");
    this.subtotalPrice = page.locator(".summary_subtotal_label");
    this.taxPrice = page.locator(".summary_tax_label");
    this.totalPrice = page.locator(".summary_total_label");
    this.checkoutButton = page.locator("#checkout");
    this.continueShopping = page.locator("#continue-shopping");
    this.emptyCartMessage = page.locator("text=Your cart is empty");
    this.applyPromoCodeButton = page.locator("button").filter({ hasText: "Apply" });
    this.cartQuantity = page.locator(".cart_quantity");
    this.cartItemName = page.locator(".inventory_item_name");
    this.cartItemPrice = page.locator(".inventory_item_price");
  }

  async navigateToCart(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/cart.html");
    await this.page.waitForLoadState("networkidle");
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItemFromCart(index: number = 0): Promise<void> {
    const item = this.cartItems.nth(index);
    const button = item.locator("button[data-test*='remove']");
    await button.click();
    await this.page.waitForTimeout(500);
  }

  async updateQuantity(index: number, quantity: number): Promise<void> {
    // Sauce Demo doesn't have quantity input in cart
    // Placeholder for compatibility
    await this.page.waitForTimeout(500);
  }

  async getSubtotal(): Promise<string | null> {
    return await this.subtotalPrice.textContent();
  }

  async getTax(): Promise<string | null> {
    return await this.taxPrice.textContent();
  }

  async getTotal(): Promise<string | null> {
    return await this.totalPrice.textContent();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async continueShopping_click(): Promise<void> {
    await this.continueShopping.click();
    await this.page.waitForLoadState("networkidle");
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible().catch(() => false);
  }

  async applyPromoCode(code: string): Promise<void> {
    // Sauce Demo doesn't have promo code functionality
    // Placeholder for compatibility
    await this.page.waitForTimeout(500);
  }

  async getDiscountAmount(): Promise<string | null> {
    // Sauce Demo doesn't have discount display
    return null;
  }

  async saveItemForLater(index: number = 0): Promise<void> {
    // Sauce Demo doesn't have save for later
    await this.page.waitForTimeout(500);
  }

  async getItemDetails(index: number): Promise<{ name: string; price: string }> {
    const item = this.cartItems.nth(index);
    const name = await item.locator(this.cartItemName).textContent();
    const price = await item.locator(this.cartItemPrice).textContent();

    return {
      name: name?.trim() || "",
      price: price?.trim() || "",
    };
  }

  async goBackToCart(): Promise<void> {
    await this.navigateToCart();
  }
}
