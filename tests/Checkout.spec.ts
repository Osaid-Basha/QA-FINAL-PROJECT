import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage'; 
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Checkout Page', () => {
  let page: any;
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL!);

    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('USER_NAME and PASSWORD environment variables must be set');
    }

    loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    checkoutPage = new CheckoutPage(page);
  });

  test('should checkout with valid information', async () => {
    // Add to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await page.pause();

    // Fill checkout info using page object
    await checkoutPage.fillCheckoutForm('Ahmed', 'Musleh', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await page.pause();

    const checkoutTitle = await page.locator('.title').innerText();
    expect(checkoutTitle).toBe('Checkout: Complete!'); 

    await page.pause();
  });

  test('should fail checkout with invalid information', async () => {
    // Add to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await page.pause();

    // Missing last name
    await checkoutPage.fillCheckoutForm('Osaid', '', '12345');
    await checkoutPage.clickContinue();
    await page.pause();

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error: Last Name is required');

    await page.pause();
  });

  test.afterAll(async () => {
    await page.close();
  });
});
