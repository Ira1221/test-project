
import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


test('Verify successful login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await page.locator('[data-test="nav-sign-in"]').click();

  await page.locator('[data-test="email"]').fill('Havhav12@gmail.com');
  await page.locator('[data-test="password"]').fill('Havhav12@gmail.com');
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  await page.context().storageState({path: authFile});
});
