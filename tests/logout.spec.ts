import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();
test.describe('logout', () => {
   let page: any;
  let loginPage: LoginPage;

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
  });
    test('should logout successfully', async () => {
        // Click on the menu button
        await page.locator('#react-burger-menu-btn').click();
        await page.pause();
    
        // Click on the logout button
        await page.locator('#logout_sidebar_link').click();
        await page.pause();
    
        // Verify that the user is redirected to the login page
        const loginPageTitle = await page.title();
        expect(loginPageTitle).toBe('Swag Labs');
    });
     test.afterEach(async () => {
    await page.close();
  });
})
