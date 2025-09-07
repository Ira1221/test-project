import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/productDetails.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetails = new ProductDetailsPage(page);
 

  await homePage.open();
  await homePage.openProduct('Slip Joint Pliers');


  await expect(page).toHaveURL(/.*\/product.*/);


  await productDetails.assertProductName('Slip Joint Pliers');
  await productDetails.assertPrice('9.17');

  await productDetails.addToCart();

  await expect(page.getByRole('alert')).toBeVisible({ timeout: 8000 });


  await productDetails.verifyAlert('Product added to shopping cart');

  await expect(homePage.getCartQuantity()).resolves.toBe('1');

  await homePage.openCart();
});

