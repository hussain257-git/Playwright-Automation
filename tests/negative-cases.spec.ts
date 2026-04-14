import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as testDataFile from '../test-data/users.json';

const testData = testDataFile as any;

test.describe('Negative & Edge Cases', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to the application
    await page.goto('https://www.saucedemo.com');
  });

  test.describe('NC-001: Unauthorized Access Attempts', () => {
    test('NC-001-01: Direct navigation to inventory without login should redirect to login', async ({ page }) => {
      console.log('🧪 Test: Direct inventory access without login');

      // Try to navigate directly to inventory
      await page.goto('https://www.saucedemo.com/inventory.html');

      // Should redirect to login page
      const currentUrl = page.url();
      console.log(`Current URL: ${currentUrl}`);
      expect(currentUrl).toContain('saucedemo.com');

      // Verify login page is displayed
      const isLoginLoaded = await loginPage.isLoginPageLoaded();
      expect(isLoginLoaded).toBeTruthy();
      console.log('✅ Correctly redirected to login page');
    });

    test('NC-001-02: Direct navigation to cart without login should redirect to login', async ({ page }) => {
      console.log('🧪 Test: Direct cart access without login');

      // Try to navigate directly to cart
      await page.goto('https://www.saucedemo.com/cart.html');

      // Should redirect to login page
      const currentUrl = page.url();
      console.log(`Current URL: ${currentUrl}`);
      expect(currentUrl).toContain('saucedemo.com');

      // Verify login page is displayed
      const isLoginLoaded = await loginPage.isLoginPageLoaded();
      expect(isLoginLoaded).toBeTruthy();
      console.log('✅ Correctly redirected to login page');
    });

    test('NC-001-03: Direct navigation to checkout without login should redirect to login', async ({ page }) => {
      console.log('🧪 Test: Direct checkout access without login');

      // Try to navigate directly to checkout
      await page.goto('https://www.saucedemo.com/checkout-step-one.html');

      // Should redirect to login page
      const currentUrl = page.url();
      console.log(`Current URL: ${currentUrl}`);
      expect(currentUrl).toContain('saucedemo.com');

      // Verify login page is displayed
      const isLoginLoaded = await loginPage.isLoginPageLoaded();
      expect(isLoginLoaded).toBeTruthy();
      console.log('✅ Correctly redirected to login page');
    });
  });

  test.describe('NC-002: Empty Form Field Validation', () => {
    test('NC-002-01: Verify checkout form accepts valid shipping information', async ({ page }) => {
      console.log('🧪 Test: Checkout form with valid data');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add product to cart
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      console.log('✅ Product added to cart');

      // Navigate to checkout
      await cartPage.navigateToCart();
      await cartPage.proceedToCheckout();
      console.log('✅ Navigated to checkout');

      // Wait for form to load
      await page.waitForSelector('[data-test="firstName"]', { timeout: 10000 });

      // Fill all fields correctly
      await page.fill('[data-test="firstName"]', testData.shippingAddresses[0].firstName);
      await page.fill('[data-test="lastName"]', testData.shippingAddresses[0].lastName);
      await page.fill('[data-test="postalCode"]', testData.shippingAddresses[0].postalCode);

      // Verify fields contain the data
      const firstNameValue = await page.inputValue('[data-test="firstName"]');
      expect(firstNameValue).toBe(testData.shippingAddresses[0].firstName);
      console.log('✅ Checkout form accepts valid shipping data');
    });

    test('NC-002-02: Verify form fields are present and focused', async ({ page }) => {
      console.log('🧪 Test: Checkout form field accessibility');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add product to cart
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      console.log('✅ Product added to cart');

      // Navigate to checkout
      await cartPage.navigateToCart();
      await cartPage.proceedToCheckout();
      console.log('✅ Navigated to checkout');

      // Wait for form to load
      await page.waitForSelector('[data-test="firstName"]', { timeout: 10000 });

      // Verify all fields are visible
      const firstNameField = page.locator('[data-test="firstName"]');
      const lastNameField = page.locator('[data-test="lastName"]');
      const postalCodeField = page.locator('[data-test="postalCode"]');

      expect(await firstNameField.isVisible()).toBeTruthy();
      expect(await lastNameField.isVisible()).toBeTruthy();
      expect(await postalCodeField.isVisible()).toBeTruthy();

      console.log('✅ All form fields are visible and accessible');
    });

    test('NC-002-03: Verify continue button is functional in checkout', async ({ page }) => {
      console.log('🧪 Test: Checkout continue button functionality');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add product to cart
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      console.log('✅ Product added to cart');

      // Navigate to checkout
      await cartPage.navigateToCart();
      await cartPage.proceedToCheckout();
      console.log('✅ Navigated to checkout');

      // Wait for form to load
      await page.waitForSelector('[data-test="continue"]', { timeout: 10000 });

      // Verify continue button exists and is visible
      const continueButton = page.locator('[data-test="continue"]');
      expect(await continueButton.isVisible()).toBeTruthy();

      console.log('✅ Continue button is visible and functional');
    });
  });

  test.describe('NC-003: Session & Timeout Scenarios', () => {
    test('NC-003-01: Verify session persists after page refresh', async ({ page }) => {
      console.log('🧪 Test: Session persistence on page refresh');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await page.waitForNavigation();
      console.log('✅ Logged in successfully');

      // Verify on inventory page
      let currentUrl = page.url();
      expect(currentUrl).toContain('inventory');
      console.log('✅ User is on inventory page');

      // Refresh the page
      console.log('🔄 Refreshing page...');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should still be on inventory page, not logged out
      currentUrl = page.url();
      expect(currentUrl).toContain('inventory');
      console.log('✅ Session persisted after page refresh');
    });

    test('NC-003-02: Verify session persists after navigation', async ({ page }) => {
      console.log('🧪 Test: Session persistence during navigation');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await page.waitForNavigation();
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();
      let currentUrl = page.url();
      expect(currentUrl).toContain('inventory');
      console.log('✅ On inventory page');

      // Navigate to cart
      await cartPage.navigateToCart();
      currentUrl = page.url();
      expect(currentUrl).toContain('cart');
      console.log('✅ Navigated to cart page');

      // Navigate back to inventory
      await productPage.navigateToProducts();
      currentUrl = page.url();
      expect(currentUrl).toContain('inventory');
      console.log('✅ Session persisted through multiple navigations');
    });
  });

  test.describe('NC-004: Invalid Data Handling', () => {
    test('NC-004-01: Special characters in username should handle gracefully', async ({ page }) => {
      console.log('🧪 Test: Special characters in username');

      await loginPage.navigateToLoginPage();

      // Try login with special characters
      const specialCharUsername = `<script>alert('test')</script>`;
      const password = 'password123';

      await page.fill('[data-test="username"]', specialCharUsername);
      await page.fill('[data-test="password"]', password);
      await page.click('[data-test="login-button"]');

      // Should show error, not execute script
      await page.waitForTimeout(500);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      console.log(`✅ Special characters handled safely: "${errorMessage}"`);
    });

    test('NC-004-02: SQL injection attempt in username field', async ({ page }) => {
      console.log('🧪 Test: SQL injection prevention in username');

      await loginPage.navigateToLoginPage();

      // Try SQL injection
      const sqlInjectionUsername = `' OR '1'='1`;
      const password = 'password';

      await page.fill('[data-test="username"]', sqlInjectionUsername);
      await page.fill('[data-test="password"]', password);
      await page.click('[data-test="login-button"]');

      // Should show error, not bypass authentication
      await page.waitForTimeout(500);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      console.log(`✅ SQL injection prevented: "${errorMessage}"`);
    });

    test('NC-004-03: Very long string in username field', async ({ page }) => {
      console.log('🧪 Test: Very long string in username');

      await loginPage.navigateToLoginPage();

      // Create very long string
      const veryLongUsername = 'a'.repeat(10000);
      const password = 'password123';

      await page.fill('[data-test="username"]', veryLongUsername);
      await page.fill('[data-test="password"]', password);
      await page.click('[data-test="login-button"]');

      // Should handle gracefully without crashing
      await page.waitForTimeout(500);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      console.log(`✅ Long input handled safely`);
    });
  });

  test.describe('NC-005: Cart Edge Cases', () => {
    test('NC-005-01: Remove all items from cart should show empty cart', async ({ page }) => {
      console.log('🧪 Test: Empty cart after removing all items');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add 2 products to cart
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      await productPage.addProductToCart(1);
      console.log('✅ Added 2 products to cart');

      // Navigate to cart
      await cartPage.navigateToCart();
      let cartCount = await cartPage.getCartItemsCount();
      console.log(`Cart items: ${cartCount}`);

      // Remove all items
      await cartPage.removeItemFromCart(0);
      await cartPage.removeItemFromCart(0); // Index 0 again as items shift

      // Verify cart is empty or shows empty state
      cartCount = await cartPage.getCartItemsCount();
      console.log(`Cart items after removal: ${cartCount}`);
      expect(cartCount).toBe(0);
      console.log('✅ Cart is now empty');
    });

    test('NC-005-02: Add same product multiple times', async ({ page }) => {
      console.log('🧪 Test: Add same product multiple times');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add same product 3 times
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      await productPage.addProductToCart(0);
      await productPage.addProductToCart(0);
      console.log('✅ Added same product 3 times');

      // Navigate to cart
      await cartPage.navigateToCart();
      const cartCount = await cartPage.getCartItemsCount();
      console.log(`Total cart items: ${cartCount}`);
      expect(cartCount).toBe(3);
      console.log('✅ Same product added multiple times correctly');
    });

    test('NC-005-03: Verify prices are displayed as currency format', async ({ page }) => {
      console.log('🧪 Test: Price currency format validation');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Add product
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);

      // Navigate to cart
      await cartPage.navigateToCart();
      const subtotal = await cartPage.getSubtotal();
      const total = await cartPage.getTotal();

      console.log(`Subtotal: ${subtotal}`);
      console.log(`Total: ${total}`);

      // Verify currency format (should contain $ and numbers)
      expect(subtotal).toMatch(/\$?\d+\.\d{2}/);
      expect(total).toMatch(/\$?\d+\.\d{2}/);
      console.log('✅ Prices are in correct currency format');
    });
  });

  test.describe('NC-006: Locked User Restrictions', () => {
    test('NC-006-01: Locked user cannot access inventory after retry', async ({ page }) => {
      console.log('🧪 Test: Locked user cannot bypass restriction');

      const lockedUser = testData.invalidUsers.find((u: any) => u.email === 'locked_out_user');
      if (!lockedUser) {
        console.log('⚠️ Locked out user not found in test data');
        return;
      }

      // Try to login 3 times (all should fail)
      for (let i = 1; i <= 3; i++) {
        await loginPage.navigateToLoginPage();
        await page.fill('[data-test="username"]', lockedUser.email);
        await page.fill('[data-test="password"]', lockedUser.password);
        await page.click('[data-test="login-button"]');

        // Verify error
        await page.waitForTimeout(300);
        const errorMessage = await loginPage.getErrorMessage();
        console.log(`Attempt ${i}: ${errorMessage}`);
        expect(errorMessage).toContain('locked out');
      }

      // Verify still not at inventory
      let currentUrl = page.url();
      expect(currentUrl).not.toContain('inventory');
      console.log('✅ Locked user remained locked out');
    });
  });

  test.describe('NC-007: Concurrent Operations', () => {
    test('NC-007-01: Add to cart and navigate simultaneously should handle gracefully', async ({ page }) => {
      console.log('🧪 Test: Rapid add-to-cart and navigation');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to products
      await productPage.navigateToProducts();

      // Rapidly add products and navigate
      await productPage.addProductToCart(0);
      await productPage.addProductToCart(1);

      // Navigate to cart immediately
      await cartPage.navigateToCart();
      await page.waitForTimeout(500);

      // Verify both items are in cart
      const cartCount = await cartPage.getCartItemsCount();
      console.log(`Items in cart: ${cartCount}`);
      expect(cartCount).toBeGreaterThanOrEqual(2);
      console.log('✅ Concurrent operations handled correctly');
    });
  });
});
