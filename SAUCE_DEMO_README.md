# Playwright Test Automation - Sauce Demo Edition

## 🎯 Overview

This is a **production-grade Playwright test automation framework** specifically configured for **Sauce Demo** (https://www.saucedemo.com) - a real public E-Commerce website designed for testing.

**Key Features:**
- ✅ Page Object Model (POM) architecture
- ✅ End-to-end purchase flow testing
- ✅ Authentication & validation testing
- ✅ Real website testing (no mock backend required)
- ✅ TypeScript for type safety
- ✅ Parallel execution ready
- ✅ Comprehensive reporting

---

## 📁 Project Structure (Cleaned & Optimized)

```
Playwright_Automation/
├── pages/
│   ├── BasePage.ts              # Base class for all pages
│   ├── LoginPage.ts             # Login & authentication
│   ├── ProductPage.ts           # Product browsing & filtering
│   ├── CartPage.ts              # Shopping cart management
│   └── CheckoutPage.ts          # Checkout flow
├── tests/
│   ├── auth/
│   │   └── login.spec.ts        # 6 login test cases
│   ├── e2e.spec.ts              # 3 end-to-end flow tests
│   └── verification.spec.ts     # Framework verification
├── test-data/
│   └── users.json               # Sauce Demo test credentials
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript settings
├── package.json                  # Dependencies
└── README.md                      # This file
```

---

## 🔑 Sauce Demo Test Credentials

Use these credentials for testing:

| Username | Password | Status |
|----------|----------|--------|
| `standard_user` | `secret_sauce` | ✅ Works |
| `problem_user` | `secret_sauce` | ✅ Works |
| `performance_glitch_user` | `secret_sauce` | ✅ Works |
| `locked_out_user` | `secret_sauce` | ❌ Locked (for error testing) |

**Note:** Sauce Demo data resets after each session. No real purchases are made.

---

## 🧪 Test Suites

### 1. **Authentication Tests** (`tests/auth/login.spec.ts`)
**6 test cases** covering login scenarios:

- **TC-001**: Login with valid credentials (standard_user)
- **TC-002**: Login with locked out account (error handling)
- **TC-003**: Login with multiple user accounts
- **TC-004**: Empty username validation
- **TC-005**: Empty password validation
- **TC-006**: Successful logout

```bash
# Run login tests
& "node_modules\.bin\playwright.cmd" test tests/auth/login.spec.ts --headed
```

### 2. **End-to-End Tests** (`tests/e2e.spec.ts`)
**3 complete user journey tests**:

- **E2E-001**: Complete Purchase Flow
  - Login → Browse Products → Add to Cart → Checkout → Order Completion → Logout
  - Validates entire checkout process
  
- **E2E-002**: Shopping Without Checkout
  - Login → Browse → Sort Products → Add to Cart → Continue Shopping
  - Tests cart persistence
  
- **E2E-003**: Cart Item Removal
  - Login → Add Multiple Items → Remove Items → Verify Cart
  - Tests item removal functionality

```bash
# Run end-to-end tests (with visible browser)
& "node_modules\.bin\playwright.cmd" test tests/e2e.spec.ts --headed --workers=1
```

### 3. **Verification Tests** (`tests/verification.spec.ts`)
**Framework validation** using real public websites (GitHub, Wikipedia, Example.com)

```bash
# Run verification tests
& "node_modules\.bin\playwright.cmd" test tests/verification.spec.ts
```

---

## 🚀 Running Tests

### Setup (One-time)

```bash
# 1. Navigate to project
cd t:\Playwright_Automation

# 2. Install dependencies
npm install

# 3. Install browsers
npx playwright install chromium
```

### Run Tests

```powershell
# Add Node.js to PATH
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

# Run ALL tests
& "node_modules\.bin\playwright.cmd" test

# Run specific test file
& "node_modules\.bin\playwright.cmd" test tests/auth/login.spec.ts

# Run with headed browser visible
& "node_modules\.bin\playwright.cmd" test --headed

# Run single test
& "node_modules\.bin\playwright.cmd" test tests/e2e.spec.ts -g "E2E-001"

# Run in debug mode
& "node_modules\.bin\playwright.cmd" test --debug

# Run with trace
& "node_modules\.bin\playwright.cmd" test --trace on
```

### View Reports

```bash
# View HTML report
npx playwright show-report

# Report location: playwright-report/index.html
# Results location: test-results.json
# Videos/Screenshots: test-results/
```

---

## 📊 Page Objects

### **BasePage.ts**
Base class with common methods:
```typescript
- navigate(path): Navigate to URL
- click(locator): Click element
- fill(locator, text): Fill input
- getText(locator): Get element text
- isVisible(locator): Check visibility
- waitForElement(locator): Wait for element
- screenshot(name): Take screenshot
- getPageUrl(): Get current URL
```

### **LoginPage.ts** (Sauce Demo Specific)
```typescript
- login(username, password): Login
- logout(): Logout
- isErrorDisplayed(): Check for errors
- getErrorMessage(): Get error text
- isLoginPageLoaded(): Verify login page
- enterEmail(email): Fill username field
- enterPassword(password): Fill password field
- clickLogin(): Click login button
```

### **ProductPage.ts** (Sauce Demo Specific)
```typescript
- navigateToProducts(): Go to inventory
- getProductCount(): Count products
- addProductToCart(index): Add item
- sortBy(option): Sort (lowestprice, highestprice, az, za)
- clickOnProduct(index): Open product details
- getProductsData(): Extract product info
```

### **CartPage.ts** (Sauce Demo Specific)
```typescript
- navigateToCart(): Go to cart
- getCartItemsCount(): Count cart items
- removeItemFromCart(index): Remove item
- getSubtotal(): Get subtotal
- getTax(): Get tax
- getTotal(): Get total
- proceedToCheckout(): Continue to checkout
- continueShopping_click(): Go back to products
```

### **CheckoutPage.ts** (Sauce Demo Specific)
```typescript
- navigateToCheckout(): Go to checkout
- fillShippingInformation(data): Fill shipping form
- placeOrder(): Complete purchase
- isOrderSuccessful(): Verify success
- goBackToCart(): Return to cart
```

---

## 🧬 Test Data Structure

`test-data/users.json` contains:

```json
{
  "validUsers": [
    {
      "email": "standard_user",
      "password": "secret_sauce"
    },
    // ... more users
  ],
  "invalidUsers": [
    {
      "email": "locked_out_user",
      "password": "secret_sauce",
      "expectedError": "locked out"
    }
  ],
  "shippingAddresses": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "zipCode": "12345"
    }
  ]
}
```

---

## ⚙️ Configuration

### `playwright.config.ts`
- **Base URL**: https://www.saucedemo.com
- **Browsers**: Chromium only (can add Firefox, WebKit)
- **Timeout**: 30 seconds per test
- **Workers**: 2 (local), 4 (CI)
- **Retries**: 0 (local), 2 (CI)
- **Screenshots**: On failure only
- **Videos**: On failure only
- **Traces**: On first retry

### `tsconfig.json`
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Off (for flexibility)
- **Module Resolution**: Node

---

## ✅ What's Included

✅ **Production-grade page objects**  
✅ **Real Sauce Demo credentials & URLs**  
✅ **6 login test cases**  
✅ **3 end-to-end flow tests**  
✅ **Framework verification tests**  
✅ **TypeScript support**  
✅ **HTML report generation**  
✅ **Video recording on failure**  
✅ **Screenshot capture on failure**  
✅ **Parallel test execution**  

## ❌ What's Removed

❌ **Non-Sauce Demo test files** (removed product, cart, checkout individual tests)  
❌ **Backend API helpers** (not needed - testing UI only)  
❌ **Dummy localhost URLs** (using real website)  
❌ **Unused page objects** (kept only essential ones)  
❌ **Complex fixtures** (using simple instantiation)  

---

## 🎓 Interview Portfolio Features

This framework demonstrates:

1. **POM Architecture**: Clean separation of concerns
2. **TypeScript**: Type-safe test automation
3. **Real Website Testing**: Works with production site
4. **End-to-End Flows**: Complete user journeys
5. **Error Handling**: Graceful failure handling
6. **Async/Await**: Modern async patterns
7. **Test Organization**: Logical structure
8. **Best Practices**: Professional code standards
9. **Documentation**: Comprehensive README
10. **Scalability**: Easy to add more tests

---

## 📈 Next Steps

### To Extend the Framework:

1. **Add more test cases**: Duplicate spec files and customize
2. **Add other browsers**: Uncomment projects in `playwright.config.ts`
3. **Add API testing**: Create API helper utilities
4. **Add performance tests**: Use Lighthouse or WebP
5. **Add accessibility tests**: Use Axe plugin
6. **Add CI/CD**: Use GitHub Actions workflow

### Common Commands

```bash
# Install a specific Playwright version
npm install @playwright/test@1.44.0

# Generate locator selectors
npx playwright codegen https://www.saucedemo.com

# Run tests in headed debug mode
npx playwright test --headed --debug

# Run tests with trace recording
npx playwright test --trace on

# Clear test results
Remove-Item -Path "test-results" -Recurse -Force
Remove-Item -Path "playwright-report" -Recurse -Force
```

---

## 🐛 Troubleshooting

**Q: Tests fail with "Executable doesn't exist"**  
A: Run `npx playwright install chromium` to install browsers

**Q: Cannot find module error**  
A: Ensure `tsconfig.json` has `"resolveJsonModule": true`

**Q: Tests timeout**  
A: Increase timeout in `playwright.config.ts` or specific tests

**Q: Website structure changed**  
A: Update locators in page objects (use `npx playwright codegen` to find new ones)

---

## 📞 Support

For issues or questions:
1. Check Playwright docs: https://playwright.dev
2. Check Sauce Demo: https://www.saucedemo.com
3. Review test-results/ folder for videos/screenshots
4. Use `--debug` flag to step through tests

---

**Last Updated**: April 14, 2026  
**Playwright Version**: 1.44.0  
**TypeScript Version**: 5.9.3  
**Node.js**: 18.0+
