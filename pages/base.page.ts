import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
protected readonly page: Page;

constructor(page: Page) {
    this.page = page;
}

async open(url:string): Promise<void> {
    await this.page.goto(url);
}

get cartQuantity(): Locator {
    return this.page.locator('[data-test="cart-quantity"]');
  }

  async clickCartIcon() {
    await this.page.locator('[data-test="nav-cart"]').click();
  }
}






