import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { Category } from './categories.enum';

export class HomePage extends BasePage {
  readonly productsCard: Locator = this.page.getByTestId(/product/);
  readonly sortDropdown: Locator = this.page.getByTestId('sort');
  readonly searchSubmit: Locator = this.page.getByTestId('search-submit');
  readonly productNames: Locator = this.page.getByTestId('product-name');
  readonly productPrices: Locator = this.page.getByTestId('product-price');
  readonly cartIcon: Locator = this.page.getByTestId('nav-cart');

  
  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }


  async openProduct(productName: string): Promise<void> {
    await this.productsCard.filter({ hasText: productName }).first().click();
  }

  async getProductDetails(productName: string): Promise<{ title: string; price: string }> {
    const product = this.productsCard.filter({ hasText: productName }).first();
    const title = await product.getByTestId('product-name').innerText();
    const price = await product.getByTestId('product-price').innerText();

    return {
      title: title.trim(),
      price: price.replace('$', '').trim(),
    };
  }

  async selectSortOption(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
    await this.searchSubmit.click(); 
  }




  async filterByCategory(category: string): Promise<void> {
  await this.page.getByLabel(category).check();
}



  async getProductList(type: 'name' | 'price'): Promise<(string | number)[]> {
  if (type === 'name') {
    return await this.page.getByTestId('.product-name').allTextContents();
  } else if (type === 'price') {
    const prices = await this.page.getByTestId('.product-price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '').trim()));
  } else {
    throw new Error(`Unsupported sort type: ${type}`);
  }
}



  async verifyAllProductNamesContain(text: string): Promise<void> {
    const count = await this.productNames.count();
    for (let i = 0; i < count; i++) {
      const name = await this.productNames.nth(i).innerText();
      expect(name).toContain(text);
    }
  }

  
  async getCartQuantity(): Promise<string> {
    return (await this.cartQuantity.innerText()).trim();
  }
}
