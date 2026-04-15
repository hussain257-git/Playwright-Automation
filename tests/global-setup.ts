import { chromium, FullConfig } from "@playwright/test";
import { users } from "../test-data/test-data";

/**
 * Global Setup — runs ONCE before all test workers.
 * Logs in via UI, saves the session cookie to auth.json.
 * All tests reuse this session — no UI login per test.
 */
async function globalSetup(_config: FullConfig): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.saucedemo.com");
  await page.locator("#user-name").fill(users.standard.username);
  await page.locator("#password").fill(users.standard.password);
  await page.locator("#login-button").click();
  await page.waitForURL("**/inventory.html");

  // Save session state (cookies + localStorage) to disk
  await context.storageState({ path: "auth.json" });
  await browser.close();
}

export default globalSetup;
