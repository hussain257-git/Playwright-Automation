import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      await this.page.click(locator);
    } else {
      await locator.click();
    }
  }

  async fill(locator: Locator | string, text: string): Promise<void> {
    if (typeof locator === "string") {
      await this.page.fill(locator, text);
    } else {
      await locator.fill(text);
    }
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
