import { Page, Locator } from '@playwright/test';
import { NavCartComponent } from './component/nav-cart.components';

export abstract class BasePage {
protected readonly page: Page;
 readonly navCart: NavCartComponent;

constructor(page: Page) {
    this.page = page;
    this.navCart = new NavCartComponent(page);
}

async open(url:string): Promise<void> {
    await this.page.goto(url);
}

get cartQuantity(): Locator {
    return this.page.locator('[data-test="cart-quantity"]');
  }
}






