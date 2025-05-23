import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Page', () => {
  let page: any;
  let loginPage: LoginPage;
  test.beforeEach(async ({ browser }) => {
    const URL = process.env.BASE_URL;
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await page.goto(URL);
  });

  test('should login with valid credentials ', async () => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('USERNAME and PASSWORD environment variables must be set');
    }

    await page.pause();

    await loginPage.login(username, password);

    
  });
  test('should login with invalid credentials', async () => {
    const username = 'osaid';
    const password = 'osaid12345';
    if (!username || !password) {
      throw new Error('USERNAME and PASSWORD environment variables must be set');
    }
     await page.pause();
    await loginPage.login(username, password);
});

  test.afterEach(async () => {
    await page.close();
  });
});
