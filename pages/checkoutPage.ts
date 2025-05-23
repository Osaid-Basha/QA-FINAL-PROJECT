
import { Page } from '@playwright/test';

export class CheckoutPage {
  firstName;
  lastName;
  postalCode;
  continueButton;
  finishButton;
  errorMessage;

  constructor(private page: Page) {
    this.firstName = this.page.locator('input[data-test="firstName"]');
    this.lastName = this.page.locator('input[data-test="lastName"]');
    this.postalCode = this.page.locator('input[data-test="postalCode"]');
    this.continueButton = this.page.locator('input[data-test="continue"]');
    this.finishButton = this.page.locator('button[data-test="finish"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }
    async clickContinue() {
        await this.continueButton.click();
    }
    async clickFinish() {
        await this.finishButton.click();
    }
    async getErrorMessage() {
        return this.errorMessage.innerText();
    }
}