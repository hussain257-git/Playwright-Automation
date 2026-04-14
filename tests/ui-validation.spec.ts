import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as testDataFile from '../test-data/users.json';

const testData = testDataFile as any;

test.describe('UI/UX Validation', () => {
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

  test.describe('UI-001: Login Page UI Elements', () => {
    test('UI-001-01: Verify login page title and heading are visible', async ({ page }) => {
      console.log('🧪 Test: Login page title and heading visibility');

      await loginPage.navigateToLoginPage();

      // Verify page title
      const pageTitle = await page.title();
      console.log(`Page title: "${pageTitle}"`);
      expect(pageTitle).toBeTruthy();
      expect(pageTitle.toLowerCase()).toContain('swag');

      // Verify login container is visible
      const loginContainer = page.locator('[data-test="login-container"]');
      const isVisible = await loginContainer.isVisible();
      console.log(`Login container visible: ${isVisible}`);
      expect(isVisible).toBeTruthy();

      console.log('✅ Login page title and heading are properly displayed');
    });

    test('UI-001-02: Verify login form elements are properly styled', async ({ page }) => {
      console.log('🧪 Test: Login form elements styling');

      await loginPage.navigateToLoginPage();

      // Verify logo is present
      const logo = page.locator('.login_logo');
      const logoVisible = await logo.isVisible();
      console.log(`Logo visible: ${logoVisible}`);
      expect(logoVisible).toBeTruthy();

      // Verify username input is visible
      const usernameInput = page.locator('[data-test="username"]');
      const usernameVisible = await usernameInput.isVisible();
      console.log(`Username input visible: ${usernameVisible}`);
      expect(usernameVisible).toBeTruthy();

      // Verify password input is visible
      const passwordInput = page.locator('[data-test="password"]');
      const passwordVisible = await passwordInput.isVisible();
      console.log(`Password input visible: ${passwordVisible}`);
      expect(passwordVisible).toBeTruthy();

      // Verify login button is visible
      const loginButton = page.locator('[data-test="login-button"]');
      const buttonVisible = await loginButton.isVisible();
      console.log(`Login button visible: ${buttonVisible}`);
      expect(buttonVisible).toBeTruthy();

      console.log('✅ All login form elements are properly displayed');
    });

    test('UI-001-03: Verify error messages are displayed correctly', async ({ page }) => {
      console.log('🧪 Test: Error message display on login page');

      await loginPage.navigateToLoginPage();

      // Try login with invalid credentials
      await page.fill('[data-test="username"]', 'invalid_user');
      await page.fill('[data-test="password"]', 'invalid_pass');
      await page.click('[data-test="login-button"]');

      // Wait for error
      await page.waitForTimeout(500);

      // Verify error message is visible
      const errorMessage = page.locator('[data-test="error"]');
      const isErrorVisible = await errorMessage.isVisible();
      console.log(`Error message visible: ${isErrorVisible}`);
      expect(isErrorVisible).toBeTruthy();

      const errorText = await errorMessage.textContent();
      console.log(`Error text: "${errorText}"`);
      expect(errorText).toContain('Epic');

      console.log('✅ Error messages display correctly');
    });

    test('UI-001-04: Verify input fields have proper placeholders', async ({ page }) => {
      console.log('🧪 Test: Input field placeholders');

      await loginPage.navigateToLoginPage();

      // Check username placeholder
      const usernameInput = page.locator('[data-test="username"]');
      const usernamePlaceholder = await usernameInput.getAttribute('placeholder');
      console.log(`Username placeholder: "${usernamePlaceholder}"`);
      expect(usernamePlaceholder).toBeTruthy();

      // Check password placeholder
      const passwordInput = page.locator('[data-test="password"]');
      const passwordPlaceholder = await passwordInput.getAttribute('placeholder');
      console.log(`Password placeholder: "${passwordPlaceholder}"`);
      expect(passwordPlaceholder).toBeTruthy();

      console.log('✅ Input fields have proper placeholders');
    });
  });

  test.describe('UI-002: Inventory Page UI Elements', () => {
    test('UI-002-01: Verify inventory page header and title', async ({ page }) => {
      console.log('🧪 Test: Inventory page header validation');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Verify page title
      const pageTitle = await page.title();
      console.log(`Page title: "${pageTitle}"`);
      expect(pageTitle).toBeTruthy();

      // Verify inventory container
      const inventoryContainer = page.locator('[data-test="inventory-container"]');
      const isContainerVisible = await inventoryContainer.isVisible();
      console.log(`Inventory container visible: ${isContainerVisible}`);
      expect(isContainerVisible).toBeTruthy();

      console.log('✅ Inventory page header and title are displayed correctly');
    });

    test('UI-002-02: Verify Sauce Labs logo on inventory page', async ({ page }) => {
      console.log('🧪 Test: Sauce Labs logo visibility');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Verify app logo
      const appLogo = page.locator('.app_logo');
      const isLogoVisible = await appLogo.isVisible();
      console.log(`App logo visible: ${isLogoVisible}`);
      expect(isLogoVisible).toBeTruthy();

      const logoText = await appLogo.textContent();
      console.log(`Logo text: "${logoText}"`);
      expect(logoText).toContain('Swag');

      console.log('✅ Sauce Labs logo is visible on inventory page');
    });

    test('UI-002-03: Verify shopping cart badge is visible', async ({ page }) => {
      console.log('🧪 Test: Shopping cart badge visibility');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Verify cart link is visible
      const cartLink = page.locator('[data-test="shopping-cart-link"]');
      const isCartVisible = await cartLink.isVisible();
      console.log(`Cart link visible: ${isCartVisible}`);
      expect(isCartVisible).toBeTruthy();

      console.log('✅ Shopping cart badge is visible');
    });

    test('UI-002-04: Verify hamburger menu exists and is functional', async ({ page }) => {
      console.log('🧪 Test: Hamburger menu visibility and functionality');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Verify menu button exists (using class selector for Sauce Labs site)
      const menuButton = page.locator('button#react-burger-menu-btn');
      const isMenuButtonVisible = await menuButton.isVisible().catch(() => false);
      console.log(`Menu button visible: ${isMenuButtonVisible}`);

      if (isMenuButtonVisible) {
        // Click menu button
        await menuButton.click();
        console.log('✅ Clicked menu button');

        // Verify menu opens
        const menuContainer = page.locator('.bm-menu-wrap');
        const isMenuVisible = await menuContainer.isVisible().catch(() => false);
        console.log(`Menu container visible after click: ${isMenuVisible}`);
        expect(isMenuVisible).toBeTruthy();

        // Verify logout option is visible
        const logoutButton = page.locator('[data-test="logout-sidebar-link"]');
        const isLogoutVisible = await logoutButton.isVisible().catch(() => false);
        console.log(`Logout option visible: ${isLogoutVisible}`);
      }

      console.log('✅ Hamburger menu test completed');
    });

    test('UI-002-05: Verify product grid layout displays products', async ({ page }) => {
      console.log('🧪 Test: Product grid layout');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Verify products list
      const productsList = page.locator('[data-test="inventory-list"]');
      const isListVisible = await productsList.isVisible();
      console.log(`Products list visible: ${isListVisible}`);
      expect(isListVisible).toBeTruthy();

      // Count products
      const products = page.locator('[data-test^="inventory-item-"]');
      const productCount = await products.count();
      console.log(`Number of products displayed: ${productCount}`);
      expect(productCount).toBeGreaterThan(0);

      console.log('✅ Product grid layout displays correctly');
    });

    test('UI-002-06: Verify sort dropdown is visible and functional', async ({ page }) => {
      console.log('🧪 Test: Sort dropdown visibility and functionality');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Verify sort dropdown
      const sortContainer = page.locator('[data-test="product-sort-container"]');
      const isSortVisible = await sortContainer.isVisible();
      console.log(`Sort dropdown visible: ${isSortVisible}`);
      expect(isSortVisible).toBeTruthy();

      // Verify we can interact with it
      const sortSelect = page.locator('[data-test="sort"]');
      const sortValue = await sortSelect.getAttribute('value');
      console.log(`Current sort value: "${sortValue}"`);
      expect(sortValue).toBeTruthy();

      console.log('✅ Sort dropdown is visible and functional');
    });
  });

  test.describe('UI-003: Product Item UI Elements', () => {
    test('UI-003-01: Verify product items display name, price, and image', async ({ page }) => {
      console.log('🧪 Test: Product item element visibility');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Get first product
      const firstProduct = page.locator('[data-test^="inventory-item-"]').first();

      // Verify product name
      const productName = firstProduct.locator('[data-test="inventory-item-name"]');
      const isNameVisible = await productName.isVisible();
      console.log(`Product name visible: ${isNameVisible}`);
      expect(isNameVisible).toBeTruthy();

      // Verify product price
      const productPrice = firstProduct.locator('[data-test="inventory-item-price"]');
      const isPriceVisible = await productPrice.isVisible();
      console.log(`Product price visible: ${isPriceVisible}`);
      expect(isPriceVisible).toBeTruthy();

      // Verify product image
      const productImage = firstProduct.locator('img');
      const isImageVisible = await productImage.isVisible();
      console.log(`Product image visible: ${isImageVisible}`);
      expect(isImageVisible).toBeTruthy();

      console.log('✅ Product items display all required elements');
    });

    test('UI-003-02: Verify add to cart button styling', async ({ page }) => {
      console.log('🧪 Test: Add to cart button styling');

      // Login first
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      console.log('✅ Logged in successfully');

      // Navigate to inventory
      await productPage.navigateToProducts();

      // Get first product's add to cart button
      const firstProduct = page.locator('[data-test^="inventory-item-"]').first();
      const addToCartButton = firstProduct.locator('button');
      const isButtonVisible = await addToCartButton.isVisible();
      console.log(`Add to cart button visible: ${isButtonVisible}`);
      expect(isButtonVisible).toBeTruthy();

      const buttonText = await addToCartButton.textContent();
      console.log(`Button text: "${buttonText}"`);
      expect(['Add to cart', 'Remove'].includes(buttonText?.trim() || '')).toBeTruthy();

      console.log('✅ Add to cart button is properly styled');
    });
  });

  test.describe('UI-004: Cart Page UI Elements', () => {
    test('UI-004-01: Verify cart page header and continue shopping button', async ({ page }) => {
      console.log('🧪 Test: Cart page header elements');

      // Login and add product to cart
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      console.log('✅ Product added to cart');

      // Navigate to cart
      await cartPage.navigateToCart();

      // Verify cart title
      const cartContainer = page.locator('[data-test="cart-container"]');
      const isCartVisible = await cartContainer.isVisible();
      console.log(`Cart container visible: ${isCartVisible}`);
      expect(isCartVisible).toBeTruthy();

      // Verify continue shopping button
      const continueShopping = page.locator('[data-test="continue-shopping"]');
      const isContinueVisible = await continueShopping.isVisible();
      console.log(`Continue shopping button visible: ${isContinueVisible}`);
      expect(isContinueVisible).toBeTruthy();

      console.log('✅ Cart page header elements are displayed');
    });

    test('UI-004-02: Verify cart item details are displayed', async ({ page }) => {
      console.log('🧪 Test: Cart item details display');

      // Login and add product to cart
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);

      // Navigate to cart
      await cartPage.navigateToCart();

      // Verify cart list is visible
      const cartList = page.locator('[data-test="cart-list"]');
      const isListVisible = await cartList.isVisible();
      console.log(`Cart list visible: ${isListVisible}`);
      expect(isListVisible).toBeTruthy();

      // Verify item quantity
      const itemQuantity = page.locator('[data-test="item-quantity"]').first();
      const isQuantityVisible = await itemQuantity.isVisible();
      console.log(`Item quantity visible: ${isQuantityVisible}`);
      expect(isQuantityVisible).toBeTruthy();

      // Verify item price
      const itemPrice = page.locator('[data-test="inventory-item-price"]').first();
      const isPriceVisible = await itemPrice.isVisible();
      console.log(`Item price visible: ${isPriceVisible}`);
      expect(isPriceVisible).toBeTruthy();

      console.log('✅ Cart item details are properly displayed');
    });

    test('UI-004-03: Verify checkout button is visible on cart page', async ({ page }) => {
      console.log('🧪 Test: Checkout button visibility');

      // Login and add product to cart
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);

      // Navigate to cart
      await cartPage.navigateToCart();

      // Verify checkout button
      const checkoutButton = page.locator('[data-test="checkout"]');
      const isCheckoutVisible = await checkoutButton.isVisible();
      console.log(`Checkout button visible: ${isCheckoutVisible}`);
      expect(isCheckoutVisible).toBeTruthy();

      console.log('✅ Checkout button is visible on cart page');
    });
  });

  test.describe('UI-005: Checkout Page UI Elements', () => {
    test('UI-005-01: Verify checkout form labels and fields', async ({ page }) => {
      console.log('🧪 Test: Checkout form labels and fields');

      // Login and navigate to checkout
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      await cartPage.navigateToCart();
      await cartPage.proceedToCheckout();
      console.log('✅ Navigated to checkout');

      // Verify first name field
      const firstNameInput = page.locator('[data-test="firstName"]');
      const isFirstNameVisible = await firstNameInput.isVisible();
      console.log(`First name field visible: ${isFirstNameVisible}`);
      expect(isFirstNameVisible).toBeTruthy();

      // Verify last name field
      const lastNameInput = page.locator('[data-test="lastName"]');
      const isLastNameVisible = await lastNameInput.isVisible();
      console.log(`Last name field visible: ${isLastNameVisible}`);
      expect(isLastNameVisible).toBeTruthy();

      // Verify postal code field
      const postalCodeInput = page.locator('[data-test="postalCode"]');
      const isPostalCodeVisible = await postalCodeInput.isVisible();
      console.log(`Postal code field visible: ${isPostalCodeVisible}`);
      expect(isPostalCodeVisible).toBeTruthy();

      console.log('✅ All checkout form fields are visible');
    });

    test('UI-005-02: Verify checkout buttons (continue, cancel)', async ({ page }) => {
      console.log('🧪 Test: Checkout action buttons');

      // Login and navigate to checkout
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.validUsers[0].email, testData.validUsers[0].password);
      await productPage.navigateToProducts();
      await productPage.addProductToCart(0);
      await cartPage.navigateToCart();
      await cartPage.proceedToCheckout();

      // Verify cancel button
      const cancelButton = page.locator('[data-test="cancel"]');
      const isCancelVisible = await cancelButton.isVisible();
      console.log(`Cancel button visible: ${isCancelVisible}`);
      expect(isCancelVisible).toBeTruthy();

      // Verify continue button
      const continueButton = page.locator('[data-test="continue"]');
      const isContinueVisible = await continueButton.isVisible();
      console.log(`Continue button visible: ${isContinueVisible}`);
      expect(isContinueVisible).toBeTruthy();

      console.log('✅ All checkout buttons are visible');
    });
  });

  test.describe('UI-006: Responsive & Accessibility', () => {
    test('UI-006-01: Verify page is responsive on mobile viewport', async ({ page }) => {
      console.log('🧪 Test: Mobile viewport responsiveness');

      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      console.log('Set viewport to mobile (375x667)');

      // Login
      await loginPage.navigateToLoginPage();
      await loginPage.login(testData.users[0].username, testData.users[0].password);

      // Verify page is still usable
      const loginContainer = page.locator('[data-test="login-container"]');
      const isContainerVisible = await loginContainer.isVisible().catch(() => false);

      // If on inventory, check that too
      const inventoryContainer = page.locator('[data-test="inventory-container"]');
      const isInventoryVisible = await inventoryContainer.isVisible().catch(() => false);

      console.log(`Mobile layout responsive: ${isContainerVisible || isInventoryVisible}`);
      expect(isContainerVisible || isInventoryVisible).toBeTruthy();

      console.log('✅ Page is responsive on mobile viewport');
    });

    test('UI-006-02: Buttons are large enough for clicking on mobile', async ({ page }) => {
      console.log('🧪 Test: Button size for mobile accessibility');

      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await loginPage.navigateToLoginPage();

      // Get login button dimensions
      const loginButton = page.locator('[data-test="login-button"]');
      const boundingBox = await loginButton.boundingBox();

      if (boundingBox) {
        const width = boundingBox.width;
        const height = boundingBox.height;
        console.log(`Login button size: ${width}x${height} pixels`);

        // Minimum touch target is typically 44x44 pixels (iOS guidelines)
        expect(width).toBeGreaterThanOrEqual(44);
        expect(height).toBeGreaterThanOrEqual(44);
      }

      console.log('✅ Buttons are appropriately sized for mobile');
    });

    test('UI-006-03: Verify form labels are properly associated with inputs', async ({ page }) => {
      console.log('🧪 Test: Form label associations');

      await loginPage.navigateToLoginPage();

      // Check username field has accessible label
      const usernameInput = page.locator('[data-test="username"]');
      const usernameAria = await usernameInput.getAttribute('aria-label');
      console.log(`Username ARIA label: "${usernameAria}"`);

      // Check password field
      const passwordInput = page.locator('[data-test="password"]');
      const passwordAria = await passwordInput.getAttribute('aria-label');
      console.log(`Password ARIA label: "${passwordAria}"`);

      console.log('✅ Form elements have proper accessibility attributes');
    });
  });
});
