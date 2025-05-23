import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Remove from cart', () => {
  let page: any;
  let loginPage: LoginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL!);

    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('USER_NAME and PASSWORD environment variables must be set');
    }

    loginPage = new LoginPage(page);
    await loginPage.login(username, password);
  });

  test('should remove item from cart', async () => {
  // Add items to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    

  // Verify items are added to cart
  const cartCount = await page.locator('.shopping_cart_badge').innerText();
  // Go to cart page
  await page.locator('.shopping_cart_link').click();
    await page.pause();

  // Remove items from cart
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await page.pause();

  // Verify cart is empty
  const cartItems = await page.locator('.cart_item').count();
  expect(cartItems).toBe(0); 
});


  test.afterEach(async () => {
    await page.close();
  });
});
