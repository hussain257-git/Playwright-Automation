# 🎭 Playwright SauceDemo E2E Automation Framework

[![CI/CD Pipeline](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-32%20Passing-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

> Production-ready end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com) built with Playwright + TypeScript, featuring a full CI/CD pipeline with automated email reporting.

---

## ✨ Features

- ✅ **32 Automated Tests** — Full coverage across Login, Cart, Checkout, UI, Logout & Negative cases
- ✅ **Page Object Model** — Clean, maintainable architecture (`LoginPage`, `ProductPage`, `CartPage`, `CheckoutPage`)
- ✅ **GitHub Actions CI/CD** — Runs on every push, PR, schedule (4×/day), and manual trigger
- ✅ **Parallel Execution** — 4 workers on CI, 2 locally for faster runs
- ✅ **Email Notifications** — Rich HTML email with metrics table + Playwright report ZIP on every run
- ✅ **TypeScript** — Full type safety across all test files and page objects
- ✅ **Artifacts** — HTML report (30 days) + test videos (7 days) uploaded on every run
- ✅ **Custom Fixtures** — Reusable test setup via `fixtures/custom-fixtures.ts`

---

## 📊 Test Coverage — 32 Tests

| # | Suite | Test IDs | Count | Status |
|---|-------|----------|-------|--------|
| 1 | **Login Functionality** | TC-001 → TC-005 | 5 | ✅ PASS |
| 2 | **Inventory / Products** | TC-006 → TC-009 | 4 | ✅ PASS |
| 3 | **Cart Validation** | TC-010 → TC-013 | 4 | ✅ PASS |
| 4 | **Logout** | TC-014 → TC-015 | 2 | ✅ PASS |
| 5 | **UI/UX Validation** | TC-016 → TC-020 | 5 | ✅ PASS |
| 6 | **Negative / Edge Cases** | TC-021 → TC-024 | 4 | ✅ PASS |
| 7 | **E2E Checkout Flow** | E2E-001 → E2E-003 | 3 | ✅ PASS |
| 8 | **Auth (Login spec)** | Login scenarios | 5 | ✅ PASS |
| — | **Total** | | **32** | **✅ All Passing** |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm

### Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/hussain257-git/Playwright-Automation.git
cd Playwright-Automation

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install chromium

# 4. Run all tests
npx playwright test

# 5. View HTML report
npx playwright show-report
```

**Expected result:** 32 tests pass in ~2 minutes ✅

---

## 🏗️ Project Structure

```
Playwright_Automation/
├── .github/workflows/
│   └── playwright-tests.yml   # CI/CD pipeline
├── fixtures/
│   └── custom-fixtures.ts     # Reusable test fixtures
├── pages/                     # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                     # All test specs
│   ├── auth/login.spec.ts
│   ├── cart.spec.ts
│   ├── e2e.spec.ts
│   ├── inventory.spec.ts
│   ├── logout.spec.ts
│   ├── negative-cases.spec.ts
│   └── ui-validation.spec.ts
├── test-data/
│   └── users.json             # Test credentials
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) runs on:

| Trigger | Details |
|---------|---------|
| **Push** | `main`, `develop`, `feature/*` branches |
| **Pull Request** | `main`, `develop` branches |
| **Schedule** | 00:00, 06:00, 12:00, 18:00 UTC (4× daily) |
| **Manual** | "Run workflow" button on the Actions tab |

### Pipeline Steps

```
Checkout → Setup Node.js 18 → npm ci → Install Playwright browsers
  → Run 32 Tests (4 workers, parallel)
  → Parse results (passed/failed/flaky/duration/pass rate)
  → Zip Playwright report
  → Upload HTML report artifact (30 days)
  → Upload test videos artifact (7 days)
  → Publish JUnit results
  → Generate GitHub Step Summary
  → Send HTML email (Gmail SMTP → Outlook inbox)
```

---

## 📧 Email Notifications

Every pipeline run sends a rich HTML email to the configured inbox:

- **✅ Success email** — green header, metrics table (total/passed/failed/pass rate/duration), run details, test suites table, link to artifacts
- **❌ Failure email** — red header, same metrics + action required checklist
- **Attachment** — `playwright-report.zip` (full Playwright HTML report)

**Email subject examples:**
```
✅ [Playwright E2E] PASSED | 32/32 Tests | Pass Rate: 100% | SauceDemo | Run #17 | Branch: main
❌ [Playwright E2E] FAILED | 2 Failed, 30 Passed / 32 Total | Pass Rate: 93.8% | SauceDemo | Run #18 | Branch: main
```

---

## 🔑 Test Credentials

All accounts work on `https://www.saucedemo.com`:

| Username | Password | Notes |
|----------|----------|-------|
| `standard_user` | `secret_sauce` | ✅ Main test account |
| `problem_user` | `secret_sauce` | ✅ UI bug scenarios |
| `performance_glitch_user` | `secret_sauce` | ✅ Slow-load scenarios |
| `locked_out_user` | `secret_sauce` | ❌ Locked (negative test) |

---

## 🛠️ Playwright Configuration

| Setting | Value |
|---------|-------|
| Base URL | `https://www.saucedemo.com` |
| Browser | Chromium |
| Timeout | 60 seconds |
| Retries | 2 (CI) / 0 (local) |
| Workers | 4 (CI) / 2 (local) |
| Trace | On first retry |
| Screenshot | On failure |
| Video | Retained on failure |

---

## 🧪 Run Specific Tests

```bash
# Run a single spec file
npx playwright test tests/e2e.spec.ts

# Run by test ID/name
npx playwright test --grep "TC-001"
npx playwright test --grep "E2E-001"

# Run in headed mode (watch the browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Run with UI mode
npx playwright test --ui
```

---

## 📈 Reports & Artifacts

| Artifact | Retention | Contents |
|----------|-----------|---------|
| `playwright-report` | 30 days | Full HTML report with screenshots, traces |
| `test-videos` | 7 days | Videos of failed tests |
| GitHub Step Summary | Per run | Metrics table in Actions UI |
| Email | Per run | HTML report + ZIP attachment |

---

## 🔧 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| [Playwright](https://playwright.dev/) | Latest | Browser automation |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe test code |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD pipeline |
| [dawidd6/action-send-mail](https://github.com/dawidd6/action-send-mail) | v3 | Email notifications |

---

## 📜 License

MIT — free to use for learning and interview preparation.
