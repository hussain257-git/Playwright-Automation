# Example: Pipeline Email Report

This is an example of what you'll receive in your pipeline email with the new enhancements.

---

## ✅ SUCCESS EMAIL EXAMPLE

```
Subject: ✅ Playwright Tests PASSED - Pipeline #542

🎉 Playwright Test Pipeline Execution Summary

Status: ✅ ALL TESTS PASSED

Pipeline Details:
- Repository: hussain257-git/Playwright-Automation
- Branch: main
- Triggered By: hussain257
- Commit SHA: a1f2b3c4d5e6f7g8h9i0j1k2l3m4n5o6
- Run ID: #542
- Triggered On: push
- Timestamp: 2026-04-14 06:45:30 UTC

Test Execution Metrics:
- Total Test Cases: 11
- ✅ Passed: 11
- ❌ Failed: 0
- ⏭️ Skipped: 0
- 🔨 Broken: 0
- Pass Rate: 100.00%
- Total Duration: 45.32s

Test Suites:
- Authentication Tests (6 cases): PASSED ✅
- End-to-End Tests (3 cases): PASSED ✅
- Framework Verification (2 cases): PASSED ✅

Artifacts Generated:
- ✓ Playwright Report (HTML)
- ✓ Test Screenshots
- ✓ Test Videos
- ✓ Test Results JSON

Key Information:
- Test Framework: Playwright v1.44.0
- Language: TypeScript v5.9.3
- Browser: Chromium
- Test Site: Sauce Demo (https://www.saucedemo.com)
- OS: Windows Latest
- Node.js: v18

Artifacts Retention:
- Playwright Report: 30 days
- Test Videos: 7 days
- Test Artifacts: 30 days

Next Steps:
1. Review detailed Playwright HTML Report (attached)
2. Download artifacts from GitHub Actions
3. Check pull request comments for inline results (if PR)
4. All test logs available in Actions console

---
View Full Pipeline: 
https://github.com/hussain257-git/Playwright-Automation/actions/runs/9876543

Download Artifacts:
https://github.com/hussain257-git/Playwright-Automation/actions/runs/9876543/artifacts

Build Status: SUCCESS ✅
Deployment Ready: YES 🚀

ATTACHMENTS: playwright-report/
```

---

## ❌ FAILURE EMAIL EXAMPLE

```
Subject: ❌ Playwright Tests FAILED - Pipeline #541

⚠️ Playwright Test Pipeline Execution Summary

Status: ❌ TESTS FAILED

Pipeline Details:
- Repository: hussain257-git/Playwright-Automation
- Branch: develop
- Triggered By: hussain257
- Commit SHA: z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4
- Run ID: #541
- Triggered On: pull_request
- Timestamp: 2026-04-14 06:30:15 UTC

Test Execution Metrics:
- Total Test Cases: 11
- ✅ Passed: 9
- ❌ Failed: 2
- ⏭️ Skipped: 0
- 🔨 Broken: 0
- Pass Rate: 81.82%
- Total Duration: 52.15s

Failed Test Cases:
- ❌ E2E Tests: E2E-001: Complete purchase flow - Login to Order Completion
  Error: Expected element to be visible, but it was not
- ❌ E2E Tests: E2E-003: Remove items from cart
  Error: Timeout waiting for selector

What to Do:
1. ⚠️ Review the failed tests in the attached HTML report
2. 📸 Check screenshots in test-results/ artifacts
3. 🎥 Review video recordings for failed tests
4. 📋 Read error messages in test-summary.json
5. 🔍 Check the full logs in Actions console
6. 🐛 Run tests locally to reproduce: npm test

Debugging Steps:
1. Run tests locally: npm test
2. Run in debug mode: npx playwright test --debug
3. Generate trace: npx playwright test --trace on
4. View trace: npx playwright show-trace trace.zip

Key Information:
- Test Framework: Playwright v1.44.0
- Language: TypeScript v5.9.3
- Browser: Chromium
- Test Site: Sauce Demo (https://www.saucedemo.com)
- OS: Windows Latest
- Node.js: v18

Artifacts Available:
- Playwright Report (HTML) - 30 days
- Test Videos - 7 days
- Test Screenshots - On failure
- Test Summary (JSON) - For metrics

Quick Fixes to Try:
1. Update selectors if UI changed: npm run test:ui
2. Clear cache: npm run clean
3. Reinstall dependencies: npm ci
4. Update Playwright: npm update @playwright/test

---
View Full Pipeline: 
https://github.com/hussain257-git/Playwright-Automation/actions/runs/9876542

Download Artifacts:
https://github.com/hussain257-git/Playwright-Automation/actions/runs/9876542/artifacts

Test Report Link:
https://github.com/hussain257-git/Playwright-Automation/actions/runs/9876542/attempts/1

Build Status: FAILED ❌
Action Required: YES ⚠️

Please investigate and fix the failing tests.

ATTACHMENTS:
- playwright-report/
- test-results/
- test-summary.json
```

---

## What the Playwright HTML Report Contains

The attached `playwright-report/` includes:

1. **Test Summary**
   - Total tests run
   - Passed/failed counts
   - Duration
   - Environment info

2. **Test Details**
   - Each test case with status
   - Execution time
   - Error messages
   - Stack traces

3. **Screenshots**
   - Taken on failure
   - Before/after states
   - Full page captures

4. **Videos**
   - Recorded test execution
   - Step-by-step playback
   - For failed tests

5. **Trace Files**
   - Step-by-step browser actions
   - DOM snapshots
   - Network logs
   - Interactive viewer

---

## Test Summary JSON Example

```json
{
  "totalTests": 11,
  "passed": 9,
  "failed": 2,
  "skipped": 0,
  "broken": 0,
  "passRate": "81.82",
  "failRate": "18.18",
  "totalDuration": "52.15",
  "suites": [
    {
      "name": "Sauce Demo - End-to-End Flow",
      "tests": 3,
      "passed": 1,
      "failed": 2,
      "skipped": 0,
      "broken": 0
    },
    {
      "name": "Sauce Demo - Negative Cases",
      "tests": 4,
      "passed": 4,
      "failed": 0,
      "skipped": 0,
      "broken": 0
    },
    {
      "name": "Sauce Demo - UI Validation",
      "tests": 4,
      "passed": 4,
      "failed": 0,
      "skipped": 0,
      "broken": 0
    }
  ],
  "failedTests": [
    {
      "title": "E2E-001: Complete purchase flow - Login to Order Completion",
      "suite": "Sauce Demo - End-to-End Flow",
      "error": "Expected element to be visible, but it was not"
    },
    {
      "title": "E2E-003: Remove items from cart",
      "suite": "Sauce Demo - End-to-End Flow",
      "error": "Timeout waiting for selector"
    }
  ]
}
```

---

## Key Information Included

### ✅ Who Triggered
- GitHub username who ran the pipeline
- Can be automated (if scheduled) or manual

### ✅ From Which Branch
- Branch name (main, develop, feature/xyz)
- Commit SHA for traceability
- Repository path

### ✅ Test Metrics
- Total count
- Pass/fail/skip breakdown
- Success percentage
- Total duration

### ✅ Failed Tests (if any)
- Test name
- Suite name
- Error message
- Full trace in HTML report

### ✅ Environment
- Playwright version
- TypeScript version
- Browser version
- OS/Node version

### ✅ Artifacts
- Interactive HTML report
- Video recordings
- Screenshots
- JSON summary
- Links to download

---

## How to Access the Report

1. **From Email**
   - Download attached playwright-report.zip
   - Extract folder
   - Open index.html in browser

2. **From GitHub Actions**
   - Go to Actions tab
   - Click pipeline run
   - Scroll to Artifacts
   - Download files

3. **Direct Browser View**
   - GitHub Actions provides browser-viewable artifacts
   - Click artifact from Actions page
   - Some reports may have direct preview

---

## Using the Information

### For Developers
1. Check metrics for performance
2. Review failed tests
3. Fix issues based on errors
4. Re-run pipeline

### For QA/Testers
1. Verify test coverage
2. Analyze failure patterns
3. Update test cases as needed
4. Track quality metrics

### For DevOps/CI-CD
1. Monitor pipeline health
2. Track build success rate
3. Identify flaky tests
4. Optimize test execution

### For Management
1. Get overview of test status
2. Track quality trends
3. Monitor deployment readiness
4. Identify blockers

