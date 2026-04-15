import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly logoutLink: Locator;
  private readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test='error']");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.menuButton = page.locator("#react-burger-menu-btn");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com", { waitUntil: "domcontentloaded" });
    await this.usernameInput.waitFor({ state: "visible", timeout: 5000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL("**/inventory.html", { timeout: 5000 }).catch(() => {});
  }

  async getErrorMessage(): Promise<string | null> {
    const isVisible = await this.errorMessage.isVisible().catch(() => false);
    return isVisible ? await this.errorMessage.textContent() : null;
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: "visible", timeout: 5000 });
    await this.logoutLink.click();
    await this.page.waitForURL("**/", { timeout: 5000 }).catch(() => {});
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async isLoginPageLoaded(): Promise<boolean> {
    return await this.loginButton.isVisible().catch(() => false);
  }
}

