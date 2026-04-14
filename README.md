# E-Commerce Test Automation Framework

A comprehensive, production-grade test automation framework for E-Commerce applications built with **Playwright** and **TypeScript**. This project demonstrates industry best practices including Page Object Model, API testing, custom fixtures, CI/CD integration, and comprehensive test coverage.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Test Coverage](#test-coverage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Best Practices](#best-practices)

## 🎯 Project Overview

This framework covers complete E-Commerce user journeys including:

- **Authentication**: Login, sign-up, password reset
- **Product Management**: Search, filter, sorting, category browsing
- **Shopping Cart**: Add/remove items, quantity management, promo codes
- **Checkout & Payment**: Shipping info, payment processing, order confirmation

### Key Statistics

- **28+ test cases** covering real user scenarios
- **4 main Page Object Models** (Login, Products, Cart, Checkout)
- **Multi-browser testing** (Chromium, Firefox, WebKit, Mobile)
- **API helper utilities** for backend validation
- **Custom test fixtures** for reusable test setup
- **GitHub Actions CI/CD** with automatic reporting

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Test Execution Layer                 │
│  Chromium | Firefox | WebKit | iPhone 13 (Mobile)      │
└──────────────────────────────────┬──────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────┐
│              Page Object Model (POM) Layer              │
│  ┌─────────────┬─────────────┬──────────┬────────────┐  │
│  │  BasePage   │ LoginPage   │ Products │   Cart     │  │
│  │  (common)   │             │   Page   │   Page     │  │
│  └──────────┬──┴─────────────┴──────────┴────────┬───┘  │
│             │                                    │       │
│  ┌──────────▼────────────────────────────────────▼────┐  │
│  │        CheckoutPage (Payment Flow)                │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────┐
│           Test Layer (specs/)                         │
│ ┌──────────────┬──────────────┬────────────────────┐  │
│ │ Auth Tests   │ Product      │ Cart & Checkout    │  │
│ │ (7 tests)    │ Tests (9)    │ Tests (12)         │  │
│ └──────────────┴──────────────┴────────────────────┘  │
└────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────┐
│     Utilities & Fixtures Layer                        │
│ ┌──────────────────┬──────────────────────────────┐   │
│ │  API Helper      │  Custom Fixtures             │   │
│ │  (backend tests) │  (pre-auth, page setup)      │   │
│ └──────────────────┴──────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────┐
│     Test Data / Configuration                        │
│ ┌────────────┬─────────────┬────────────────────────┐ │
│ │ users.json │ playwright  │ tsconfig.json          │ │
│ │ (test data)│ .config.ts  │ (TypeScript config)    │ │
│ └────────────┴─────────────┴────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

## ✨ Features

### 1. **Page Object Model (POM)**
- Centralized locator management
- Reusable page methods
- Maintainable test code
- BasePage for common functionality

### 2. **Test Organization**
```
tests/
├── auth/         (Authentication tests - 7 tests)
├── products/     (Product search/filter - 9 tests)
├── cart/         (Cart management - 9 tests)
└── checkout/     (Payment flow - 10 tests)
```

### 3. **Fixtures & Utilities**
- Custom Playwright test fixtures
- Pre-built authentication fixture
- API helper for backend testing
- TypeScript interfaces for type safety

### 4. **Test Data Management**
- Centralized test data in `test-data/users.json`
- Multiple user accounts for different scenarios
- Product and payment data
- Promo codes for discounts

### 5. **Multi-Browser & Device Testing**
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)
- Mobile (iPhone 13)

### 6. **Reporting & Screenshots**
- HTML reports with video recordings
- Screenshots on failure only
- Trace files for debugging
- JSON test results

### 7. **CI/CD Integration**
- GitHub Actions automation
- Matrix testing (multiple Node versions & browsers)
- Automatic report publishing to GitHub Pages
- Docker support

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Git
- Docker (optional)

### Installation Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Playwright_Automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Create .env file (optional)
echo "BASE_URL=https://www.saucedemo.com" > .env
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Specific Test Suite
```bash
npm run test:auth       # Authentication tests
npm run test:products   # Product tests
npm run test:cart       # Cart tests
npm run test:checkout   # Checkout tests
```

### Run Tests by Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### Debug Mode
```bash
npm run test:debug
```

### Generate Test Code (Codegen)
```bash
npm run codegen
```

### View HTML Report
```bash
npm run report
```

## 📁 Project Structure

```
Playwright_Automation/
├── pages/
│   ├── BasePage.ts           # Base class with common methods
│   ├── LoginPage.ts          # Login page object model
│   ├── ProductPage.ts        # Products page object model
│   ├── CartPage.ts           # Cart page object model
│   └── CheckoutPage.ts       # Checkout page object model
│
├── tests/
│   ├── auth/
│   │   └── login.spec.ts     # 7 authentication test cases
│   ├── products/
│   │   └── search.spec.ts    # 9 product search/filter tests
│   ├── cart/
│   │   └── cart.spec.ts      # 9 cart management tests
│   └── checkout/
│       └── payment.spec.ts   # 10 checkout/payment tests
│
├── fixtures/
│   └── custom-fixtures.ts    # Custom Playwright fixtures
│
├── utils/
│   └── api-helper.ts         # API testing utility class
│
├── test-data/
│   └── users.json            # Centralized test data
│
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions CI/CD
│
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── Dockerfile                # Docker containerization
└── README.md                 # This file
```

## 📊 Test Coverage

### Authentication (7 tests)
- ✅ Successful login with valid credentials
- ✅ Login fails with invalid credentials
- ✅ Remember me functionality
- ✅ Empty email field validation
- ✅ Forgot Password link navigation
- ✅ Sign Up link navigation
- ✅ Login with multiple user accounts

### Products (9 tests)
- ✅ Search for specific product
- ✅ Filter products by category
- ✅ Filter products by price
- ✅ Sort products by price
- ✅ Search with no results
- ✅ View product details
- ✅ Add product to cart from listing
- ✅ Verify product data display
- ✅ Filter and search combination

### Shopping Cart (9 tests)
- ✅ Add single product to cart
- ✅ Add multiple products to cart
- ✅ Remove product from cart
- ✅ Update product quantity
- ✅ Verify cart totals calculation
- ✅ Apply promo code
- ✅ Empty cart message
- ✅ Continue shopping from cart
- ✅ View detailed item information

### Checkout & Payment (10 tests)
- ✅ Complete checkout with valid data
- ✅ Verify order confirmation
- ✅ Verify order summary display
- ✅ Fill shipping information
- ✅ Select different shipping methods
- ✅ Fill payment information
- ✅ Accept terms and conditions
- ✅ Use same address for billing
- ✅ Back to cart from checkout
- ✅ End-to-end purchase flow

**Total: 35+ test cases**

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow Features

1. **Automatic Triggers**
   - Push to main/develop branches
   - Pull requests
   - Daily scheduled runs (2 AM UTC)

2. **Matrix Testing**
   - Node 18.x and 20.x
   - All 4 browsers (Chromium, Firefox, WebKit, Mobile)
   - Total: 8 parallel jobs

3. **Artifacts & Reporting**
   - Test reports as GitHub artifacts
   - JSON test results
   - Video recordings on failure
   - Screenshots on failure

4. **GitHub Pages Deployment**
   - HTML reports published to GitHub Pages
   - Accessible via `https://<username>.github.io/<repo>/`

5. **Docker Build**
   - Automated Docker image build
   - Cache optimization with GHA

### Running CI Locally

```bash
# Simulate CI environment
CI=true npm test
```

## 🐳 Docker Support

### Build Docker Image
```bash
docker build -t ecommerce-tests:latest .
```

### Run Tests in Docker
```bash
docker run --rm ecommerce-tests:latest
```

### Run with Custom Base URL
```bash
docker run --rm -e BASE_URL=https://www.saucedemo.com ecommerce-tests:latest
```

## 🏆 Best Practices Demonstrated

### 1. **Code Organization**
- Clear separation of concerns (POM, tests, utilities)
- Reusable components and fixtures
- DRY principle throughout

### 2. **Type Safety**
- Full TypeScript implementation
- Type-safe page objects and fixtures
- Better IDE autocomplete and error detection

### 3. **Test Design**
- Descriptive test names (TC-XXX format)
- Arrange-Act-Assert pattern
- Independent tests (no dependencies)
- Clear test data management

### 4. **Maintainability**
- Centralized locators
- Common base page functionality
- Consistent naming conventions
- Well-documented code

### 5. **Scalability**
- Modular test structure
- Easy to add new page objects
- Fixture-based setup/teardown
- Data-driven testing support

### 6. **Performance**
- Parallel test execution
- Efficient waits (not hardcoded)
- Resource cleanup
- Report optimization

### 7. **Reliability**
- Automatic retries in CI
- Comprehensive error handling
- Video/screenshot capture on failure
- Timeout management

## 📈 Test Execution Report

Example output:
```
Running 35 tests in parallel across 4 browsers...

✓ Authentication - Login (7/7 passed)
✓ Products - Search and Filter (9/9 passed)
✓ Shopping Cart (9/9 passed)
✓ Checkout - Payment (10/10 passed)

Total: 35 passed, 0 failed (~2-3 minutes)
HTML Report: playwright-report/index.html
```

## 🔧 Troubleshooting

### Issue: Tests timeout
```bash
# Increase timeout in playwright.config.ts
timeout: 60_000  // Increase to 60 seconds
```

### Issue: Browser not found
```bash
npx playwright install
```

### Issue: Port already in use
```bash
# Change BASE_URL in playwright.config.ts or set env variable
BASE_URL=http://localhost:3001 npm test
```

### Issue: Flaky tests
- Add explicit waits: `await page.waitForLoadingToComplete()`
- Use stable locators (data-testid preferred)
- Increase retry count for CI runs

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 👥 Contributing

1. Create a feature branch (`git checkout -b feature/new-tests`)
2. Write tests following existing patterns
3. Ensure all tests pass locally
4. Submit a pull request

## 📝 License

This project is open source and available for educational and interview portfolio purposes.

## ✅ Interview Talking Points

When presenting this framework to interviewers, highlight:

1. **Framework Architecture**: Explain the Page Object Model pattern and why it's used
2. **Test Organization**: Show how tests are organized by feature (auth, products, cart, checkout)
3. **Code Quality**: Demonstrate TypeScript usage for type safety
4. **CI/CD Integration**: Explain GitHub Actions workflow and automated testing
5. **Scalability**: Show how easily new tests can be added with existing fixtures
6. **Best Practices**: Discuss error handling, waits, retry logic, and reporting
7. **Real-world Scenarios**: Walk through an end-to-end test (login → browse → add to cart → checkout)
8. **Performance**: Explain parallel testing and reducing execution time
9. **Maintainability**: Show how centralized test data and locators make tests maintainable
10. **Reliability**: Discuss strategies for handling flaky tests (explicit waits, stable locators)

---

**Made with ❤️ for QA Engineers and Test Automation Developers**
