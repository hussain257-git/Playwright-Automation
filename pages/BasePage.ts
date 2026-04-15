import { Page, Locator } from "@playwright/test";

/**
 * BasePage provides common functionality for all page objects
 * Focus: Simple, stable, minimal wait times
 */
export class BasePage {
  readonly page: Page;
  protected readonly DEFAULT_TIMEOUT = 5000;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async click(locator: Locator | string): Promise<void> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible", timeout: this.DEFAULT_TIMEOUT });
    await element.click({ timeout: this.DEFAULT_TIMEOUT });
  }

  async fill(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible", timeout: this.DEFAULT_TIMEOUT });
    await element.fill(text, { timeout: this.DEFAULT_TIMEOUT });
  }

  async getText(locator: Locator | string): Promise<string> {
    if (typeof locator === "string") {
      return await this.page.textContent(locator);
    }
    return await locator.textContent();
  }

  async isVisible(locator: Locator | string): Promise<boolean> {
    if (typeof locator === "string") {
      return await this.page.isVisible(locator);
    }
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }

  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async waitForNavigation(action: () => Promise<void>): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      action(),
    ]);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}
