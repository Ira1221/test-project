
import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile});


test('Verify successful login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Olha havhav');

});



test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await page.locator('[data-test="product-name"]', { hasText: 'Slip Joint Pliers' }).click();

  await expect(page).toHaveURL(/\/product/);

  await expect (page.locator('[data-test="product-name"]')).toHaveText('Slip Joint Pliers');

  await expect (page.locator('[data-test="unit-price"]')).toHaveText('9.17');

  await page.locator('[data-test="add-to-cart"]', { hasText: 'Add to Cart' }).click();

  await expect(page.getByRole('alert')).toBeVisible();

  await expect(page.getByRole('alert')).toHaveText(' Product added to shopping cart. ');

  await expect(page.locator('[data-test="alert"]')).toBeHidden({ timeout: 8000 });

  await expect (page.locator('[data-test="cart-quantity"]')).toHaveText('1');


  await page.locator('[data-test="nav-cart"]').click();

  await expect(page).toHaveURL(/\/checkout/);

  await expect (page.locator('[data-test="cart-quantity"]')).toHaveText('1');

  await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');

});



function isSorted(arr: string[], compareFn: (a: string, b: string) => number): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (compareFn(arr[i - 1], arr[i]) > 0) {
      return false;
    }
  }
  return true;
}

test.describe('Verify product sorting by name', () => {
  const sortOptions = [
    { label: 'A-Z', value: 'name,asc', compareFn: (a: string, b: string) => a.localeCompare(b) },
    { label: 'Z-A', value: 'name,desc', compareFn: (a: string, b: string) => b.localeCompare(a) },
  ];

  for (const { label, value, compareFn } of sortOptions) {
    test(`should sort products by name ${label}`, async ({ page }) => {
      await page.goto('https://practicesoftwaretesting.com');

      await page.selectOption('[data-test="sort"]', value);

      const firstProductNameBefore = await page.locator('[data-test="product-name"]').first().textContent();

      await page.locator('[data-test="search-submit"]').click();

      await page.waitForFunction(
        (prev) => document.querySelector('[data-test="product-name"]')?.textContent !== prev,
        firstProductNameBefore
      );

      const productNames = (await page.locator('[data-test="product-name"]').allTextContents())
        .map(name => name.trim());

      
      expect(productNames.length).toBeGreaterThan(0);

      expect(isSorted(productNames, compareFn)).toBe(true);


      const sortedNames = [...productNames].sort(compareFn);
      console.log('Actual:', productNames);
      console.log('Expected:', sortedNames);

      expect(productNames).toEqual(sortedNames);
    });
  }
});



test.describe('Verify user can perform sorting by price', () => {
  const sortOptions = [
    { label: 'High-Low', value: 'price,asc', compareFn: (a: string, b: string) => a.localeCompare(b) },
    { label: 'Low-High', value: 'price,desc', compareFn: (a: string, b: string) => b.localeCompare(a) },
  ];

  for (const { label, value, compareFn } of sortOptions) {
    test(`should sort products by price ${label}`, async ({ page }) => {
      await page.goto('https://practicesoftwaretesting.com');

      await page.selectOption('[data-test="sort"]', value);

      const firstProductNameBefore = await page.locator('[data-test="product-price"]').first().textContent();

      await page.locator('[data-test="search-submit"]').click();

      await page.waitForFunction(
        (prev) => document.querySelector('[data-test="product-price"]')?.textContent !== prev,
        firstProductNameBefore
      );

      const productNames = (await page.locator('[data-test="product-price"]').allTextContents())
        .map(name => name.trim());

      
      expect(productNames.length).toBeGreaterThan(0);

      expect(isSorted(productNames, compareFn)).toBe(true);


      const sortedNames = [...productNames].sort(compareFn);
      console.log('Actual:', productNames);
      console.log('Expected:', sortedNames);

      expect(productNames).toEqual(sortedNames);
    });
  }
});


test('Verify user can filter products by category', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Sander').check();

  const productNames = page.locator('[data-test="product-name"]');

  await expect(productNames.first()).toBeVisible();

  await expect(productNames.first()).toContainText('Sander'); 

  const count = await productNames.count();
  for (let i = 0; i < count; i++) {
    const name = await productNames.nth(i).textContent();
    console.log(`Product ${i + 1}:`, name?.trim());
    expect(name).toContain('Sander');
  }
});

