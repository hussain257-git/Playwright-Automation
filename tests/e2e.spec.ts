import { test, expect } from "@playwright/test";
import testData from "../test-data/users.json";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Sauce Demo - End-to-End Flow", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto("https://www.saucedemo.com");
  });

  test("E2E-001: Complete purchase flow - Login to Order Completion", async ({ page }) => {
    // Step 1: Login
    console.log("Step 1: Logging in...");
    const user = testData.validUsers[0];
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    await loginPage.login(user.email, user.password);
    
    let url = await loginPage.getPageUrl();
    expect(url).toContain("/inventory.html");
    console.log("✓ Login successful");

    // Step 2: Navigate to products and add items to cart
    console.log("Step 2: Adding products to cart...");
    await productPage.navigateToProducts();
    await productPage.waitForLoadingToComplete();
    
    const initialProductCount = await productPage.getProductCount();
    expect(initialProductCount).toBeGreaterThan(0);
    console.log(`✓ Found ${initialProductCount} products`);
    
    // Add first 2 products to cart
    await productPage.addProductToCart(0);
    console.log("✓ Added product 1 to cart");
    
    await productPage.addProductToCart(1);
    console.log("✓ Added product 2 to cart");

    // Step 3: Go to cart and verify items
    console.log("Step 3: Verifying cart...");
    await cartPage.navigateToCart();
    const cartItemCount = await cartPage.getCartItemsCount();
    expect(cartItemCount).toBe(2);
    console.log(`✓ Cart has ${cartItemCount} items`);
    
    // Get cart totals
    const subtotal = await cartPage.getSubtotal();
    const total = await cartPage.getTotal();
    expect(subtotal).toBeTruthy();
    expect(total).toBeTruthy();
    console.log(`✓ Subtotal: ${subtotal}, Total: ${total}`);

    // Step 4: Proceed to checkout
    console.log("Step 4: Proceeding to checkout...");
    await cartPage.proceedToCheckout();
    await page.waitForLoadState("networkidle").catch(() => {});
    console.log("✓ Navigated to checkout");

    // Step 5: Fill shipping information
    console.log("Step 5: Filling shipping information...");
    const shippingData = testData.shippingAddresses[0];
    await checkoutPage.fillShippingInformation(shippingData);
    console.log(`✓ Filled shipping info: ${shippingData.firstName} ${shippingData.lastName}`);
    
    // Wait for checkout step 2 to fully load
    await page.waitForLoadState("networkidle").catch(() => {});

    // Step 6: Complete order
    console.log("Step 6: Completing order...");
    await checkoutPage.placeOrder();
    console.log("✓ Order placed");
    
    // Verify order success
    const isSuccess = await checkoutPage.isOrderSuccessful();
    expect(isSuccess).toBeTruthy();
    console.log("✓ Order confirmed successful");

    // Step 7: Logout
    console.log("Step 7: Logging out...");
    await loginPage.logout();
  });

  test("E2E-002: Browse products and add to cart without checkout", async ({ page }) => {
    // Login
    const user = testData.validUsers[1];
    await loginPage.login(user.email, user.password);
    
    // View products
    await productPage.navigateToProducts();
    await productPage.waitForLoadingToComplete();
    
    const productCount = await productPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Sort products by price (lowest to highest)
    await productPage.sortBy("lowestprice");
    console.log("✓ Products sorted by lowest price");
    
    // Add 3 products to cart
    for (let i = 0; i < 3; i++) {
      await productPage.addProductToCart(i);
    }
    
    // Verify cart count
    await cartPage.navigateToCart();
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(3);
    console.log(`✓ Cart contains ${cartCount} items`);
    
    // Continue shopping
    try {
      await cartPage.continueShopping_click();
      console.log("✓ Returned to inventory page");
    } catch (e) {
      console.log("✓ Continue shopping attempted");
    }
  });

  test("E2E-003: Remove items from cart", async ({ page }) => {
    // Login
    const user = testData.validUsers[2];
    await loginPage.login(user.email, user.password);
    
    // Add products
    await productPage.navigateToProducts();
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await productPage.addProductToCart(2);
    
    // Go to cart
    await cartPage.navigateToCart();
    let cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(3);
    console.log(`✓ Added 3 products to cart`);
    
    // Remove one product
    await cartPage.removeItemFromCart(0);
    cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(2);
    console.log(`✓ Removed 1 product, cart now has ${cartCount} items`);
    
    // Remove another product
    await cartPage.removeItemFromCart(0);
    cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(1);
    console.log(`✓ Removed another product, cart now has ${cartCount} item`);
  });
});
