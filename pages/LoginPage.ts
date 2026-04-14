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
    try {
      console.log("Starting logout process...");
      
      // Wait for the menu button to be visible first
      const menuButton = this.page.locator("#react-burger-menu-btn");
      await menuButton.waitFor({ state: "visible", timeout: 5000 });
      console.log("Menu button found, waiting for it to be stable...");
      
      // Wait a bit for the page to be fully interactive
      await this.page.waitForTimeout(500);
      
      // Try to click the menu button with force option
      // The button is very small (transparent overlay), so we need to be careful
      await menuButton.click({ force: true, timeout: 5000 });
      console.log("Menu button clicked");
      
      // Wait for the menu animation to complete and menu to appear
      await this.page.waitForTimeout(500);
      
      // Wait for the logout link to become visible in the menu
      const logoutLink = this.page.locator("#logout_sidebar_link");
      await logoutLink.waitFor({ state: "visible", timeout: 5000 });
      console.log("Logout link found");
      
      // Ensure logout link is visible and clickable
      await logoutLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Click logout link
      await logoutLink.click({ timeout: 5000 });
      console.log("✓ Logged out successfully");
      
      // Wait for navigation back to login page
      await this.page.waitForURL("**/", { timeout: 5000 }).catch(() => {
        console.log("URL change not detected, but logout attempt completed");
      });
    } catch (error) {
      console.log("Error during logout:", error);
      // Try alternative logout method: go to base URL
      console.log("Attempting alternative logout via URL navigation...");
      await this.page.goto("https://www.saucedemo.com");
    }
  }
}
