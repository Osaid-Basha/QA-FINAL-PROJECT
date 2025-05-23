import { Page } from '@playwright/test';

export class SortPage {
  constructor(private page: Page) {}

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('.product_sort_container').selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}
