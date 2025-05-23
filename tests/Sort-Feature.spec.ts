import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SortPage } from '../pages/SortPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Sort Feature with POM', () => {
  let page: any;
  let loginPage: LoginPage;
  let sortPage: SortPage;

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
    sortPage = new SortPage(page);
  });

  test('should sort by name A to Z', async () => {
    await sortPage.sortBy('az');
    const items = await sortPage.getItemNames();
        await page.pause();

    const sorted = [...items].sort();
    expect(items).toEqual(sorted);
  });

  test('should sort by name Z to A', async () => {
    await sortPage.sortBy('za');
    const items = await sortPage.getItemNames();
        await page.pause();

    const sorted = [...items].sort().reverse();
    expect(items).toEqual(sorted);
  });

  test('should sort by price low to high', async () => {
    await sortPage.sortBy('lohi');
    const prices = await sortPage.getItemPrices();
        await page.pause();

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort by price high to low', async () => {
    await sortPage.sortBy('hilo');
    const prices = await sortPage.getItemPrices();
        await page.pause();

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test.afterEach(async () => {
    await page.close();
  });
});
