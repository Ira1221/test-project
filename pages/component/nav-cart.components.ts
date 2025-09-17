import { Locator, Page } from '@playwright/test';

export class NavCartComponent {
  readonly page: Page;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = this.page.getByTestId('nav-cart');
  }

  async click() {
    await this.cartIcon.click();
  }

  async isVisible(): Promise<boolean> {
    return await this.cartIcon.isVisible();
  }

  async getText(): Promise<string> {
    return await this.cartIcon.textContent() ?? '';
  }
}
