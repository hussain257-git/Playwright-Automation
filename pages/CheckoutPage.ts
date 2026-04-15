import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.zipCodeInput = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
    this.finishButton = page.locator("[data-test='finish']");
    this.completeHeader = page.locator(".complete-header");
  }

  async fillShippingInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async continueToPayment(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForURL("**/checkout-step-two.html", { timeout: 5000 });
  }

  async placeOrder(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL("**/checkout-complete.html", { timeout: 5000 });
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.completeHeader.textContent() || "";
  }

  async isOrderComplete(): Promise<boolean> {
    return (await this.page.url()).includes("checkout-complete");
  }

  // Alias methods for test compatibility
  async fillUserInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    return this.fillShippingInfo(firstName, lastName, zipCode);
  }

  async continueCheckout(): Promise<void> {
    return this.continueToPayment();
  }

  async completeOrder(): Promise<void> {
    return this.placeOrder();
  }

  async getSuccessMessage(): Promise<string> {
    return this.getConfirmationMessage();
  }
}

