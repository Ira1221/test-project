
import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile});


test('Verify successful login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Olha havhav');

});



