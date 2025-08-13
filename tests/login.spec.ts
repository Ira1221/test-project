import { test, expect } from '@playwright/test';

const users = {
  standardUser: {
    login: 'customer@practicesoftwaretesting.com',
    password: 'welcome01'
  }
}

users.standardUser.login
test('Login  with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('[data-test="email"]').fill(users.standardUser.login);
  await page.locator('[data-test="password"]').fill(users.standardUser.password);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
   
  
});
