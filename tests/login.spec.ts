import { test, expect } from '@playwright/test';
import { baseConfig } from '../config/baseConfig';
import { ApplicationPage } from '../pages/app.page';


test('verify login as a user with valid credentials', async ({ page }) => {
  const app = new ApplicationPage(page);

 

  await app.login.open('/auth/login');
  await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);


  await expect(page).toHaveURL(/\/account$/);

  await expect(
    app.account.pageTitle,
    'Account page title is not visible',
  ).toHaveText('My account');

 
  await expect(
    app.account.header.navMenu,
    'User name is not visible',
  ).toHaveText(baseConfig.USER_NAME);
});
