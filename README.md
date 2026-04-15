# Playwright SauceDemo E2E Automation Framework

[![CI/CD Pipeline](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/hussain257-git/Playwright-Automation/actions/workflows/playwright-tests.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-27%20Passing-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

> Production-ready end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com) built with Playwright + TypeScript, featuring a full CI/CD pipeline with automated email reporting.

---

## Features

- **27 Automated Tests** — Full coverage across Login, Cart, Checkout, UI, Logout & Negative cases
- **Page Object Model** — Clean, maintainable architecture (`LoginPage`, `ProductPage`, `CartPage`, `CheckoutPage`)
- **Storage State Auth Reuse** — Global setup logs in once; all tests reuse `auth.json` (no UI login per test)
- **Test Tagging** — `@smoke` (8 key tests), `@regression` (all), plus suite tags (`@login`, `@cart`, `@e2e`, etc.)
- **JSON Test Data** — All credentials and checkout data in `test-data/users.json`, zero hardcoded strings in specs
- **TypeScript Strict Mode** — `strict: true`, `noImplicitAny: true` — full type safety enforced
- **GitHub Actions CI/CD** — Runs on every push, PR, schedule (4x/day), and manual trigger
- **Parallel Execution** — 4 workers on CI, 2 locally for faster runs
- **Email Notifications** — Rich HTML email with metrics table + Playwright report ZIP on every run
- **Artifacts** — HTML report (30 days) + test videos (7 days) uploaded on every run
- **Custom Fixtures** — Reusable test setup via `fixtures/custom-fixtures.ts`

---

## Test Coverage — 27 Tests

| # | Suite | Test IDs | Count | Tag | Status |
|---|-------|----------|-------|-----|--------|
| 1 | **Login Functionality** | TC-001 → TC-005 | 5 | `@login` | PASS |
| 2 | **Inventory / Products** | TC-006 → TC-009 | 4 | `@inventory` | PASS |
| 3 | **Cart Validation** | TC-010 → TC-013 | 4 | `@cart` | PASS |
| 4 | **Logout** | TC-014 → TC-015 | 2 | `@login` | PASS |
| 5 | **UI/UX Validation** | TC-016 → TC-020 | 5 | `@ui` | PASS |
| 6 | **Negative / Edge Cases** | TC-021 → TC-024 | 4 | `@negative` | PASS |
| 7 | **E2E Flows** | E2E-001 → E2E-003 | 3 | `@e2e` | PASS |
| — | **Total** | | **27** | `@regression` | **All Passing** |

> **Smoke suite** (`@smoke`): TC-001, TC-006, TC-010, TC-014, TC-016, TC-021, TC-024, E2E-001 — 8 critical path tests.

---

## Quick Start

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

**Expected result:** 27 tests pass in ~2 minutes

---

## Project Structure

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
│   ├── global-setup.ts        # Login once → saves auth.json
│   ├── inventory.spec.ts
│   ├── logout.spec.ts
│   ├── negative-cases.spec.ts
│   └── ui-validation.spec.ts
├── test-data/
│   ├── users.json             # All credentials + checkout data
│   └── test-data.ts           # Typed helper (exports users, checkout)
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) runs on:

| Trigger | Details |
|---------|---------|
| **Push** | `main`, `develop`, `feature/*` branches |
| **Pull Request** | `main`, `develop` branches |
| **Schedule** | 00:00, 06:00, 12:00, 18:00 UTC (4x daily) |
| **Manual** | "Run workflow" button on the Actions tab |

### Pipeline Steps

```
Checkout → Setup Node.js 18 → npm ci → Install Playwright browsers
  → Run 27 Tests (4 workers, parallel)
  → Parse results (passed/failed/flaky/duration/pass rate)
  → Zip Playwright report
  → Upload HTML report artifact (30 days)
  → Upload test videos artifact (7 days)
  → Publish JUnit results
  → Generate GitHub Step Summary
  → Send HTML email (Gmail SMTP → Outlook inbox)
```

---

## Email Notifications

Every pipeline run sends a rich HTML email to the configured inbox:

- **Success email** — green header, metrics table (total/passed/failed/pass rate/duration), run details, test suites table, link to artifacts
- **Failure email** — red header, same metrics + action required checklist
- **Attachment** — `playwright-report.zip` (full Playwright HTML report)

**Email subject examples:**

```
[Playwright E2E] PASSED | 27/27 Tests | Pass Rate: 100% | SauceDemo | Run #18 | Branch: main
[Playwright E2E] FAILED | 2 Failed, 25 Passed / 27 Total | Pass Rate: 92.6% | SauceDemo | Run #19 | Branch: main
```

---

## Test Credentials

All accounts work on `https://www.saucedemo.com`:

| Username | Password | Notes |
|----------|----------|-------|
| `standard_user` | `secret_sauce` | Main test account |
| `problem_user` | `secret_sauce` | UI bug scenarios |
| `performance_glitch_user` | `secret_sauce` | Slow-load scenarios |
| `locked_out_user` | `secret_sauce` | Locked (negative test) |

---

## Playwright Configuration

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

## Run Commands Cheatsheet

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
npx playwright test --grep "TC-02"      # Range — matches TC-020 to TC-029
```

### Browser & debug modes

```bash
npx playwright test --headed            # Watch browser run live
npx playwright test --ui                # Interactive UI mode (best for demo)
npx playwright test --debug             # Step-through with DevTools
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

## Reports & Artifacts

| Artifact | Retention | Contents |
|----------|-----------|---------|
| `playwright-report` | 30 days | Full HTML report with screenshots, traces |
| `test-videos` | 7 days | Videos of failed tests |
| GitHub Step Summary | Per run | Metrics table in Actions UI |
| Email | Per run | HTML report + ZIP attachment |

---

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| [Playwright](https://playwright.dev/) | Latest | Browser automation |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe test code |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD pipeline |
| [dawidd6/action-send-mail](https://github.com/dawidd6/action-send-mail) | v3 | Email notifications |

---

## About the Author

Passionate QA automation engineer. Strong believer in building things right, not just fast.

This framework represents my approach to test engineering — treating automation as a **first-class engineering discipline**, not an afterthought:

| Pillar | What's Built |
|--------|-------------|
| **Scalability** | Parallel workers, global auth via storage state, tagged test suites (`@smoke`, `@regression`) |
| **Reliability** | TypeScript strict mode, Page Object Model, zero hardcoded credentials |
| **Speed** | Login-once strategy (`global-setup.ts`) — auth reused across all 27 tests, no repeated UI login |
| **Observability** | GitHub Actions CI/CD, rich HTML email reports, JUnit XML, GitHub Step Summary |
| **Maintainability** | Clean POM architecture, JSON test data, custom fixtures — built for a team, not just one person |

---

### Why Playwright — and why it's the right choice

Playwright isn't just a tool I picked — it's one I deliberately chose after understanding what makes modern web test automation hard, and what makes it fast.

**Playwright vs alternatives:**

| Capability | Playwright | Selenium | Cypress |
|------------|-----------|---------|--------|
| Auto-waiting | Intelligent, built-in | Manual explicit waits | Limited |
| Multi-browser | Chromium, Firefox, WebKit | Yes (WebDriver) | Chromium-based only |
| Network interception | Built-in, no plugins | Third-party tools needed | Built-in |
| Storage state / session reuse | Native API | Not built-in | Not built-in |
| API testing | Built-in `request` fixture | Separate tool needed | Separate plugin needed |
| TypeScript support | First-class | Plugin-based | Good |
| Speed | Fast — direct browser protocol | Slower — WebDriver HTTP bridge | Fast |
| Parallelism | True multi-worker, multi-browser | Limited | Same origin only |
| Trace viewer | Built-in, full execution trace | Not available | Not available |

**Playwright features used in depth in this project:**

- `globalSetup` — runs exactly once before all workers start; handles login and saves session to `auth.json`
- `storageState` — injects the saved authenticated session into every test context automatically; no UI login per test
- `test.use({ storageState: ... })` — overrides storage state per describe block so login tests and auth-redirect tests start with a clean, unauthenticated browser
- `--grep` tag filtering — run `@smoke`, `@regression`, `@cart`, or any suite tag in isolation via CLI or npm scripts
- `page.locator()` — resilient, auto-retrying selectors; no `waitForElement()` calls needed
- `expect()` — async-native Playwright assertions with actionable, readable failure messages
- `test.describe` + `test.beforeEach` — clean test hierarchy; shared setup without repetition
- Custom `fixtures` — `authenticatedPage` fixture for session-aware page setup, reusable across any spec
- Trace viewer — full execution traces (DOM snapshots + network + console) for debugging CI failures without reproducing locally
- `codegen` — record new test interactions directly in the browser, output as TypeScript

> Playwright has fundamentally changed what "fast feedback" means in a test pipeline. This project runs 27 tests across parallel workers in under 2 minutes — and every second saved is because of decisions Playwright makes the right default.

---

### On AI-augmented engineering

We're at a point in history where the gap between a good engineer and a great one is how effectively they leverage AI. I use AI tools daily — to learn new patterns, validate architectural decisions, debug with context, and write cleaner TypeScript. The skill isn't in knowing everything. It's in knowing how to find the best answer, understand it fully, and apply it with precision.

The engineers who thrive in this era won't be those who avoid AI. They'll be those who know exactly how to use it — and when not to.

> *"The best automation engineer isn't the one who knows everything — it's the one who never stops building, and uses every tool available to build better."*

---

## Roadmap — Planned Enhancements

This framework is actively evolving. Planned additions to make it a complete enterprise-grade QA platform:

| # | Enhancement | Description | Priority |
|---|-------------|-------------|----------|
| 1 | **Allure Reporting** | Enterprise visual report portal with history, trends and suite breakdown | High |
| 2 | **API Testing Layer** | Playwright `request` fixture — test REST APIs alongside UI, API-first test setup | High |
| 3 | **Cucumber / BDD** | Gherkin feature files — business-readable tests that non-technical stakeholders can understand | High |
| 4 | **Visual Regression** | Screenshot diff testing — catch unintended UI changes across deployments | Medium |
| 5 | **Accessibility Testing** | axe-core integration — WCAG 2.1 compliance checks on every run | Medium |
| 6 | **Performance Testing** | k6 or Playwright metrics — response times, load behaviour, Core Web Vitals | Medium |
| 7 | **Test Data Factory** | Faker.js — dynamic test data generation, eliminate static JSON dependency | Medium |
| 8 | **JIRA Integration** | Auto-link failing tests to JIRA tickets, update status on pass/fail | Planned |
| 9 | **Slack Notifications** | Alert team Slack channels instantly on pipeline failure | Planned |
| 10 | **Docker Support** | Containerised test execution — consistent environments across local and CI | Planned |

> Contributions and suggestions welcome — open an issue or PR.

---

## License

MIT — free to use for learning and interview preparation.
