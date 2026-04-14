# Pipeline Email Reporting - Enhancement Guide

## Overview
The GitHub Actions pipeline has been enhanced to send detailed test execution reports via email with comprehensive metrics, test results, and actionable information.

## Email Contents

### On SUCCESS ✅
Emails sent on successful test runs include:

**Pipeline Information:**
- Repository name
- Branch name (who triggered and from which branch)
- Who triggered the pipeline (GitHub actor/username)
- Commit SHA
- Pipeline Run ID
- Event type (push, pull_request, schedule)
- Execution timestamp

**Test Metrics:**
```
- Total Test Cases: [Count]
- ✅ Passed: [Count]
- ❌ Failed: 0
- ⏭️ Skipped: [Count]
- 🔨 Broken: 0
- Pass Rate: [Percentage]
- Total Duration: [Seconds]
```

**Test Suites Summary:**
- Authentication Tests (6 cases): PASSED ✅
- End-to-End Tests (3 cases): PASSED ✅
- Framework Verification (2 cases): PASSED ✅

**Artifacts Generated:**
- Playwright Report (HTML)
- Test Screenshots
- Test Videos
- Test Results JSON

**Attachments:**
- Full Playwright HTML Report (30-day retention)

---

### On FAILURE ❌
Emails sent on failed test runs include:

**Pipeline Information:**
- Repository name
- Branch name
- Who triggered and from which branch
- Commit SHA
- Pipeline Run ID
- Event type
- Execution timestamp

**Test Metrics:**
```
- Total Test Cases: [Count]
- ✅ Passed: [Count]
- ❌ Failed: [Count]
- ⏭️ Skipped: [Count]
- 🔨 Broken: [Count]
- Pass Rate: [Percentage]
- Total Duration: [Seconds]
```

**Failed Test Cases List:**
- ❌ Suite Name: Test Case Name
- Error details attached

**What to Do:**
1. Review failed tests in HTML report
2. Check screenshots in test-results/
3. Review video recordings
4. Read error messages in test-summary.json
5. Check full logs in Actions console
6. Run tests locally to reproduce

**Debugging Steps:**
```bash
npm test                           # Run all tests
npx playwright test --debug        # Debug mode
npx playwright test --trace on     # Generate trace
npx playwright show-trace trace.zip # View trace
```

**Quick Fixes:**
```bash
npm run test:ui      # Update selectors
npm run clean        # Clear cache
npm ci               # Reinstall dependencies
npm update @playwright/test  # Update Playwright
```

**Attachments:**
- Playwright Report (HTML)
- Test Videos (7-day retention)
- Test Screenshots
- Test Summary (JSON - metrics)

---

## File Structure

### New Files Added

1. **scripts/generate-test-summary.js**
   - Parses `test-results.json`
   - Generates detailed metrics
   - Outputs `test-summary.json`
   - Calculates pass rate, fail rate, duration

### Updated Files

1. **.github/workflows/playwright-tests.yml**
   - Enhanced email notifications (success & failure)
   - Added test summary parsing
   - Added metrics display
   - Improved artifact attachments

2. **playwright.config.ts**
   - Added JUnit reporter
   - Added GitHub reporter
   - Improved logging

---

## Test Summary JSON Structure

The `test-summary.json` file contains:

```json
{
  "totalTests": 11,
  "passed": 11,
  "failed": 0,
  "skipped": 0,
  "broken": 0,
  "passRate": "100.00",
  "failRate": "0.00",
  "totalDuration": "45.32",
  "suites": [
    {
      "name": "Suite Name",
      "tests": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0,
      "broken": 0
    }
  ],
  "failedTests": [
    {
      "title": "Test Name",
      "suite": "Suite Name",
      "error": "Error message"
    }
  ]
}
```

---

## Email Trigger Conditions

### SUCCESS Email Triggered When:
- All tests pass
- No failed test cases
- Pipeline completes successfully

### FAILURE Email Triggered When:
- Any test fails
- Pipeline throws errors
- Tests timeout
- Broken test detected

---

## Information Included in Emails

### Who Triggered
- `${{ github.actor }}` - GitHub username who triggered
- `${{ github.event_name }}` - Event type:
  - `push` - Direct push to branch
  - `pull_request` - PR opened/updated
  - `schedule` - Scheduled cron job
  - `workflow_dispatch` - Manual trigger

### Which Branch
- `${{ github.ref_name }}` - Branch name (main, develop, feature/xyz)
- Commit SHA included for traceability
- Repository URL for navigation

### When
- Timestamp in ISO format
- Run duration
- Start and end times (in logs)

### Test Results
- Total test count
- Pass/Fail breakdown
- Skipped tests
- Broken tests
- Pass rate percentage
- Total execution time

### Artifacts
- HTML Report (interactive, can view directly)
- Test videos (MP4 format)
- Screenshots (PNG format)
- Test logs (text format)

---

## How to Use

### 1. View Full Pipeline
Click the pipeline link in email to see:
- Step-by-step logs
- Console output
- Detailed error traces
- Real-time updates

### 2. Download Artifacts
From Actions page:
- Click "Artifacts" section
- Download playwright-report
- Download test-results
- Download test-summary.json

### 3. View HTML Report
- Extract playwright-report.zip
- Open index.html in browser
- Interactive test results
- Screenshots for failed tests
- Trace viewer for debugging

### 4. Local Reproduction
Use commands in email to:
- Run tests locally: `npm test`
- Debug specific test: `npx playwright test --debug`
- Generate trace: `npx playwright test --trace on`

---

## Email Configuration

### Email Settings
The email is configured in `.github/workflows/playwright-tests.yml`:

**Recipients:**
```yaml
to: HussainBasha.Shaik257@outlook.com
```

**Send Method:**
```yaml
uses: dawidd6/action-send-mail@v3
```

**Required Secrets:**
- `EMAIL_SERVER` - SMTP server address
- `EMAIL_PORT` - SMTP port (usually 587)
- `EMAIL_USERNAME` - Sender email
- `EMAIL_PASSWORD` - Sender password

### Setup Instructions
1. Go to GitHub repo Settings → Secrets & variables → Actions
2. Add the following secrets:
   - EMAIL_SERVER (e.g., smtp.gmail.com)
   - EMAIL_PORT (e.g., 587)
   - EMAIL_USERNAME (your email)
   - EMAIL_PASSWORD (app password, not regular password)

---

## Customization Options

### Change Email Recipient
Edit `.github/workflows/playwright-tests.yml`:
```yaml
to: your-email@example.com
```

### Change Email Subject
```yaml
subject: "My Custom Subject"
```

### Add More Metrics
Edit `scripts/generate-test-summary.js`:
- Add new fields to summary object
- Parse additional Playwright metrics
- Calculate custom statistics

### Change Report Format
Edit `playwright.config.ts`:
- Add/remove reporters
- Change output folders
- Modify report styling

---

## Troubleshooting

### Email Not Received
1. Check email secrets are configured
2. Verify SMTP settings (use Gmail with App Password)
3. Check GitHub Actions logs for errors
4. Verify email address is correct

### Test Summary Not Generated
1. Ensure `test-results.json` exists
2. Check Node.js version compatibility
3. Verify test-summary.js has execution permissions
4. Check for JSON parsing errors in logs

### Artifacts Not Attaching
1. Verify `playwright-report/` directory exists
2. Check file permissions
3. Ensure total attachment size < email limit
4. Check email server limits

### Metrics Not Showing
1. Run `npm test` locally first to generate results
2. Verify test framework compatibility
3. Check Playwright version
4. Validate test-results.json format

---

## Best Practices

1. **Regular Monitoring**: Check pipeline emails regularly
2. **Fix Quickly**: Address failures promptly
3. **Review Metrics**: Track pass rate trends
4. **Analyze Patterns**: Look for flaky tests
5. **Update Tests**: Keep tests aligned with UI changes
6. **Maintain Reports**: Archive important reports
7. **Document Changes**: Note branch/commit in records

---

## Next Steps

1. Run pipeline in GitHub Actions
2. Check email for detailed metrics
3. Download Playwright HTML report
4. Analyze test results
5. Address any failed tests
6. Re-run pipeline as needed

