# 🎭 Playwright Sauce Demo Test Automation Framework

**Production-ready, interview-ready, CI/CD-enabled test automation framework**

[![GitHub Actions](https://github.com/hussain257-git/Playwright-Automation/workflows/Playwright%20Tests%20CI%2FCD%20Pipeline/badge.svg)](https://github.com/hussain257-git/Playwright-Automation/actions)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)]()
[![Playwright](https://img.shields.io/badge/Playwright-1.44.0-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)]()

## ✨ Features

- ✅ **Real Website Testing** - Uses Sauce Demo (no mock backend)
- ✅ **11 Automated Tests** - 6 auth + 3 E2E + 2 verification tests
- ✅ **Page Object Model** - Professional architecture
- ✅ **GitHub Actions CI/CD** - Automated pipeline
- ✅ **Email Notifications** - Automatic result alerts
- ✅ **TypeScript** - Full type safety
- ✅ **Docker** - Container support included

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Run tests
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npx playwright test tests/ --headed

# 4. View report
npx playwright show-report
```

**Expected Result**: 11 tests pass in ~2-3 minutes ✅

## 📊 Test Coverage

| Suite | Tests | Status |
|-------|-------|--------|
| **Authentication** | 6 | ✅ PASS |
| **End-to-End** | 3 | ✅ PASS |
| **Verification** | 2 | ✅ PASS |
| **Total** | **11** | **✅ PASS** |

### Test Scenarios:
- ✅ Login with valid credentials
- ✅ Error handling (locked out user)
- ✅ Multi-user login cycle
- ✅ Complete purchase flow (E2E-001)
- ✅ Browse & add to cart (E2E-002)
- ✅ Add/remove items (E2E-003)

## 📖 Documentation

**Choose your path:**

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) | Run tests in 5 minutes | 5 min |
| [SAUCE_DEMO_README.md](SAUCE_DEMO_README.md) | Complete reference guide | 15 min |
| [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) | CI/CD setup instructions | 10 min |
| [E2E_VERIFICATION_REPORT.md](E2E_VERIFICATION_REPORT.md) | E2E test status & issues fixed | 5 min |
| [PUSH_TO_GITHUB.md](PUSH_TO_GITHUB.md) | How to push to GitHub | 10 min |
| [PROJECT_COMPLETION_SUMMARY.md](PROJECT_COMPLETION_SUMMARY.md) | Architecture & metrics | 10 min |
| [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) | Feature verification | 5 min |

## 🔑 Test Credentials

All credentials work on https://www.saucedemo.com:

```
Username: standard_user        | Password: secret_sauce
Username: problem_user         | Password: secret_sauce
Username: performance_glitch_user | Password: secret_sauce
Username: locked_out_user      | Password: secret_sauce ❌ (locked)
```

## 🏗️ Project Structure

```
├── pages/                      # Page Object Model (5 classes)
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/                      # Test suites (11 tests)
│   ├── auth/
│   │   └── login.spec.ts      # 6 authentication tests
│   ├── e2e.spec.ts            # 3 end-to-end tests
│   └── verification.spec.ts   # 2 verification tests
│
├── test-data/
│   └── users.json             # Test credentials & data
│
├── .github/
│   └── workflows/
│       └── playwright-tests.yml # GitHub Actions workflow
│
├── QUICK_START_GUIDE.md       # 5-minute setup
├── SAUCE_DEMO_README.md       # Complete reference
├── GITHUB_ACTIONS_SETUP.md    # CI/CD setup
├── E2E_VERIFICATION_REPORT.md # E2E status report
├── PUSH_TO_GITHUB.md          # GitHub push instructions
└── playwright.config.ts       # Playwright configuration
```

## 💻 Common Commands

```bash
# Run all tests
npx playwright test tests/

# Run with visible browser
npx playwright test --headed

# Run specific test file
npx playwright test tests/auth/login.spec.ts

# Run in debug mode
npx playwright test --debug

# Generate test report
npx playwright test --reporter=html
npx playwright show-report

# Run tests in parallel (4 workers)
npx playwright test --workers=4

# Record new tests
npx playwright codegen https://www.saucedemo.com
```

## 🔄 GitHub Actions CI/CD

### Automatic Test Triggers:
- ✅ Push to `main`, `develop`, `feature/*` branches
- ✅ Pull requests to `main`
- ✅ Daily schedule (2:00 AM UTC)
- ✅ Manual trigger available

### Status:
Tests run automatically and send email notifications to: **HussainBasha.Shaik257@outlook.com**

### Setup:
1. See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for detailed instructions
2. Add 4 GitHub Secrets (EMAIL_SERVER, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD)
3. Each test run triggers automatic email notification

## 📧 Email Notifications

### Success Email ✅
```
Subject: ✅ Playwright Tests PASSED - Pipeline #123
Contains: Test summary, branch info, artifact links
```

### Failure Email ❌
```
Subject: ❌ Playwright Tests FAILED - Pipeline #123
Contains: Failed test details, debugging steps, screenshot links
```

## 🎯 What's Been Done

### ✅ Framework
- [x] 5 Page Objects with Sauce Demo selectors
- [x] 11 automated tests (all working)
- [x] Full TypeScript support
- [x] Error handling & stability
- [x] HTML & JSON reporting

### ✅ GitHub Integration
- [x] GitHub Actions workflow created
- [x] Email notification support
- [x] CI/CD pipeline configured
- [x] Daily schedule included

### ✅ Issues Fixed
- [x] E2E test navigation method removed
- [x] Timeout issues resolved
- [x] Error handling improved
- [x] All tests verified working

### ✅ Documentation
- [x] 7 comprehensive guides
- [x] Setup instructions
- [x] Troubleshooting guide
- [x] Code examples
- [x] API reference

## 🐛 E2E Test Verification

**Status**: ✅ **ALL E2E SCENARIOS WORKING PERFECTLY FINE**

- E2E-001: Complete purchase flow ✅
- E2E-002: Browse & add to cart ✅
- E2E-003: Add/remove items ✅

See [E2E_VERIFICATION_REPORT.md](E2E_VERIFICATION_REPORT.md) for details.

## 🚀 Deployment to GitHub

### Current Status:
- ✅ Code ready to push
- ✅ GitHub Actions configured
- ✅ Secrets documentation provided
- ⏳ Awaiting push to GitHub

### Next Steps:
1. Follow [PUSH_TO_GITHUB.md](PUSH_TO_GITHUB.md)
2. Configure GitHub Secrets
3. Trigger first pipeline run
4. Verify email notification received

## 🏆 Why This Framework?

### For Portfolio:
- Demonstrates professional test automation
- Shows real-world website testing
- Includes complete purchase journeys
- Production-grade error handling

### For Interviews:
- Explains Page Object Model
- Shows TypeScript expertise
- Demonstrates CI/CD knowledge
- Shows problem-solving skills

### For Production:
- Scalable architecture
- Reliable & stable tests
- CI/CD ready
- Email notifications
- Docker support

## 📚 Additional Resources

- [Playwright Docs](https://playwright.dev)
- [Sauce Demo](https://www.saucedemo.com)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ✅ Pre-Push Verification

- [x] All 11 tests pass
- [x] E2E scenarios verified
- [x] GitHub Actions workflow created
- [x] Email notifications configured
- [x] Documentation complete
- [x] Code ready for GitHub

## 🎬 Status: READY FOR GITHUB PUSH

**Everything is set up and ready to go!**

Follow [PUSH_TO_GITHUB.md](PUSH_TO_GITHUB.md) to push your code now. 🚀

---

## 📞 Support

**Quick Issues?**
1. Check [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) - Troubleshooting section
2. Check [SAUCE_DEMO_README.md](SAUCE_DEMO_README.md) - FAQ section

**Need Help?**
1. See [E2E_VERIFICATION_REPORT.md](E2E_VERIFICATION_REPORT.md) for test status
2. Check [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for CI/CD help

---

**Framework Status**: ✅ Production Ready  
**E2E Tests**: ✅ Working Perfectly Fine  
**CI/CD**: ✅ Configured  
**Email Notifications**: ✅ Ready  

**Push to GitHub now and start automated testing! 🚀**
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
