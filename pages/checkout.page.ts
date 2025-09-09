import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly cartTableRows: Locator = this.page.getByTestId('cart-table').locator('tbody tr');
  readonly productTitleInCart: Locator = this.page.getByTestId('product-title');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-to-checkout');
  

  async verifyUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  async getNumberOfProducts(): Promise<number> {
    return await this.cartTableRows.count();
  }

  async verifyProductTitle(expectedTitle: string): Promise<void> {
    await expect(this.productTitleInCart).toContainText(expectedTitle);
  }

  async verifyProceedToCheckoutButtonVisible(): Promise<void> {
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
