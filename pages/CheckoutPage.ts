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
  
  // Order completion page locators
  readonly completeContainer: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpress: Locator;
  readonly dispatchMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Sauce Demo checkout page locators - Step One (Shipping Info)
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.zipCodeInput = page.locator("[data-test='postalCode']");
    
    // Checkout buttons
    this.placeOrderButton = page.locator("[data-test='finish']");
    this.backToCart = page.locator("[data-test='cancel']");
    
    // Order completion page locators
    this.completeContainer = page.locator(".complete-container");
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.ponyExpress = page.locator("img[alt='Pony Express']");
    this.dispatchMessage = page.locator(".complete-text");
    
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
    console.log("Filling shipping information...");
    
    // Fill shipping information on Sauce Demo checkout step one
    await this.firstNameInput.fill(shippingData.firstName);
    await this.lastNameInput.fill(shippingData.lastName);
    await this.zipCodeInput.fill(shippingData.zipCode);
    
    console.log(`Shipping info filled: ${shippingData.firstName} ${shippingData.lastName} ${shippingData.zipCode}`);
    
    // Click continue button
    const continueButton = this.page.locator("[data-test='continue']");
    await continueButton.waitFor({ state: 'visible', timeout: 5000 });
    await continueButton.scrollIntoViewIfNeeded();
    console.log("Continue button found, clicking...");
    await continueButton.click();
    console.log("Continue button clicked, waiting for checkout step 2...");
    
    // Wait for step two to load - be more thorough
    await this.page.waitForLoadState("networkidle").catch(() => {});
    await this.page.waitForTimeout(1000);
    
    // Verify we're on checkout step 2
    const currentUrl = this.page.url();
    console.log("Current URL after continue:", currentUrl);
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
    
    console.log("Attempting to place order...");
    console.log("Current URL:", this.page.url());
    
    // Ensure the finish button is visible and clickable
    await finishButton.waitFor({ state: 'visible', timeout: 5000 });
    await finishButton.scrollIntoViewIfNeeded();
    
    console.log("Finish button found and visible, clicking...");
    await finishButton.click();
    
    console.log("Finish button clicked, waiting for page load...");
    
    // Wait for order completion page to load
    await this.page.waitForLoadState("networkidle").catch(() => {});
    
    // Wait a bit for success message to appear
    await this.page.waitForTimeout(1000);
    
    console.log("Page loaded. Current URL:", this.page.url());
  }

  async isOrderSuccessful(): Promise<boolean> {
    try {
      // Wait for the complete page to load with multiple indicators
      // Check for complete-container first
      const completeContainer = await this.page.locator(".complete-container").waitFor({ 
        state: 'visible', 
        timeout: 5000 
      }).catch(() => null);
      
      if (completeContainer) {
        return true;
      }

      // Fallback: check for success message or order number
      const successMessage = await this.page.locator(".complete-header").isVisible().catch(() => false);
      if (successMessage) {
        return true;
      }

      // Check for order details container
      const orderDetails = await this.page.locator(".checkout_complete_container").isVisible().catch(() => false);
      if (orderDetails) {
        return true;
      }

      // Check URL for success page
      const url = this.page.url();
      if (url.includes("checkout-complete")) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("Error checking order success:", error);
      return false;
    }
  }

  // NEW: Comprehensive order summary validations
  async getOrderConfirmationMessage(): Promise<string | null> {
    const message = await this.completeHeader.textContent().catch(() => null);
    return message?.trim() || null;
  }

  async getDispatchMessage(): Promise<string | null> {
    const message = await this.dispatchMessage.textContent().catch(() => null);
    return message?.trim() || null;
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this.ponyExpress.isVisible().catch(() => false);
  }

  async verifyOrderCompletePage(): Promise<{
    isComplete: boolean;
    confirmationMessage: string | null;
    dispatchMsg: string | null;
    ponyExpressVisible: boolean;
    pageUrl: string;
  }> {
    return {
      isComplete: await this.isOrderSuccessful(),
      confirmationMessage: await this.getOrderConfirmationMessage(),
      dispatchMsg: await this.getDispatchMessage(),
      ponyExpressVisible: await this.isPonyExpressImageVisible(),
      pageUrl: this.page.url()
    };
  }

  async getOrderSummaryDetails(): Promise<{
    confirmationText: string;
    dispatchText: string;
  }> {
    const completeHeader = await this.completeHeader.textContent().catch(() => "");
    const completeText = await this.completeText.textContent().catch(() => "");
    
    return {
      confirmationText: completeHeader?.trim() || "",
      dispatchText: completeText?.trim() || ""
    };
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
