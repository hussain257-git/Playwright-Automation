# GitHub Actions - Setup Guide

## 🚀 Enable CI/CD Pipeline with Email Notifications

This guide explains how to set up GitHub Actions for automated testing and email notifications.

---

## Step 1: Configure GitHub Secrets

GitHub Actions needs email credentials stored as secrets. Follow these steps:

### 1.1 Go to Repository Settings
1. Navigate to your GitHub repository
2. Click **Settings** (top right)
3. In left sidebar, click **Secrets and variables** → **Actions**

### 1.2 Add Email Server Secrets

Click **New repository secret** and add these four secrets:

#### Secret #1: EMAIL_SERVER
- **Name**: `EMAIL_SERVER`
- **Value**: `smtp.gmail.com` (for Gmail) or your email provider's SMTP server
- **Click**: Add secret

#### Secret #2: EMAIL_PORT
- **Name**: `EMAIL_PORT`
- **Value**: `587` (for Gmail) or your provider's port
- **Click**: Add secret

#### Secret #3: EMAIL_USERNAME
- **Name**: `EMAIL_USERNAME`
- **Value**: Your email address (e.g., `your-email@gmail.com`)
- **Click**: Add secret

#### Secret #4: EMAIL_PASSWORD
- **Name**: `EMAIL_PASSWORD`
- **Value**: Your email password or app-specific password
- **Click**: Add secret

---

## Step 2: Gmail Setup (Recommended)

### For Gmail Users:

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
   - Use this as EMAIL_PASSWORD secret

3. **Gmail SMTP Settings**
   - EMAIL_SERVER: `smtp.gmail.com`
   - EMAIL_PORT: `587`
   - EMAIL_USERNAME: Your Gmail address
   - EMAIL_PASSWORD: The app password (from step 2)

---

## Step 3: Alternative Email Providers

### Microsoft Outlook/Hotmail
```
EMAIL_SERVER: smtp-mail.outlook.com
EMAIL_PORT: 587
EMAIL_USERNAME: your-email@outlook.com
EMAIL_PASSWORD: your-password
```

### Yahoo Mail
```
EMAIL_SERVER: smtp.mail.yahoo.com
EMAIL_PORT: 587
EMAIL_USERNAME: your-email@yahoo.com
EMAIL_PASSWORD: your-app-password
```

### Office 365
```
EMAIL_SERVER: smtp.office365.com
EMAIL_PORT: 587
EMAIL_USERNAME: your-email@yourcompany.com
EMAIL_PASSWORD: your-password
```

---

## Step 4: Verify Secrets Setup

After adding all 4 secrets, you should see:
```
✓ EMAIL_SERVER
✓ EMAIL_PORT
✓ EMAIL_USERNAME
✓ EMAIL_PASSWORD
```

---

## Step 5: Push Code and Trigger Pipeline

### First Push (Create Branch)
```bash
# Navigate to project
cd t:\Playwright_Automation

# Create new branch
git checkout -b feature/ci-cd-setup

# Add all changes
git add .

# Commit changes
git commit -m "Add GitHub Actions CI/CD pipeline with email notifications"

# Push to GitHub
git push origin feature/ci-cd-setup

# Create Pull Request on GitHub
```

### View Pipeline Execution
1. Go to your GitHub repository
2. Click **Actions** tab (top)
3. You should see "Playwright Tests CI/CD Pipeline" workflow running
4. Wait for completion
5. Email notification should arrive at HussainBasha.Shaik257@outlook.com

---

## 📧 Email Notifications

### When You'll Receive Emails:

1. **On Success** ✅
   - Subject: `✅ Playwright Tests PASSED - Pipeline #123`
   - Contains: Test summary, branch info, commit details
   - Artifacts link available

2. **On Failure** ❌
   - Subject: `❌ Playwright Tests FAILED - Pipeline #123`
   - Contains: Failure reasons, debugging steps
   - Screenshots & videos available for download

### Email Customization

To change recipient email, edit `.github/workflows/playwright-tests.yml`:

```yaml
- name: Send email notification on success
  if: success()
  uses: dawidd6/action-send-mail@v3
  with:
    ...
    to: your-email@example.com  # ← Change this line
    ...
```

---

## 🔄 Pipeline Triggers

Tests run automatically when:

1. **Push to main branch** - Full test run
2. **Push to develop branch** - Full test run
3. **Push to feature/* branch** - Full test run
4. **Pull Request to main** - Full test run
5. **Daily schedule** - 2:00 AM UTC every day (automated)

### Manual Trigger

To run tests manually:
1. Go to **Actions** tab
2. Click **Playwright Tests CI/CD Pipeline**
3. Click **Run workflow** dropdown
4. Click **Run workflow** button

---

## 📊 Pipeline Workflow

```
┌─ Code Push ─┐
│             │
├─ Checkout ──┤
│             │
├─ Node Setup ┤
│             │
├─ npm install ┤
│             │
├─ Install Browsers ┤
│             │
├─ Run Tests ──┤
│             │
├─ Generate Reports ┤
│             │
├─ Upload Artifacts ┤
│             │
├─ Send Email ──┤
│             │
└─ Complete ──┘
```

---

## 🎯 Test Results Location

### In GitHub:
1. Go to **Actions** tab
2. Click on the specific run
3. See test results and logs

### Artifacts (Available 30 days):
- Click workflow run
- Scroll down to **Artifacts** section
- Download:
  - `playwright-report` (HTML test report)
  - `test-videos` (failure videos)

### View HTML Report Online:
1. Download `playwright-report` artifact
2. Extract zip file
3. Open `index.html` in browser
4. View interactive test results

---

## 🐛 Troubleshooting

### Issue: Email not received
**Solution**: 
1. Check secrets are correctly added
2. Verify email credentials are correct
3. Check spam/junk folder
4. Check GitHub Actions logs for SMTP errors

### Issue: Pipeline fails on browser installation
**Solution**:
1. This is normal on first run (downloads 200MB+)
2. Will cache on subsequent runs
3. Increase timeout if needed

### Issue: Tests timeout
**Solution**:
1. Increase timeout in workflow file (currently 60 minutes)
2. Check if Sauce Demo website is accessible
3. Run tests locally first to debug

### Issue: Authentication failed
**Solution**:
1. Verify Sauce Demo credentials in `test-data/users.json`
2. Ensure valid users (standard_user, problem_user, etc.)
3. Password should be: `secret_sauce`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] All 4 GitHub Secrets are added
- [ ] Branch created and pushed
- [ ] GitHub Actions workflow triggered
- [ ] Tests executed successfully
- [ ] Email notification received
- [ ] Test report generated

---

## 📚 Example Results

### Success Email
```
Status: ✅ ALL TESTS PASSED
Tests Run: 11
Duration: ~2 minutes
Branch: feature/ci-cd-setup
Commit: abc123def456
Author: Your Name
Artifacts: Available for download
```

### Failure Email
```
Status: ❌ TESTS FAILED
Failed Tests: 2
Branch: feature/ci-cd-setup
Artifacts: Screenshots and videos available
Debugging: Check logs for error details
```

---

## 🔐 Security Best Practices

1. **Never commit secrets** to repository
2. **Use app-specific passwords** for Gmail (not actual password)
3. **Rotate passwords** regularly
4. **Limit email visibility** (only you sees it)
5. **Use separate email** for notifications if possible

---

## 📞 Support

### Common Email Providers Documentation:
- Gmail: https://support.google.com/mail/answer/185833
- Outlook: https://support.microsoft.com/help/4027184
- Yahoo: https://help.yahoo.com/kb/SLN15241.html

### GitHub Actions Documentation:
- https://docs.github.com/actions
- https://github.com/dawidd6/action-send-mail

---

## 🎬 Next Steps

1. ✅ Add GitHub Secrets (completed)
2. ✅ Configure email provider settings
3. ✅ Push code to GitHub
4. ✅ Monitor first pipeline run
5. ✅ Verify email notification received
6. ✅ Download and review test results

---

## 💡 Tips

- **Monitor dashboard**: GitHub Actions tab shows real-time status
- **Check email spam**: Add GitHub to safe senders
- **View logs**: Click workflow run to see detailed logs
- **Download reports**: Keep test reports for documentation
- **Schedule runs**: Edit cron schedule in workflow file

---

**Setup Complete!** 🎉

Your Playwright test framework is now integrated with GitHub Actions and email notifications.

Tests will run automatically on every push and send you detailed results via email!
