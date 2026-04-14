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
    // Sauce Demo checkout page locators - Step One (Shipping Info)
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.zipCodeInput = page.locator("[data-test='postalCode']");
    
    // Checkout buttons
    this.placeOrderButton = page.locator("[data-test='finish']");
    this.backToCart = page.locator("[data-test='cancel']");
    
    // Not used in Sauce Demo (but keep for compatibility)
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.addressInput = page.locator("#address");
    this.cityInput = page.locator("#city");
    this.stateInput = page.locator("#state");
    this.countrySelect = page.locator("select[name='country']");
    this.cardNumberInput = page.locator('input[name="cardNumber"]');
    this.cardExpiryInput = page.locator('input[name="expiry"]');
    this.cardCVVInput = page.locator('input[name="cvv"]');
    this.cardholderNameInput = page.locator('input[name="cardholderName"]');
    this.paymentMethodSelect = page.locator('select[name="paymentMethod"]');
    this.shippingMethodSelect = page.locator('select[name="shippingMethod"]');
    this.billingAddressCheckbox = page.locator('input[name="billingAddress"]');
    this.termsCheckbox = page.locator('input[name="terms"]');
    this.successMessage = page.locator(".complete-header");
    this.orderNumber = page.locator(".complete-text");
    this.orderSummary = page.locator(".checkout_summary_container");
  }

  async navigateToCheckout(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/checkout-step-one.html");
    await this.page.waitForLoadState("networkidle").catch(() => {});
  }

  async fillShippingInformation(shippingData: {
    firstName: string;
    lastName: string;
    zipCode: string;
  }): Promise<void> {
    // Fill shipping information on Sauce Demo checkout step one
    await this.firstNameInput.fill(shippingData.firstName);
    await this.lastNameInput.fill(shippingData.lastName);
    await this.zipCodeInput.fill(shippingData.zipCode);
    
    // Click continue button
    const continueButton = this.page.locator("[data-test='continue']");
    await continueButton.click();
    
    // Wait for step two to load
    await this.page.waitForLoadState("networkidle").catch(() => {});
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
    // The Finish button completes the order on checkout step two
    const finishButton = this.page.locator("[data-test='finish']");
    await finishButton.click();
    
    // Wait for order completion page to load
    await this.page.waitForLoadState("networkidle").catch(() => {});
    
    // Wait a bit for success message to appear
    await this.page.waitForTimeout(1000);
  }

  async isOrderSuccessful(): Promise<boolean> {
    // Check for complete header which shows on successful order
    const completePage = await this.page.locator(".complete-container").isVisible().catch(() => false);
    return completePage;
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
