# Quick Start Guide - 5 Minutes to Running Tests

## 🚀 Installation (2 minutes)

### Step 1: Install Dependencies
```powershell
cd t:\Playwright_Automation
npm install
```

### Step 2: Install Browsers
```powershell
npx playwright install chromium
```

### Step 3: Verify Installation
```powershell
& "node_modules\.bin\playwright.cmd" --version
# Expected: Version 1.44.0+
```

---

## ▶️ Run Tests (1 minute)

### Option 1: Run All Tests (Recommended)
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd t:\Playwright_Automation
& "node_modules\.bin\playwright.cmd" test tests/ --headed --workers=1
```

**Expected Output:**
```
Running 11 tests using 1 worker
✓ TC-001: Login with valid credentials (2.0s)
✓ TC-002: Login with locked out user (6.5s)
✓ TC-003: Login with different valid users (8.0s)
✓ TC-004: Empty username validation (1.5s)
✓ TC-005: Empty password validation (1.5s)
✓ TC-006: Successful logout (2.0s)
✓ E2E-001: Complete purchase flow (15.0s)
✓ E2E-002: Browse and add without checkout (8.0s)
✓ E2E-003: Add and remove items (5.0s)
✓ Site verification tests (5.0s)

11 passed (60.0s)
```

### Option 2: Run Only Login Tests
```powershell
& "node_modules\.bin\playwright.cmd" test tests/auth/login.spec.ts --headed
```

### Option 3: Run Only E2E Tests
```powershell
& "node_modules\.bin\playwright.cmd" test tests/e2e.spec.ts --headed
```

### Option 4: Run Without Visible Browser (Headless)
```powershell
& "node_modules\.bin\playwright.cmd" test tests/ --workers=2
```

---

## 📊 View Results (1 minute)

### View HTML Report
```powershell
npx playwright show-report
```
This opens an interactive HTML report in your browser showing:
- Test results with timings
- Screenshots of failures
- Videos of test execution (if configured)
- Detailed error traces

### View JSON Results
```powershell
type test-results.json | ConvertFrom-Json | ConvertTo-Json | head -o
```

### View Test Videos/Screenshots
```powershell
explorer test-results\
# Videos and screenshots are saved for failed tests
```

---

## 🧑‍💻 Test Credentials

Use these to log into Sauce Demo during manual testing:

| User | Password | Notes |
|------|----------|-------|
| standard_user | secret_sauce | Full access |
| problem_user | secret_sauce | Visual bugs (for testing) |
| performance_glitch_user | secret_sauce | Performance issues (for testing) |
| locked_out_user | secret_sauce | ❌ Locked (error test) |

Website: https://www.saucedemo.com

---

## 🔧 Common Commands

### Debug Mode (Step Through Tests)
```powershell
& "node_modules\.bin\playwright.cmd" test tests/auth/login.spec.ts --debug
```
- Inspect element picker tool appears
- Step through test execution
- Pause at any point

### Run with Trace Recording
```powershell
& "node_modules\.bin\playwright.cmd" test tests/ --trace on
```
- Records every action for debugging
- View with: `npx playwright show-trace test-results/trace.zip`

### Run Single Test File
```powershell
& "node_modules\.bin\playwright.cmd" test tests/auth/login.spec.ts
```

### Run Tests in Parallel (Faster)
```powershell
& "node_modules\.bin\playwright.cmd" test tests/ --workers=4
```

### Generate New Selectors
```powershell
& "node_modules\.bin\playwright.cmd" codegen https://www.saucedemo.com
```
- Record new tests by interacting with website
- Auto-generates Playwright code

---

## 📁 Project Structure

```
tests/
├── auth/
│   └── login.spec.ts          ← 6 login tests
├── e2e.spec.ts                ← 3 end-to-end tests
└── verification.spec.ts       ← Framework tests

pages/
├── BasePage.ts                ← Base utilities
├── LoginPage.ts               ← Login/logout
├── ProductPage.ts             ← Products
├── CartPage.ts                ← Cart
└── CheckoutPage.ts            ← Checkout

test-data/
└── users.json                 ← Test credentials

playwright-report/             ← Test results (auto-generated)
test-results/                  ← Videos/screenshots (auto-generated)
```

---

## ✅ What Each Test Does

### TC-001: Standard Login
- Logs in with standard_user
- Verifies inventory page loads
- Logs out

### TC-002: Locked Out User
- Attempts login with locked_out_user
- Verifies error message appears

### TC-003: Multi-User Cycle
- Loops through all 3 valid users
- Each user: login → verify → logout

### TC-004: Empty Username
- Tries login with no username
- Verifies validation error

### TC-005: Empty Password
- Tries login with no password
- Verifies validation error

### TC-006: Logout
- Logs in
- Opens menu
- Clicks logout
- Verifies returned to login page

### E2E-001: Complete Purchase
- Logs in
- Browses products
- Adds 2 items to cart
- Goes to checkout
- Fills shipping info
- Completes order
- Verifies success message

### E2E-002: Browse Without Checkout
- Logs in
- Browses products
- Sorts by price
- Adds 3 items to cart
- Goes back to inventory (continues shopping)

### E2E-003: Cart Removal
- Logs in
- Adds 3 items
- Goes to cart
- Removes items one by one
- Verifies count updates

---

## 🐛 Troubleshooting

### Q: "Cannot find module '@playwright/test'"
**A:** Run `npm install`

### Q: "Chromium binary not found"
**A:** Run `npx playwright install chromium`

### Q: Tests timeout
**A:** Environment issue - try:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

### Q: Browser doesn't open
**A:** Add `--headed` flag to see browser:
```powershell
& "node_modules\.bin\playwright.cmd" test --headed
```

### Q: "Cannot find test file"
**A:** Make sure you're in correct directory:
```powershell
cd t:\Playwright_Automation
```

### Q: Tests fail with "Element not found"
**A:** Website changed - update selectors:
```powershell
& "node_modules\.bin\playwright.cmd" codegen https://www.saucedemo.com
```

---

## 📈 Performance Tips

### Run Tests Faster
```powershell
# Use multiple workers (parallel execution)
& "node_modules\.bin\playwright.cmd" test --workers=4
```

### Reduce Flakiness
```powershell
# Run with specific reporter
& "node_modules\.bin\playwright.cmd" test --reporter=list
```

### Debug Failures Quickly
```powershell
# Run failed tests only
& "node_modules\.bin\playwright.cmd" test --last-failed
```

---

## 📚 Documentation Files

Read these for more details:
- **SAUCE_DEMO_README.md** - Complete framework guide
- **PROJECT_COMPLETION_SUMMARY.md** - Architecture & design
- **VERIFICATION_CHECKLIST.md** - Feature completeness
- **QUICK_START_GUIDE.md** - This file!

---

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npx playwright install chromium`
3. ✅ Run `& "node_modules\.bin\playwright.cmd" test tests/ --headed`
4. ✅ Open `npx playwright show-report`
5. ✅ Review test results
6. ✅ Extend tests as needed

---

## 💡 Tips for Success

- **Always use headed mode** (`--headed`) during development to see what's happening
- **Check the HTML report** for test timings and failures
- **Use debug mode** (`--debug`) to step through problematic tests
- **Read error messages** - they usually point to the issue
- **Update selectors** if website changes (use codegen)

---

## ✨ You're All Set!

The framework is ready to use. Start with:

```powershell
& "node_modules\.bin\playwright.cmd" test tests/ --headed
```

Happy testing! 🚀

---

**Framework**: Playwright 1.44.0  
**Language**: TypeScript 5.9.3  
**Test Site**: Sauce Demo (https://www.saucedemo.com)  
**Status**: ✅ Ready to Use
