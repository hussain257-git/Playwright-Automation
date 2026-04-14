import { test as base, type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type PageFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // Pre-authenticate the user by storing auth tokens or cookies
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login("test@example.com", "password123");
    
    // Save authenticated state to reuse in other tests
    await page.context().addCookies([
      {
        name: "auth_token",
        value: "fake-token-value",
        url: "http://localhost:3000",
      },
    ]);

    await use(page);
  },
});

export { expect } from "@playwright/test";
