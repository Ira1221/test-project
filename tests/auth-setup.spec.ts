
import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


test('Verify successful login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');



const signInBtn = page.locator('[data-test="nav-sign-in"]');
  await expect(signInBtn).toBeVisible();
  await signInBtn.click();


  await page.locator('[data-test="email"]').fill('Havhav17@gmail.com');
  await page.locator('[data-test="password"]').fill('Havhav17@gmail.com');
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  await page.context().storageState({path: authFile});
});
