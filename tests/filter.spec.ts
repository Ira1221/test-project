import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Category } from '../pages/categories.enum';

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

 
  await homePage.filterByCategory('Sander');

  
  const productNames = await homePage.getProductList('name') as string[];

  for (const name of productNames) {
    expect(name).toContain('Sander');
  }
});

