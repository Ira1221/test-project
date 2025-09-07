import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
    readonly productName: Locator = this.page.getByTestId('product-name');
    readonly productPrice: Locator = this.page.getByTestId('unit-price');
    readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
    readonly addToFavoritesButton: Locator = this.page.getByTestId('add-to-favorites');
    readonly alertMessage: Locator = this.page.getByRole('alert');
    
    async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async assertProductName(expectedName: string): Promise<void> {
    await expect(this.productName).toHaveText(expectedName);
  }

  async assertPrice(expectedPrice: string): Promise<void> {
    await expect(this.productPrice).toHaveText(expectedPrice);
  }

  async verifyAlert(expectedText: string): Promise<void> {
    await expect(this.alertMessage).toBeVisible();
    await expect(this.alertMessage).toContainText(expectedText);
    await expect(this.alertMessage).toBeHidden({ timeout: 8000 });
  }
}