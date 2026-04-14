# 📋 Complete Workflow Trigger & Test Execution Guide

## ✅ Configuration Status

### Browser: Chrome Only ✅
```
✓ Chromium (Chrome) enabled
✗ Firefox disabled
✗ WebKit disabled  
✗ Mobile disabled

Result: 14 tests run in Chrome only
```

### Timeout: 60 seconds ✅
```
Updated from: 30 seconds (was too short)
Updated to: 60 seconds (more stable)
Reason: Sauce Demo website can be slow

File: playwright.config.ts
```

---

## 🚀 3 Ways to Trigger Pipeline

### **Way 1: Automatic Trigger (After Push)** ⭐ Easiest

**When it triggers automatically:**
- ✓ You push to `main` branch
- ✓ You push to `develop` branch  
- ✓ You push to `feature/*` branch
- ✓ You create Pull Request to `main`
- ✓ Daily at 2:00 AM UTC

**Steps:**
```powershell
cd t:\Playwright_Automation
gh auth login  # (first time only)
git push origin main
git push origin feature/cicd-pipeline-setup

# Done! Workflow will auto-trigger
# Check: GitHub Actions tab → See job running
```

---

### **Way 2: Manual Trigger from GitHub Web**  ⭐ Recommended

**Steps:**

1. Go to GitHub repository
   ```
   https://github.com/hussain257-git/Playwright-Automation
   ```

2. Click **Actions** tab (top navigation)
   ```
   Code | Issues | Pull | Actions ← Click here
   ```

3. Select workflow (left sidebar)
   ```
   Left menu:
   • All workflows
   • Playwright Tests CI/CD Pipeline ← Select this
   ```

4. Click **Run workflow** button (right side)
   ```
   [Run workflow ▼] ← This blue button
   ```

5. Choose branch when popup appears
   ```
   Branch: [feature/cicd-pipeline-setup ▼]
   Or select: main
   
   [Run workflow] ← Click to start
   ```

6. **DONE! Watch it execute**
   ```
   Status changes from 🟡 Running to 🟢 Passed
   Duration: 5-10 minutes
   ```

---

### **Way 3: Manual Trigger Using GitHub CLI**

```powershell
# Requires GitHub CLI installed
# https://cli.github.com

# First time: Authenticate
gh auth login

# Trigger workflow on main branch
gh workflow run playwright-tests.yml --ref main

# Or trigger on feature branch
gh workflow run playwright-tests.yml --ref feature/cicd-pipeline-setup

# View workflow status
gh run view --repo hussain257-git/Playwright-Automation

# Watch live
gh run watch --repo hussain257-git/Playwright-Automation
```

---

## 📊 Test Execution Details

### Total Tests ✅
```
14 tests total (Chrome only)

Breakdown:
├─ 6 Authentication tests
│  ├─ TC-001: Valid login
│  ├─ TC-002: Locked out user
│  ├─ TC-003: Multi-user cycle  
│  ├─ TC-004: Empty username
│  ├─ TC-005: Empty password
│  └─ TC-006: Logout
│
├─ 3 End-to-End tests
│  ├─ E2E-001: Complete purchase
│  ├─ E2E-002: Browse without checkout
│  └─ E2E-003: Add/remove items
│
└─ 5 Verification tests
   └─ Framework validation tests
```

### Execution Timeline ⏱️
```
Total Duration: 8-12 minutes

Breakdown:
├─ Checkout code: 10 seconds
├─ Set up Node.js: 20 seconds
├─ Install dependencies: 30 seconds
├─ Install browsers: 1 minute (first run)
├─ Run tests: 5-7 minutes (main time)
├─ Generate reports: 30 seconds
└─ Send email: 10 seconds
```

### Expected Results ✅
```
All 14 tests should PASS:

✓ 6/6 Authentication tests 
✓ 3/3 End-to-End tests
✓ 5/5 Verification tests
─────────────────────────────
✓ 14/14 PASS
```

---

## 📧 Email Notifications

### You'll Receive (After workflow completes):

**Success Email** (Within 1 minute)
```
To: HussainBasha.Shaik257@outlook.com
From: GitHub Actions
Subject: ✅ Playwright Tests PASSED - Pipeline #1

Body includes:
• Status: ALL TESTS PASSED
• Total tests: 14
• Duration: 11 min 45 sec
• Branch: main
• Commit: abc123...
• Artifacts: Download links
```

**Failure Email** (If any test fails)
```
To: HussainBasha.Shaik257@outlook.com
From: GitHub Actions
Subject: ❌ Playwright Tests FAILED - Pipeline #2

Body includes:
• Status: TESTS FAILED
• Failed count: 1
• Error details: [test name] failed
• Debugging tips
• Artifact links for screenshots/videos
```

---

## 🎯 Step-by-Step: FROM START TO FINISH

### **Step 1: Push Code to GitHub** (First Time)

```powershell
cd t:\Playwright_Automation

# Option A: Using GitHub CLI (Easiest)
gh auth login
git push origin main
git push origin feature/cicd-pipeline-setup

# Option B: Using Git (will prompt for credentials)
git config --global credential.helper wincred
git push origin main
git push origin feature/cicd-pipeline-setup
```

**Time: 30 seconds**

---

### **Step 2: Add GitHub Secrets** (First Time Only)

Go to GitHub repository:
```
Settings → Secrets and variables → Actions → New repository secret
```

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

**Time: 2 minutes**

**Note:** For Gmail, generate app password at: myaccount.google.com/apppasswords

---

### **Step 3: Trigger Workflow from Actions**

Go to GitHub repository:
```
Actions → "Playwright Tests CI/CD Pipeline" → Run workflow
```

**In popup:**
```
Branch: [main] or [feature/cicd-pipeline-setup]
Click: [Run workflow]
```

**Time: 30 seconds**

---

### **Step 4: Monitor Execution**

Go to Actions tab and watch:
```
Status: 🟡 Running (with percentage progress)
Time: 5-10 minutes

You'll see:
✓ Checkout code
✓ Set up Node.js
✓ Install dependencies
✓ Install browsers
⏳ Run Playwright tests (main execution)
⏳ Generate reports
⏳ Send emails
```

**Time: Automatic (no action needed)**

---

### **Step 5: Check Results**

**Option A: Check Email** (Instant)
```
Look for email at: HussainBasha.Shaik257@outlook.com
Subject: ✅ Playwright Tests PASSED - Pipeline #1
```

**Option B: View HTML Report** (Manual)
```
1. Go to GitHub → Actions → Completed run
2. Scroll to "Artifacts" section
3. Download "playwright-report"
4. Extract ZIP → Open index.html in browser
5. View interactive test dashboard
```

**Option C: Check GitHub Actions** (Live)
```
1. Go to GitHub → Actions → Completed run
2. Click "test [Windows]" job
3. Scroll through execution log
4. See all test results
```

**Time: 1-2 minutes**

---

## 🔍 How to Know If Tests Are Running Fine

### ✅ Success Indicators:
```
• Workflow status shows: ✅ Passed (green)
• All 14 tests listed as ✓
• Email received: "PASSED" subject
• HTML report downloads successfully
• No red X marks or failures
```

### ❌ Problem Indicators:
```
• Workflow status shows: ❌ Failed (red)
• Some tests show X or ⚠️
• Email received: "FAILED" subject
• Error messages in logs
• Job marked as interrupted
```

### 🆘 If Tests Fail:

1. **Check the error message** in Actions logs
2. **Download screenshots** from artifacts
3. **Review HTML report** for details
4. **Check Sauce Demo website** - sometimes it's down
5. **Increase timeout** if tests timeout (already done: 60 seconds)

---

## 📋 Before You Trigger

### Checklist:

- [ ] Code pushed to GitHub
- [ ] 4 GitHub Secrets added
- [ ] You're authenticated to GitHub
- [ ] Repository is accessible
- [ ] Actions tab shows the workflow
- [ ] Email configured correctly

### Verification:

```bash
# Check git status
cd t:\Playwright_Automation
git log --oneline -1
# Should show: "Increase test timeout..."

# Check branches
git branch -r
# Should show: origin/main, origin/feature/cicd-pipeline-setup

# Check remote
git remote -v
# Should show: https://github.com/hussain257-git/Playwright-Automation.git
```

---

## 💡 Pro Tips

### Tip 1: First Push Auto-Triggers Workflow
```
Don't need to manually trigger after initial push
Just: git push → workflow auto-runs
```

### Tip 2: View Live Logs
```
Actions → Workflow → Click "test" job → See real-time logs
Refreshes every few seconds
```

### Tip 3: Download Artifacts for Analysis
```
Artifacts available for 30 days
Good for retrospective analysis
```

### Tip 4: Set Up Smart Notifications
```
GitHub Settings → Notifications → Configure when to notify
Choose: "Only notify me of failures and cancellations"
```

### Tip 5: Re-run Failed Tests
```
If a test fails:
1. Go to that workflow run
2. Click "Re-run failed jobs"
3. It re-runs only the failed test
4. Much faster than full run
```

---

## 🎬 Quick Start: ONE COMMAND PER STEP

### Step 1: Push code
```powershell
cd t:\Playwright_Automation && gh auth login && git push origin main
```

### Step 2: Add secrets
```
Go to: GitHub Settings → Secrets → Add 4 secrets manually
(Can't automate this - GitHub security)
```

### Step 3: Trigger workflow
```
Go to: GitHub Actions tab → Click "Run workflow"
(Can't automate from local machine)
```

### Step 4: Wait for results
```
✅ Email arrives automatically
⏰ Typical wait: 10 minutes
```

---

## 🆘 Troubleshooting

### Problem: "Workflow doesn't appear in Actions tab"
**Solution:**
```
1. Refresh GitHub page (F5)
2. Check: .github/workflows/playwright-tests.yml exists on GitHub
3. Push: git push origin feature/cicd-pipeline-setup
4. Wait 1-2 minutes for sync
```

### Problem: "Run workflow button is grayed out"
**Solution:**
```
1. Workflow file must be on main branch
2. Check: Actions tab shows "No workflows yet"
3. Merge or push to main branch
4. It should appear then
```

### Problem: "Tests timeout"
**Solution:**
```
✓ Already fixed! Timeout increased to 60 seconds
✓ Configure in: playwright.config.ts (timeout: 60_000)
```

### Problem: "Email not received"
**Solution:**
```
1. Check spam/junk folder
2. Verify secrets are correct
3. Check workflow logs for email errors
4. Add email provider to safe senders
```

### Problem: "GitHub auth fails"
**Solution:**
```
# Using GitHub CLI
gh auth logout
gh auth login

# Using Git (HTTPS)
git config --global credential.helper wincred
git credential-manager approve  # Clear cache
```

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| Playwright Docs | https://playwright.dev |
| GitHub Actions | https://docs.github.com/actions |
| Sauce Demo | https://www.saucedemo.com |
| GitHub CLI | https://cli.github.com |

---

## ✨ Summary

### Your Pipeline:
✅ Configured for Chrome only  
✅ Timeout set to 60 seconds  
✅ 14 tests ready to run  
✅ Email notifications ready  
✅ 3 trigger methods available  

### Ready to:
✅ Push code  
✅ Add secrets  
✅ Trigger workflow  
✅ Run tests  
✅ Get results  

### Next Action:
👉 **Trigger the workflow from Actions tab!**

---

**Everything is set up. Your pipeline is ready. Fire it up!** 🚀
