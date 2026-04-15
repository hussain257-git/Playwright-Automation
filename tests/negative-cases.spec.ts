import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkout } from "../test-data/test-data";

const BASE_URL = "https://www.saucedemo.com";

// TC-021 to TC-023: Checkout field validation (requires auth + cart setup)
test.describe("Negative Cases - Checkout Validation", { tag: ["@regression", "@negative", "@checkout"] }, () => {
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto(`${BASE_URL}/inventory.html`);
    await productPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.checkout();
  });

  test("TC-021: Checkout without first name shows error", { tag: ["@smoke"] }, async ({ page }) => {
    await checkoutPage.fillUserInfo(
      checkout.missingAll.firstName,
      checkout.missingAll.lastName,
      checkout.missingAll.zipCode
    );
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain(checkout.missingAll.expectedError);
  });

  test("TC-022: Checkout without last name shows error", async ({ page }) => {
    await checkoutPage.fillUserInfo(
      checkout.missingLastName.firstName,
      checkout.missingLastName.lastName,
      checkout.missingLastName.zipCode
    );
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain(checkout.missingLastName.expectedError);
  });

  test("TC-023: Checkout without zip code shows error", async ({ page }) => {
    await checkoutPage.fillUserInfo(
      checkout.missingZip.firstName,
      checkout.missingZip.lastName,
      checkout.missingZip.zipCode
    );
    await page.locator("[data-test='continue']").click();

    const error = page.locator("[data-test='error']");
    await expect(error).toBeVisible();
    expect(await error.textContent()).toContain(checkout.missingZip.expectedError);
  });
});

// TC-024: Authorization check (must run WITHOUT prior login)
test.describe("Negative Cases - Authorization", { tag: ["@regression", "@negative"] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Must test without auth
  test("TC-024: Accessing inventory without login redirects to login", { tag: ["@smoke"] }, async ({ page }) => {
    await page.goto(`${BASE_URL}/inventory.html`);
    expect(page.url()).not.toContain("inventory.html");
  });
});
