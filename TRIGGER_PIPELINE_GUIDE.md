# GitHub Actions Pipeline - How to Trigger & Run Tests

## 🎯 Quick Overview

Your framework is configured to run **Chrome (Chromium) only**. The GitHub Actions pipeline is ready to be triggered from the Actions tab.

---

## Step 1: Push Code to GitHub

**Prerequisites:**
- GitHub CLI installed (recommended) or Git with authentication
- GitHub account access to: https://github.com/hussain257-git/Playwright-Automation

### Option A: Using GitHub CLI (Easiest) ⭐

```powershell
# 1. Authenticate with GitHub (first time only)
gh auth login
# Follow the prompts to authorize

# 2. Navigate to project
cd t:\Playwright_Automation

# 3. Push main branch
git push origin main

# 4. Push feature branch
git push origin feature/cicd-pipeline-setup

# Done! Check: gh repo view --web
```

### Option B: Using Git with HTTPS

```powershell
# 1. Create Personal Access Token
# Go to: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
# Create with scopes: repo, workflow
# Copy the token

# 2. Configure Git to cache credentials
git config --global credential.helper wincred

# 3. Push (will prompt for username + token)
cd t:\Playwright_Automation
git push origin main
git push origin feature/cicd-pipeline-setup

# When prompted:
# Username: hussain257-git
# Password: ghp_YOUR_TOKEN_HERE
```

### Option C: Using SSH

```bash
# 1. Generate SSH key (if not already done)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 2. Add SSH key to GitHub account
# GitHub Settings → SSH and GPG keys → New SSH key

# 3. Test SSH connection
ssh -T git@github.com

# 4. Configure remote to use SSH
git remote set-url origin git@github.com:hussain257-git/Playwright-Automation.git

# 5. Push
cd t:\Playwright_Automation
git push origin main
git push origin feature/cicd-pipeline-setup
```

---

## Step 2: Configure GitHub Secrets (Required for Email)

**Must be done BEFORE first workflow run:**

1. Go to: **GitHub.com → Your Repository**
2. Click: **Settings** (top right)
3. Left sidebar: **Secrets and variables** → **Actions**
4. Click: **New repository secret**

Add these 4 secrets:

### Secret #1: EMAIL_SERVER
- **Name**: `EMAIL_SERVER`
- **Value**: `smtp.gmail.com` (for Gmail)
- Click: **Add secret**

### Secret #2: EMAIL_PORT
- **Name**: `EMAIL_PORT`
- **Value**: `587`
- Click: **Add secret**

### Secret #3: EMAIL_USERNAME
- **Name**: `EMAIL_USERNAME`
- **Value**: Your email address
- Click: **Add secret**

### Secret #4: EMAIL_PASSWORD
- **Name**: `EMAIL_PASSWORD`
- **Value**: Your app-specific password
- Click: **Add secret**

**For Gmail:**
- Enable 2FA: myaccount.google.com/security
- Generate App Password: myaccount.google.com/apppasswords
- Use the 16-char password here

---

## Step 3: Trigger Workflow from Actions Tab

### Method 1: Automatic Trigger (Recommended)

After pushing, the workflow automatically runs when:
- ✅ You push to `main` branch
- ✅ You push to `develop` branch
- ✅ You push to `feature/*` branches
- ✅ You create a Pull Request to `main`
- ✅ Daily schedule (2:00 AM UTC)

**To See Results:**
1. Go to: **GitHub.com → Your Repository**
2. Click: **Actions** tab (top navigation)
3. You should see: **"Playwright Tests CI/CD Pipeline"** workflow running
4. Wait for completion (check status indicator)
5. Click on the run to see details

### Method 2: Manual Trigger from Actions Tab

```
1. Go to: Your Repository → Actions tab
2. Select: "Playwright Tests CI/CD Pipeline" (left sidebar)
3. Click: "Run workflow" (blue button, right side)
4. Choose branch: Feature/main (dropdown)
5. Click: "Run workflow" button
6. Watch it execute in real-time
```

**Step-by-Step Screenshots:**

```
┌─ GitHub Repository ────────────────────┐
│                                        │
│  Code | Issues | Pull | Actions ← CLICK
│       |        | requests |          │
│                                        │
└────────────────────────────────────────┘

                    ↓

┌─ Actions Tab ──────────────────────────┐
│                                        │
│ Left Sidebar:                         │
│ • All workflows                       │
│ • Playwright Tests CI/CD Pipeline ←   │
│                                        │
│ Right Side:                           │
│ [Run workflow ▼] ← CLICK HERE         │
│                                        │
└────────────────────────────────────────┘

                    ↓

┌─ Select Branch ────────────────────────┐
│                                        │
│ Branch: [feature/cicd-pipeline-setup] │
│          (or choose main)              │
│                                        │
│ [Run workflow]                        │
│                                        │
└────────────────────────────────────────┘

                    ↓ WORKFLOW STARTS

┌─ Live Execution ───────────────────────┐
│ ⏳ Playwright Tests CI/CD Pipeline      │
│                                        │
│ ✓ Checkout code                       │
│ ✓ Set up Node.js                      │
│ ✓ Install dependencies                │
│ ✓ Install Playwright                  │
│ ⏳ Run Playwright tests...             │
│ ⏳ Generate HTML report                │
│ ⏳ Send email notification             │
│                                        │
└────────────────────────────────────────┘
```

---

## Step 4: Monitor Test Execution

### During Execution (Live)

```
1. Go to: Actions → Playwright Tests CI/CD Pipeline
2. You'll see the current run at the top
3. Status indicators:
   • 🟡 Yellow = Running
   • 🟢 Green = Passed
   • 🔴 Red = Failed
4. Click on the run to see real-time logs
```

### After Execution Complete

**View Results:**
```
1. Click on the completed workflow run
2. Scroll down to see:
   • Job status (passed/failed)
   • Test execution logs
   • Artifact downloads
3. Download artifacts:
   • playwright-report (HTML results)
   • test-videos (failure recordings)
```

**View HTML Report:**
```
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Download "playwright-report"
4. Extract ZIP file
5. Open "index.html" in browser
6. View interactive test results
```

---

## Step 5: Check Email Notification

### Success Email 📧✅
```
Subject: ✅ Playwright Tests PASSED - Pipeline #1

Arrives when: All tests pass

Contains:
• Test execution summary
• Branch & commit info
• Duration
• Artifact download links
```

### Failure Email 📧❌
```
Subject: ❌ Playwright Tests FAILED - Pipeline #1

Arrives when: Any test fails

Contains:
• Failed test details
• Error messages
• Debugging steps
• Screenshot links
```

**Email to**: HussainBasha.Shaik257@outlook.com

---

## Browser Configuration

### Current: Chrome Only ✅

```typescript
// playwright.config.ts

projects: [
  {
    name: "chromium",  // ← CHROME ONLY
    use: { ...devices["Desktop Chrome"] },
  },
  // Other browsers commented out
]
```

### To Add Other Browsers (Optional)

Edit `playwright.config.ts` and uncomment:

```typescript
projects: [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
  {
    name: "firefox",  // ← UNCOMMENT TO ADD
    use: { ...devices["Desktop Firefox"] },
  },
  {
    name: "webkit",   // ← UNCOMMENT TO ADD
    use: { ...devices["Desktop Safari"] },
  },
]
```

---

## Troubleshooting Pipeline Issues

### Issue: Workflow doesn't appear in Actions tab
```
✅ Solution: You must push code to GitHub first
   Run: git push origin main
```

### Issue: "Run workflow" button is grayed out
```
✅ Solution: Workflow file not found on GitHub
   Check: .github/workflows/playwright-tests.yml exists
```

### Issue: Workflow fails with "Module not found"
```
✅ Solution: Dependencies not installed
   Workflow will auto-install with: npm ci
```

### Issue: Email not received
```
✅ Solution: Check GitHub Secrets configuration
   Verify all 4 secrets are added correctly
   Check email spam folder
```

### Issue: Tests timeout in workflow
```
✅ Solution: Increase timeout in playwright.config.ts
   Current: timeout: 30_000 (30 seconds per test)
   Change to: timeout: 60_000 (60 seconds)
```

### Issue: "Repository not found" on push
```
✅ Solution: Check remote URL
   Run: git remote -v
   Should show: https://github.com/hussain257-git/Playwright-Automation.git
```

---

## Test Execution Details

### What Runs:
```
✅ 6 Authentication Tests (tests/auth/login.spec.ts)
   - Login with valid credentials
   - Locked out user error handling
   - Multi-user login cycle
   - Empty username validation
   - Empty password validation
   - Logout flow

✅ 3 End-to-End Tests (tests/e2e.spec.ts)
   - Complete purchase flow
   - Browse & add to cart
   - Add/remove items

✅ 2 Verification Tests (tests/verification.spec.ts)
   - GitHub homepage
   - Example.com
```

### Duration:
```
Single Worker (Sequential):  ~9-10 minutes
Multiple Workers (Parallel): ~3-4 minutes (CI uses 4 workers)
```

### Reports Generated:
```
✅ HTML Report: playwright-report/index.html
✅ JSON Results: test-results.json
✅ Screenshots: On failure only
✅ Videos: On failure only
```

---

## Complete Workflow: START TO FINISH

```
Step 1: Push Code
   $ git push origin main
   └─→ Takes 10-30 seconds

Step 2: GitHub detects push
   └─→ Automatic (instant)

Step 3: Workflow auto-triggers
   └─→ Status: 🟡 Running

Step 4: Tests execute
   Steps:
   • Checkout code (10s)
   • Install Node (20s)
   • Install dependencies (30s)
   • Install browsers (60s on first run)
   • Run 11 tests (3-5 min)
   • Generate reports (30s)
   • Upload artifacts (20s)
   └─→ Total: ~5-10 minutes

Step 5: Email notification sent
   └─→ Instant (after workflow completes)

Step 6: Review results
   • Check email for summary
   • Go to Actions tab to see details
   • Download artifacts for full report
```

---

## Quick Reference Commands

```powershell
# Check git status
cd t:\Playwright_Automation
git status

# View branches
git branch -a

# View remote
git remote -v

# Push main branch
git push origin main

# Push feature branch
git push origin feature/cicd-pipeline-setup

# View recent commits
git log --oneline -5

# Check GitHub CLI
gh auth status

# Open repository in browser
gh repo view --web
```

---

## Are Tests Running Fine?

**After workflow completes, check:**

✅ **All tests passed**: 11/11 ✓
```
Expected result:
• 6 auth tests PASS
• 3 E2E tests PASS
• 2 verification tests PASS
```

✅ **HTML Report generated**: Look for link in Actions
```
Download and open: playwright-report/index.html
```

✅ **Email notification received**: At HussainBasha.Shaik257@outlook.com
```
Subject: ✅ Playwright Tests PASSED - Pipeline #X
```

✅ **No failures or timeouts**: Check workflow logs
```
Steps should all show ✓ (green checkmarks)
```

---

## Next: Actually Trigger It!

### Summary of Commands to Run NOW:

**1. Push to GitHub** (one-time setup)
```powershell
cd t:\Playwright_Automation

# Option A: Using GitHub CLI (Easiest)
gh auth login
git push origin main
git push origin feature/cicd-pipeline-setup

# Option B: Using Git with Token
git config --global credential.helper wincred
git push origin main
git push origin feature/cicd-pipeline-setup
```

**2. Add GitHub Secrets** (one-time setup)
Go to: GitHub → Repository Settings → Secrets → Add:
- EMAIL_SERVER: smtp.gmail.com
- EMAIL_PORT: 587
- EMAIL_USERNAME: your-email
- EMAIL_PASSWORD: app-password

**3. Trigger Workflow** (can do anytime)
Go to: GitHub Actions → "Playwright Tests CI/CD Pipeline" → "Run workflow"

**4. Monitor Results**
Go to: GitHub Actions → See workflow running
Wait for completion (5-10 minutes)

**5. Check Email**
Look for: ✅ PASSED email (within 1 minute of completion)

---

## 🎬 Ready to Go?

You have everything configured! Just:
1. Push code (git push)
2. Add 4 secrets
3. Trigger from Actions tab
4. Wait for email

**It's that simple!** 🚀

---

**Questions?** Check [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for more details.
