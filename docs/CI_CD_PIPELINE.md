# GitHub Actions & CI/CD Pipeline Setup

## Overview

The Playwright framework includes an automated CI/CD pipeline using GitHub Actions that:
- ✅ Runs 14 tests automatically on push
- ✅ Generates HTML reports
- ✅ Sends email notifications
- ✅ Uploads test artifacts
- ✅ Supports daily scheduled runs

---

## Pipeline Configuration

### File Location
```
.github/workflows/playwright-tests.yml
```

### Triggers (When Workflow Runs)

| Trigger | Branches | Description |
|---------|----------|-------------|
| **Push** | main, develop, feature/* | Automatic on code push |
| **Pull Request** | main, develop | On PR creation |
| **Schedule** | main | Daily at 2:00 AM UTC |
| **Manual** | Any | Via GitHub Actions UI |

---

## Setup Steps

### Step 1: Push Code to GitHub

```bash
cd t:\Playwright_Automation

# First time - configure remote
git remote add origin https://github.com/hussain257-git/Playwright-Automation.git

# Push branches
git push origin main
git push origin feature/cicd-pipeline-setup
```

### Step 2: Add GitHub Secrets

Go to: `GitHub Repository → Settings → Secrets and variables → Actions`

![GitHub Secrets](https://github.com/settings/secrets/actions)

Add these 4 secrets:

```
Secret 1:
  Name: EMAIL_SERVER
  Value: smtp.gmail.com

Secret 2:
  Name: EMAIL_PORT
  Value: 587

Secret 3:
  Name: EMAIL_USERNAME
  Value: your-email@gmail.com

Secret 4:
  Name: EMAIL_PASSWORD
  Value: your-app-password
```

**Note**: For Gmail, generate app password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### Step 3: Verify Workflow File

The workflow file `.github/workflows/playwright-tests.yml` should be:
1. ✅ Committed to git: `git add .github/workflows/`
2. ✅ On main branch: `git show main:.github/workflows/playwright-tests.yml`
3. ✅ Pushed to GitHub: `git push origin main`

---

## How to Trigger Pipeline

### Option 1: Automatic Trigger (After Push)
```bash
git push origin main
# Workflow auto-runs in ~30 seconds
```

### Option 2: Manual Trigger from GitHub Web UI

1. Go to: `https://github.com/hussain257-git/Playwright-Automation`
2. Click: **Actions** tab (top navigation)
3. Select: **"Playwright Tests CI/CD Pipeline"** (left sidebar)
4. Click: **"Run workflow"** button (right side)
5. In popup:
   - Branch: Select `main` or `feature/cicd-pipeline-setup`
   - Click: **"Run workflow"**
6. **Status**: 🟡 Running → 🟢 Passed (5-10 minutes)

### Option 3: GitHub CLI

```bash
# Authenticate first time
gh auth login

# Trigger workflow
gh workflow run playwright-tests.yml --ref main

# Watch live
gh run watch
```

---

## Monitoring Execution

### In GitHub Actions Tab

```
Steps completed in order:
1. ✅ Checkout code (30 sec)
2. ✅ Set up Node.js 18 (20 sec)
3. ✅ Install dependencies (30 sec)
4. ⏳ Install Playwright browsers (1 min)
5. ⏳ Run 14 tests (5-7 min)
6. ✅ Generate HTML report (30 sec)
7. ✅ Upload artifacts
8. ✅ Send email notification
```

**Total Duration**: 8-10 minutes

---

## Email Notifications

### Success Email 📧✅

**Recipient**: HussainBasha.Shaik257@outlook.com  
**Subject**: ✅ Playwright Tests PASSED - Pipeline #1  

**Body includes**:
- Status: ALL TESTS PASSED
- Tests run: 14
- Duration: 11 min 45 sec
- Branch information
- Commit hash
- Download links for artifacts

### Failure Email 📧❌

**Recipient**: HussainBasha.Shaik257@outlook.com  
**Subject**: ❌ Playwright Tests FAILED - Pipeline #1  

**Body includes**:
- Status: TESTS FAILED
- Failed count: Number of failures
- Which tests failed
- Debugging tips
- Video/screenshot links
- Artifact download links

---

## Understanding Workflow YAML

### Key Sections

```yaml
name: Playwright Tests CI/CD Pipeline

on:  # Triggers
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 2 * * *'  # Daily 2 AM UTC

jobs:
  test:
    runs-on: windows-latest  # Windows runner
    timeout-minutes: 60      # 1 hour limit per job
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Run tests
        run: npx playwright test
```

---

## Artifacts & Reports

### Download Test Report

1. Go to completed run in GitHub Actions
2. Scroll to **Artifacts** section
3. Download `playwright-report`
4. Extract ZIP file
5. Open `index.html` in browser

### Artifacts Retention

| Artifact | Retention |
|----------|-----------|
| Test Report | 30 days |
| Test Videos | 7 days |

---

## Troubleshooting

### Problem: Workflow not appearing in Actions tab

**Diagnosis**: 
- Workflow file not on main branch
- Syntax error in YAML file
- File not pushed to GitHub

**Solution**:
```bash
# Verify file exists locally
ls -la .github/workflows/

# Commit and push
git add .github/workflows/
git commit -m "Add CI/CD workflow"
git push origin main

# Refresh GitHub page (wait 30 seconds)
# Workflow should appear in Actions tab
```

### Problem: "Run workflow" button is grayed out

**Cause**: Workflow file not on main branch  
**Solution**:
```bash
# Switch to main branch
git checkout main

# Merge feature branch or just push
git push origin main
```

### Problem: Tests fail in CI but pass locally

**Common Causes**:
1. **Different OS**: Test expects Windows paths
2. **Environment variables**: Missing in GitHub secrets
3. **Sauce Demo timing**: CI runner slower than local
4. **Browser cache**: CI has fresh browser each run

**Solution**:
```bash
# Run tests exactly like CI does
npx playwright test tests/ --workers=1 --reporter=html
```

### Problem: Email notifications not received

**Checklist**:
1. ✅ GitHub secrets are configured
2. ✅ Email address is correct in YAML
3. ✅ Gmail allows "Less secure apps"
4. ✅ Check spam folder
5. ✅ Check workflow log for email step error

---

## Customizing Pipeline

### Increase Test Timeout

In workflow YAML, find `Run Playwright tests` step:
```yaml
- name: Run Playwright tests
  run: npx playwright test
  env:
    CI: true
```

Change if needed:
```bash
npx playwright test --timeout=120000  # 120 seconds
```

### Add Slack Notifications

Add new step before email notification:
```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Run Tests in Parallel

Change in workflow YAML:
```yaml
- name: Run Playwright tests
  run: npx playwright test --workers=4  # 4 parallel workers
```

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Add GitHub Secrets
3. ✅ Trigger workflow manually
4. ✅ Check email for results
5. ✅ Download HTML report
6. ✅ Set up scheduling for daily runs

---

*For more help: [Playwright Documentation](https://playwright.dev) | [GitHub Actions Docs](https://docs.github.com/actions)*
