import { Page } from '@playwright/test';

export class LoginPage {
  username;
  password;
  loginButton;

  constructor(private page: Page) {
    this.username = this.page.locator('input[data-test="username"]');
    this.password = this.page.locator('input[data-test="password"]');
    this.loginButton = this.page.locator('input[data-test="login-button"]');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

 
}
