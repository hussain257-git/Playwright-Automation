# ðŸŽ­ Playwright SauceDemo E2E Automation Framework

[![CI/CD Pipeline](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-27%20Passing-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

> Production-ready end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com) built with Playwright + TypeScript, featuring a full CI/CD pipeline with automated email reporting.

---

## âœ¨ Features

- âœ… **27 Automated Tests** â€” Full coverage across Login, Cart, Checkout, UI, Logout & Negative cases
- âœ… **Page Object Model** â€” Clean, maintainable architecture (`LoginPage`, `ProductPage`, `CartPage`, `CheckoutPage`)
- âœ… **Storage State Auth Reuse** â€” Global setup logs in once; all tests reuse `auth.json` (no UI login per test)
- âœ… **Test Tagging** â€” `@smoke` (8 key tests), `@regression` (all), plus suite tags (`@login`, `@cart`, `@e2e`, etc.)
- âœ… **JSON Test Data** â€” All credentials and checkout data in `test-data/users.json`, zero hardcoded strings in specs
- âœ… **TypeScript Strict Mode** â€” `strict: true`, `noImplicitAny: true` â€” full type safety enforced
- âœ… **GitHub Actions CI/CD** â€” Runs on every push, PR, schedule (4Ã—/day), and manual trigger
- âœ… **Parallel Execution** â€” 4 workers on CI, 2 locally for faster runs
- âœ… **Email Notifications** â€” Rich HTML email with metrics table + Playwright report ZIP on every run
- âœ… **Artifacts** â€” HTML report (30 days) + test videos (7 days) uploaded on every run
- âœ… **Custom Fixtures** â€” Reusable test setup via `fixtures/custom-fixtures.ts`

---

## ðŸ“Š Test Coverage â€” 27 Tests

| # | Suite | Test IDs | Count | Tag | Status |
|---|-------|----------|-------|-----|--------|
| 1 | **Login Functionality** | TC-001 â†’ TC-005 | 5 | `@login` | âœ… PASS |
| 2 | **Inventory / Products** | TC-006 â†’ TC-009 | 4 | `@inventory` | âœ… PASS |
| 3 | **Cart Validation** | TC-010 â†’ TC-013 | 4 | `@cart` | âœ… PASS |
| 4 | **Logout** | TC-014 â†’ TC-015 | 2 | `@login` | âœ… PASS |
| 5 | **UI/UX Validation** | TC-016 â†’ TC-020 | 5 | `@ui` | âœ… PASS |
| 6 | **Negative / Edge Cases** | TC-021 â†’ TC-024 | 4 | `@negative` | âœ… PASS |
| 7 | **E2E Flows** | E2E-001 â†’ E2E-003 | 3 | `@e2e` | âœ… PASS |
| â€” | **Total** | | **27** | `@regression` | **âœ… All Passing** |

> **Smoke suite** (`@smoke`): TC-001, TC-006, TC-010, TC-014, TC-016, TC-021, TC-024, E2E-001 â€” 8 critical path tests.

---

## ðŸš€ Quick Start

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

**Expected result:** 27 tests pass in ~2 minutes âœ…

---

## ðŸ—ï¸ Project Structure

```
Playwright_Automation/
â”œâ”€â”€ .github/workflows/
â”‚   â””â”€â”€ playwright-tests.yml   # CI/CD pipeline
â”œâ”€â”€ fixtures/
â”‚   â””â”€â”€ custom-fixtures.ts     # Reusable test fixtures
â”œâ”€â”€ pages/                     # Page Object Model
â”‚   â”œâ”€â”€ BasePage.ts
â”‚   â”œâ”€â”€ LoginPage.ts
â”‚   â”œâ”€â”€ ProductPage.ts
â”‚   â”œâ”€â”€ CartPage.ts
â”‚   â””â”€â”€ CheckoutPage.ts
â”œâ”€â”€ tests/                     # All test specs
â”‚   â”œâ”€â”€ auth/login.spec.ts
â”‚   â”œâ”€â”€ cart.spec.ts
â”‚   â”œâ”€â”€ e2e.spec.ts
â”‚   â”œâ”€â”€ global-setup.ts        # Login once â†’ saves auth.json
â”‚   â”œâ”€â”€ inventory.spec.ts
â”‚   â”œâ”€â”€ logout.spec.ts
â”‚   â”œâ”€â”€ negative-cases.spec.ts
â”‚   â””â”€â”€ ui-validation.spec.ts
â”œâ”€â”€ test-data/
â”‚   â”œâ”€â”€ users.json             # All credentials + checkout data
â”‚   â””â”€â”€ test-data.ts           # Typed helper (exports users, checkout)
â”œâ”€â”€ playwright.config.ts       # Playwright configuration
â”œâ”€â”€ tsconfig.json
â””â”€â”€ package.json
```

---

## âš™ï¸ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) runs on:

| Trigger | Details |
|---------|---------|
| **Push** | `main`, `develop`, `feature/*` branches |
| **Pull Request** | `main`, `develop` branches |
| **Schedule** | 00:00, 06:00, 12:00, 18:00 UTC (4Ã— daily) |
| **Manual** | "Run workflow" button on the Actions tab |

### Pipeline Steps

```
Checkout â†’ Setup Node.js 18 â†’ npm ci â†’ Install Playwright browsers
  â†’ Run 27 Tests (4 workers, parallel)
  â†’ Parse results (passed/failed/flaky/duration/pass rate)
  â†’ Zip Playwright report
  â†’ Upload HTML report artifact (30 days)
  â†’ Upload test videos artifact (7 days)
  â†’ Publish JUnit results
  â†’ Generate GitHub Step Summary
  â†’ Send HTML email (Gmail SMTP â†’ Outlook inbox)
```

---

## ðŸ“§ Email Notifications

Every pipeline run sends a rich HTML email to the configured inbox:

- **âœ… Success email** â€” green header, metrics table (total/passed/failed/pass rate/duration), run details, test suites table, link to artifacts
- **âŒ Failure email** â€” red header, same metrics + action required checklist
- **Attachment** â€” `playwright-report.zip` (full Playwright HTML report)

**Email subject examples:**
```
âœ… [Playwright E2E] PASSED | 27/27 Tests | Pass Rate: 100% | SauceDemo | Run #18 | Branch: main
âŒ [Playwright E2E] FAILED | 2 Failed, 25 Passed / 27 Total | Pass Rate: 92.6% | SauceDemo | Run #19 | Branch: main
```

---

## ðŸ”‘ Test Credentials

All accounts work on `https://www.saucedemo.com`:

| Username | Password | Notes |
|----------|----------|-------|
| `standard_user` | `secret_sauce` | âœ… Main test account |
| `problem_user` | `secret_sauce` | âœ… UI bug scenarios |
| `performance_glitch_user` | `secret_sauce` | âœ… Slow-load scenarios |
| `locked_out_user` | `secret_sauce` | âŒ Locked (negative test) |

---

## ðŸ› ï¸ Playwright Configuration

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

## ðŸ§ª Run Commands Cheatsheet

### By tag (npm scripts)
```bash
npm test                      # All 27 tests
npm run test:smoke            # 8 critical-path tests (@smoke)
npm run test:regression       # Full regression suite (all tests)
npm run test:login            # Login + Logout specs (@login)
npm run test:inventory        # Inventory/Products spec (@inventory)
npm run test:cart             # Cart spec (@cart)
npm run test:checkout         # Checkout + negative cases (@checkout)
npm run test:e2e              # E2E flows (@e2e)
npm run test:negative         # Negative edge cases (@negative)
```

### By file (run a whole spec)
```bash
npx playwright test tests/auth/login.spec.ts
npx playwright test tests/e2e.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/inventory.spec.ts
npx playwright test tests/negative-cases.spec.ts
```

### By single test ID
```bash
npx playwright test --grep "TC-001"     # Single TC by ID
npx playwright test --grep "E2E-001"    # Single E2E by ID
npx playwright test --grep "TC-02"      # Range â€” matches TC-020 to TC-029
```

### Browser & debug modes
```bash
npx playwright test --headed            # Watch browser run
npx playwright test --ui                # Interactive UI mode (recommended for demo)
npx playwright test --debug             # Step through with DevTools
npx playwright codegen https://www.saucedemo.com  # Record new tests
```

### Reports
```bash
npm run report                          # Open last HTML report
npx playwright show-report              # Same as above
```

### Trigger GitHub Actions from terminal
```bash
# Requires GitHub CLI (gh auth login first)
gh workflow run playwright-tests.yml              # Trigger on default branch
gh workflow run playwright-tests.yml --ref main   # Trigger on main
gh run list --workflow=playwright-tests.yml       # View recent runs
gh run watch                                      # Live-tail the current run
```

---

## ðŸ“ˆ Reports & Artifacts

| Artifact | Retention | Contents |
|----------|-----------|---------|
| `playwright-report` | 30 days | Full HTML report with screenshots, traces |
| `test-videos` | 7 days | Videos of failed tests |
| GitHub Step Summary | Per run | Metrics table in Actions UI |
| Email | Per run | HTML report + ZIP attachment |

---

## ðŸ”§ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| [Playwright](https://playwright.dev/) | Latest | Browser automation |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe test code |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [GitHub Actions](https://github.com/features/actions) | â€” | CI/CD pipeline |
| [dawidd6/action-send-mail](https://github.com/dawidd6/action-send-mail) | v3 | Email notifications |


---

## About the Author

Passionate QA automation engineer. Strong believer in building things right, not just fast.

This framework represents my approach to test engineering - treating automation as a **first-class engineering discipline**, not an afterthought:

| Pillar | What's Built |
|--------|-------------|
| **Scalability** | Parallel workers, global auth via storage state, tagged test suites (`@smoke`, `@regression`) |
| **Reliability** | TypeScript strict mode, Page Object Model, zero hardcoded credentials |
| **Speed** | Login-once strategy (`global-setup.ts`) - auth reused across all 27 tests, no repeated UI login |
| **Observability** | GitHub Actions CI/CD, rich HTML email reports, JUnit XML, GitHub Step Summary |
| **Maintainability** | Clean POM architecture, JSON test data, custom fixtures - built for a team, not just one person |

**On Playwright specifically:**
Playwright is my framework of choice because it's built for the modern web - native async/await, auto-waiting, network interception, multi-browser support in one tool, and a storage state API that makes login-once patterns trivially easy. This project uses Playwright to its full depth: `storageState`, `test.use()` overrides, `--grep` tag filtering, `globalSetup`, and the full fixture system.

**On AI-augmented engineering:**
We're at a point in history where the gap between a good engineer and a great one is how effectively they leverage AI. I use AI tools daily - to learn new patterns, validate architectural decisions, debug with context, and write cleaner TypeScript. The skill isn't in knowing everything. It's in knowing how to find the best answer, understand it fully, and apply it with precision.

The engineers who thrive in this era won't be those who avoid AI. They'll be those who know exactly how to use it - and when not to.

> *"The best automation engineer isn't the one who knows everything - it's the one who never stops building, and uses every tool available to build better."*

---

## Roadmap - Planned Enhancements

This framework is actively evolving. Planned additions to make it a complete enterprise-grade QA platform:

| # | Enhancement | Description | Priority |
|---|-------------|-------------|----------|
| 1 | **Allure Reporting** | Enterprise visual report portal with history, trends and suite breakdown | High |
| 2 | **API Testing Layer** | Playwright `request` fixture - test REST APIs alongside UI, API-first test setup | High |
| 3 | **Cucumber / BDD** | Gherkin feature files - business-readable tests that non-technical stakeholders can understand | High |
| 4 | **Visual Regression** | Screenshot diff testing - catch unintended UI changes across deployments | Medium |
| 5 | **Accessibility Testing** | axe-core integration - WCAG 2.1 compliance checks on every run | Medium |
| 6 | **Performance Testing** | k6 or Playwright metrics - response times, load behaviour, Core Web Vitals | Medium |
| 7 | **Test Data Factory** | Faker.js - dynamic test data generation, eliminate static JSON dependency | Medium |
| 8 | **JIRA Integration** | Auto-link failing tests to JIRA tickets, update status on pass/fail | Planned |
| 9 | **Slack Notifications** | Alert team Slack channels instantly on pipeline failure | Planned |
| 10 | **Docker Support** | Containerised test execution - consistent environments across local and CI | Planned |

> Contributions and suggestions welcome - open an issue or PR.

---

## License

MIT - free to use for learning and interview preparation.
