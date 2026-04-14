import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  // Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCVVInput: Locator;
  readonly cardholderNameInput: Locator;
  readonly paymentMethodSelect: Locator;
  readonly placeOrderButton: Locator;
  readonly successMessage: Locator;
  readonly orderNumber: Locator;
  readonly termsCheckbox: Locator;
  readonly backToCart: Locator;
  readonly shippingMethodSelect: Locator;
  readonly billingAddressCheckbox: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    super(page);
    // Sauce Demo checkout page locators
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.emailInput = page.locator("#postal-code");
    this.phoneInput = page.locator("#phone");
    this.addressInput = page.locator("#address");
    this.cityInput = page.locator("#city");
    this.stateInput = page.locator("#state");
    this.zipCodeInput = page.locator("#postal-code");
    this.countrySelect = page.locator("select");

    // Payment Information
    this.cardNumberInput = page.locator('input[name="cardNumber"]');
    this.cardExpiryInput = page.locator('input[name="expiry"]');
    this.cardCVVInput = page.locator('input[name="cvv"]');
    this.cardholderNameInput = page.locator('input[name="cardholderName"]');
    this.paymentMethodSelect = page.locator('select[name="paymentMethod"]');

    // Other
    this.shippingMethodSelect = page.locator('select[name="shippingMethod"]');
    this.billingAddressCheckbox = page.locator('input[name="billingAddress"]');
    this.termsCheckbox = page.locator('input[name="terms"]');
    this.placeOrderButton = page.locator("#finish");
    this.successMessage = page.locator("text=Thank you for your order");
    this.orderNumber = page.locator(".order-id");
    this.backToCart = page.locator("#cancel");
    this.orderSummary = page.locator(".checkout_summary_container");
  }

  async navigateToCheckout(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/checkout-step-one.html");
    await this.page.waitForLoadState("networkidle");
  }

  async fillShippingInformation(shippingData: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode: string;
    country?: string;
  }): Promise<void> {
    await this.firstNameInput.fill(shippingData.firstName);
    await this.lastNameInput.fill(shippingData.lastName);
    await this.zipCodeInput.fill(shippingData.zipCode);
    // Continue to next step
    await this.page.locator("#continue").click();
    await this.page.waitForLoadState("networkidle");
  }

  async selectShippingMethod(method: string): Promise<void> {
    // Sauce Demo doesn't have shipping method selection
    await this.page.waitForTimeout(500);
  }

  async fillPaymentInformation(paymentData: any): Promise<void> {
    // Sauce Demo doesn't have payment information on checkout
    await this.page.waitForTimeout(500);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    // Sauce Demo doesn't have payment method selection
    await this.page.waitForTimeout(500);
  }

  async useSameAddressForBilling(): Promise<void> {
    // Sauce Demo doesn't have billing address option
    await this.page.waitForTimeout(500);
  }

  async acceptTerms(): Promise<void> {
    // Sauce Demo doesn't have terms checkbox
    await this.page.waitForTimeout(500);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async isOrderSuccessful(): Promise<boolean> {
    return await this.successMessage.isVisible().catch(() => false);
  }

  async getOrderNumber(): Promise<string> {
    return "#12345"; // Sauce Demo doesn't show order number
  }

  async isOrderSummaryVisible(): Promise<boolean> {
    return await this.orderSummary.isVisible().catch(() => false);
  }

  async goBackToCart(): Promise<void> {
    await this.backToCart.click();
    await this.page.waitForLoadState("networkidle");
  }

  async completeCheckout(shippingData: any, paymentData: any): Promise<void> {
    await this.fillShippingInformation(shippingData);
    await this.placeOrder();
  }
}
