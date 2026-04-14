import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Sauce Demo Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly cartBadge: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    super(page);
    // Sauce Demo uses specific IDs for authentication
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test='error']");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.appLogo = page.locator(".app_logo");
  }

  async navigateToLoginPage(): Promise<void> {
    // Sauce Demo login page is the home page
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for inventory page to load
    await this.page.waitForURL("**/inventory.html", { timeout: 5000 }).catch(() => {});
  }

  async loginWithRememberMe(username: string, password: string): Promise<void> {
    // Sauce Demo doesn't have remember me, but we log in normally
    await this.login(username, password);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.isErrorDisplayed()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  async clickForgotPassword(): Promise<void> {
    // Sauce Demo doesn't have forgot password link on login
    await this.page.goto("https://www.saucedemo.com");
  }

  async clickSignUp(): Promise<void> {
    // Sauce Demo doesn't have sign up link
    await this.page.goto("https://www.saucedemo.com");
  }

  async isLoginPageLoaded(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async enterEmail(email: string): Promise<void> {
    await this.usernameInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    // Click menu button to open menu
    const menuButton = this.page.locator("#react-burger-menu-btn");
    await menuButton.click();
    
    // Wait a bit for the menu animation to complete
    await this.page.waitForTimeout(300);
    
    // Get the logout link locator
    const logoutLink = this.page.locator("#logout_sidebar_link");
    
    // Wait for logout link to be visible
    await logoutLink.waitFor({ state: "visible", timeout: 5000 });
    
    // Scroll logout link into view if needed and click
    await logoutLink.scrollIntoViewIfNeeded();
    await logoutLink.click();
    
    // Wait for navigation to complete
    await this.page.waitForURL("**/", { timeout: 5000 }).catch(() => {});
  }
}
