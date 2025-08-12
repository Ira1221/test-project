import { test, expect } from '@playwright/test';

test('Login  with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="page-title"]')).toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
});


test('Login with invalid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.locator('[data-test="email"]').fill('Qustomer@practicesoftwaretesting.com');

  await page.locator('[data-test="password"]').fill('Velcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="page-title"]')).not.toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).not.toBeVisible();
  //await page1.goto('https://practicesoftwaretesting.com/account');
});