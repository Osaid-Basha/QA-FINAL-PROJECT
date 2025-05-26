import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
dotenv.config();

test.describe('Add to cart', () => {
  let page: any;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL!);
    
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('USER_NAME and PASSWORD environment variables must be set');
    }
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
  });

  test('should add item to cart 1', async () => {
   
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    const cartCount = await page.locator('.shopping_cart_badge').innerText();
    expect(cartCount).toBe('2');
     await page.pause();
  });
  

  test.afterEach(async () => {
    await page.close();
  });
});
