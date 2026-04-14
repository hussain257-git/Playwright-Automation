# Quick Setup Guide

## ⚡ 5-Minute Setup

### 1. Install Dependencies (30 seconds)
```bash
cd t:\Playwright_Automation
npm install
```

### 2. Install Browsers (1 minute)
```bash
npx playwright install chromium
```

### 3. Run Tests (2 minutes)
```bash
# Run all tests in headed mode (see browser)
npx playwright test tests/ --headed

# Or run specific test file
npx playwright test tests/e2e.spec.ts --headed
```

### 4. View Results (30 seconds)
```bash
# View interactive HTML report
npx playwright show-report
```

---

## 🚀 Run Specific Tests

```bash
# Run single test file
npx playwright test tests/auth/login.spec.ts

# Run E2E tests only
npx playwright test tests/e2e.spec.ts

# Run specific test
npx playwright test -g "TC-001"

# Run with headed browser
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Run with video recording
npx playwright test --headed --video=on
```

---

## 📊 Test Coverage

| Suite | Count | Status |
|-------|-------|--------|
| Authentication | 6 | ✅ Ready |
| End-to-End | 3 | ✅ Ready |
| Verification | 5 | ✅ Ready |
| **Total** | **14** | ✅ Ready |

---

## 🔑 Test Credentials

All tests use test accounts on Sauce Demo:

```json
{
  "username": "standard_user",
  "password": "secret_sauce"
}
```

Other valid accounts:
- `problem_user` (visual issues)
- `performance_glitch_user` (slow site)
- `locked_out_user` (locked account)

---

## 🐛 Debugging Failed Tests

### Option 1: Run with Debug UI
```bash
npx playwright test --debug
```

### Option 2: View Test Report
```bash
# After test runs
npx playwright show-report
```

### Option 3: Check Screenshots
```bash
# Failed test screenshots in:
test-results/
```

### Option 4: Watch Videos
```bash
# Recorded videos of failed tests:
test-results/[test-name]-chromium/video.webm
```

---

## 📝 Project Structure

```
t:\Playwright_Automation\
├── pages/              # Page Objects
├── tests/              # Test files
├── fixtures/           # Shared setup
├── test-data/          # Test credentials
├── utils/              # Helper functions
├── .github/            # GitHub Actions
├── docs/               # Documentation
└── playwright.config.ts # Config
```

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# ✅ Check Playwright version
npx playwright --version

# ✅ List all tests
npx playwright test --list

# ✅ Run single test
npx playwright test -g "TC-001"

# ✅ Run with headed browser (watch it)
npx playwright test tests/auth/login.spec.ts --headed --workers=1

# ✅ View HTML report
npx playwright show-report
```

---

## 🎯 Next Steps

1. ✅ Complete setup above
2. ✅ Run tests locally
3. ✅ Push to GitHub
4. ✅ Configure GitHub Secrets
5. ✅ Trigger pipeline from Actions
6. ✅ Check email notifications

---

## 💡 Tips & Tricks

### Run tests faster
```bash
# Parallel workers (faster but less stable)
npx playwright test --workers=4
```

### Get detailed logs
```bash
# Enable verbose logging
DEBUG=pw:api npx playwright test
```

### Run only failed tests
```bash
# Re-run last failed tests
npx playwright test --last-failed
```

### Update snapshots
```bash
# Update visual regression snapshots
npx playwright test --update-snapshots
```

### Generate test report
```bash
# JSON report for CI integration
npx playwright test --reporter=json > test-results.json
```

---

For detailed guides, see:
- [README.md](./README.md) - Full documentation
- [POM_ARCHITECTURE.md](./POM_ARCHITECTURE.md) - Page Objects
- [CI_CD_PIPELINE.md](./CI_CD_PIPELINE.md) - GitHub Actions
