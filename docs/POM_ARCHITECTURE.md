# Page Object Model (POM) Architecture

## Overview

The Playwright framework strictly follows the **Page Object Model** pattern:
- ✅ Each page is a separate class
- ✅ All locators are defined at class level
- ✅ All interactions are methods
- ✅ Tests use only POM methods (no direct selectors)
- ✅ Inheritance from BasePage for reusable methods

---

## Architecture Principles

### 1. Single Responsibility
Each Page Object handles ONE page only:
```
LoginPage → Handles login interactions
ProductPage → Handles product browsing
CartPage → Handles cart operations
CheckoutPage → Handles checkout flow
```

### 2. Encapsulation
All locators and interactions are PRIVATE:
```typescript
// Locators kept private
private readonly usernameInput: Locator;
private readonly loginButton: Locator;

// Only public methods expose functionality
public async login(username: string, password: string): Promise<void>
```

### 3. Inheritance
All page classes extend BasePage:
```typescript
export class LoginPage extends BasePage {
  // Inherits: navigate(), click(), fill(), etc.
  // Adds: page-specific methods
}
```

### 4. No Direct Selectors in Tests
❌ **WRONG** - Selectors in test:
```typescript
test('login', async ({ page }) => {
  await page.fill('#user-name', 'standard_user');  // ❌ Bad!
});
```

✅ **CORRECT** - Using POM:
```typescript
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');  // ✅ Good!
});
```

---

## BasePage - Foundation Class

### Location
```
pages/BasePage.ts
```

### Responsibilities
- Provides base constructor for all pages
- Defines common interaction methods
- Handles page navigation
- Provides utility methods

### Methods Available

```typescript
export class BasePage {
  // Constructor
  constructor(page: Page);
  
  // Navigation
  async navigate(url: string): Promise<void>;
  
  // Click actions
  async click(locator: Locator | string): Promise<void>;
  
  // Fill/input
  async fill(locator: Locator | string, text: string): Promise<void>;
  
  // Read/get text
  async getText(locator: Locator | string): Promise<string>;
  
  // Visibility check
  async isVisible(locator: Locator | string): Promise<boolean>;
  
  // Wait actions
  async waitForElement(locator: Locator, timeout?: number): Promise<void>;
  
  // Screenshot
  async screenshot(name: string): Promise<void>;
  
  // Page info
  async getPageTitle(): Promise<string>;
  async getPageUrl(): Promise<string>;
}
```

### Usage Example
```typescript
export class LoginPage extends BasePage {
  async login(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);  // Uses BasePage.fill()
    await this.click(this.loginButton);              // Uses BasePage.click()
  }
}
```

---

## Page Objects

### 1. LoginPage

**File**: `pages/LoginPage.ts`  
**Responsibility**: Handle authentication flows

#### Locators
```typescript
readonly usernameInput: Locator;      // Username field
readonly passwordInput: Locator;      // Password field
readonly loginButton: Locator;        // Login button
readonly errorMessage: Locator;       // Error message display
readonly cartBadge: Locator;          // Site header cart badge
readonly appLogo: Locator;            // App logo (verification)
```

#### Methods
```typescript
/**
 * Login with credentials
 * @param username - User email/username
 * @param password - User password
 */
async login(username: string, password: string): Promise<void>;

/**
 * Check if login page is loaded
 * @returns true if login button is visible
 */
async isLoginPageLoaded(): Promise<boolean>;

/**
 * Get error message if displayed
 * @returns Error message text or null
 */
async getErrorMessage(): Promise<string | null>;

/**
 * Logout user
 */
async logout(): Promise<void>;
```

#### Usage
```typescript
test('User login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login('standard_user', 'secret_sauce');
});
```

---

### 2. ProductPage

**File**: `pages/ProductPage.ts`  
**Responsibility**: Handle product browsing and selection

#### Locators
```typescript
readonly productItem: Locator;           // Individual product item
readonly productName: Locator;           // Product name
readonly productPrice: Locator;          // Product price
readonly addToCartButton: Locator;       // Add button
readonly sortContainer: Locator;         // Sort dropdown
readonly cartBadge: Locator;             // Cart badge count
```

#### Methods
```typescript
/**
 * Navigate to products inventory
 */
async navigateToProducts(): Promise<void>;

/**
 * Get total product count on page
 * @returns Number of products
 */
async getProductCount(): Promise<number>;

/**
 * Add product to cart by index
 * @param index - Product position (0-based)
 */
async addProductToCart(index: number): Promise<void>;

/**
 * Remove product from cart by index
 * @param index - Product position
 */
async removeProductFromCart(index: number): Promise<void>;

/**
 * Sort products
 * @param sortValue - 'az' | 'za' | 'lowestprice' | 'highestprice'
 */
async sortBy(sortValue: string): Promise<void>;

/**
 * Click on product to view details
 * @param index - Product position
 */
async clickOnProduct(index: number): Promise<void>;
```

#### Usage
```typescript
test('Browse products', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.navigateToProducts();
  
  const count = await productPage.getProductCount();
  console.log(`Found ${count} products`);
  
  await productPage.addProductToCart(0);  // Add first product
  await productPage.sortBy('lowestprice'); // Sort by price
});
```

---

### 3. CartPage

**File**: `pages/CartPage.ts`  
**Responsibility**: Handle shopping cart operations

#### Locators
```typescript
readonly cartItem: Locator;              // Individual cart item
readonly cartItemCount: Locator;         // Item quantity display
readonly subtotalPrice: Locator;         // Subtotal amount
readonly taxAmount: Locator;             // Tax amount
readonly totalPrice: Locator;            // Total amount
readonly checkoutButton: Locator;        // Checkout button
readonly continueShoppingButton: Locator; // Continue shopping button
```

#### Methods
```typescript
/**
 * Navigate to shopping cart
 */
async navigateToCart(): Promise<void>;

/**
 * Get number of items in cart
 * @returns Item count
 */
async getCartItemsCount(): Promise<number>;

/**
 * Get subtotal price
 * @returns Subtotal as string (e.g., "$25.47")
 */
async getSubtotal(): Promise<string | null>;

/**
 * Get tax amount
 * @returns Tax as string
 */
async getTax(): Promise<string | null>;

/**
 * Get total price
 * @returns Total as string
 */
async getTotal(): Promise<string | null>;

/**
 * Remove item from cart
 * @param index - Item position
 */
async removeItem(index: number): Promise<void>;

/**
 * Proceed to checkout
 */
async proceedToCheckout(): Promise<void>;
```

#### Usage
```typescript
test('Cart operations', async ({ page }) => {
  const cartPage = new CartPage(page);
  const itemCount = await cartPage.getCartItemsCount();
  
  if (itemCount > 0) {
    const total = await cartPage.getTotal();
    console.log(`Total: ${total}`);
    
    await cartPage.proceedToCheckout();
  }
});
```

---

### 4. CheckoutPage

**File**: `pages/CheckoutPage.ts`  
**Responsibility**: Handle checkout and order completion

#### Locators
```typescript
readonly firstNameInput: Locator;        // First name field
readonly lastNameInput: Locator;         // Last name field
readonly zipCodeInput: Locator;          // Zip code field
readonly continueButton: Locator;        // Continue button
readonly finishButton: Locator;          // Finish/Place order button
readonly confirmationMessage: Locator;   // Order confirmation message
```

#### Methods
```typescript
/**
 * Navigate to checkout
 */
async navigateToCheckout(): Promise<void>;

/**
 * Fill shipping information
 * @param data - Shipping address object
 */
async fillShippingInformation(data: {
  firstName: string;
  lastName: string;
  zipCode: string;
}): Promise<void>;

/**
 * Complete checkout (continue button)
 */
async continueCheckout(): Promise<void>;

/**
 * Place order (finish button)
 */
async placeOrder(): Promise<void>;

/**
 * Get confirmation message
 * @returns Order confirmation text
 */
async getConfirmationMessage(): Promise<string | null>;
```

#### Usage
```typescript
test('Complete checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  
  const shippingData = {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345'
  };
  
  await checkoutPage.fillShippingInformation(shippingData);
  await checkoutPage.continueCheckout();
  await checkoutPage.placeOrder();
});
```

---

## POM Best Practices

### ✅ DO

1. **Define all locators at class level**
```typescript
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;  // ✅ Class level
  
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
  }
}
```

2. **Create meaningful method names**
```typescript
await loginPage.login('user', 'pass');  // ✅ Clear intent
```

3. **Make locators readonly**
```typescript
readonly usernameInput: Locator;  // ✅ Prevents accidental changes
```

4. **Use type safety with TypeScript**
```typescript
async login(username: string, password: string): Promise<void>  // ✅ Type safe
```

5. **Extract complex operations into methods**
```typescript
async completeCheckout(data: ShippingData): Promise<void> {
  // ✅ Multi-step operation encapsulated
}
```

---

### ❌ DON'T

1. **Use selectors directly in tests**
```typescript
// ❌ WRONG
await page.click('#user-name');
```

2. **Create selectors dynamically in methods**
```typescript
// ❌ WRONG
async login() {
  await this.page.click('#user-name');  // Selector here!
}
```

3. **Mix CSS and XPath selectors randomly**
```typescript
// ❌ WRONG - Mix of selectors
readonly userField = page.locator('#user-name');
readonly passField = page.locator('//input[@id="password"]');
```

4. **Make locators public**
```typescript
// ❌ WRONG
public readonly usernameInput: Locator;  // Exposes internals
```

5. **Have too many methods in one class**
```typescript
// ❌ WRONG - Mixing concerns
export class MainPage extends BasePage {
  async login() { }
  async browseProducts() { }
  async addToCart() { }
  async checkout() { }
}
```

---

## Extending Page Objects

### Adding New Methods

When adding functionality to a page:

1. Identify which page object needs it
2. Add locators to the class
3. Add method to class
4. Use in tests

```typescript
// pages/ProductPage.ts
export class ProductPage extends BasePage {
  readonly filterButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.filterButton = page.locator('[data-test="filter"]');
  }
  
  async filterByPrice(maxPrice: number): Promise<void> {
    await this.filterButton.click();
    // Filter implementation
  }
}
```

### Creating New Page Object

When needed, create new page class:

```typescript
// pages/OrderHistoryPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderHistoryPage extends BasePage {
  readonly orderList: Locator;
  readonly orderItem: Locator;
  
  constructor(page: Page) {
    super(page);
    this.orderList = page.locator('.order-list');
    this.orderItem = page.locator('.order-item');
  }
  
  async getOrderCount(): Promise<number> {
    return await this.orderItem.count();
  }
  
  async viewOrder(index: number): Promise<void> {
    await this.orderItem.nth(index).click();
  }
}
```

---

## Testing with POM

### Basic Test Structure

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

test.describe("E2E Flows", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    // Initialize pages
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    
    // Navigate to base URL
    await page.goto("https://www.saucedemo.com");
  });

  test("User can login and view products", async ({ page }) => {
    // Arrange
    const credentials = { username: "standard_user", password: "secret_sauce" };

    // Act
    await loginPage.login(credentials.username, credentials.password);
    const productCount = await productPage.getProductCount();

    // Assert
    expect(productCount).toBeGreaterThan(0);
  });
});
```

---

## Validation Checklist

Before committing changes:

- [ ] All locators defined at class level
- [ ] All locators are readonly
- [ ] No selectors in test files
- [ ] Methods have clear names
- [ ] Each class handles ONE page only
- [ ] Inherits from BasePage
- [ ] Methods return appropriate types
- [ ] Error handling with .catch(() => {})
- [ ] Waitstates are appropriate

---

## Troubleshooting POM Issues

### Issue: Locators not finding elements

**Solution**:
1. Verify selector in DevTools (F12)
2. Use more specific locator if needed
3. Add waitFor before interacting
4. Add debugging with page.locator().count()

### Issue: Flaky tests

**Solution**:
1. Add explicit waits: `await page.waitForLoadState()`
2. Use locator().isVisible() before click
3. Increase timeout for slow elements
4. Check for stale elements

### Issue: Complex locator chains

**Solution**:
1. Break into smaller methods
2. Store intermediate locators
3. Use nth() and filter() appropriately
4. Consider adding helper methods in BasePage

---

## Summary

The POM architecture ensures:
✅ Maintainable code  
✅ Reusable page interactions  
✅ Clear test intent  
✅ Easy debugging  
✅ Less brittle tests  
✅ Professional code structure  

**Follow the patterns shown here for consistent, professional test automation.**
