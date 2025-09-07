import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

type SortTestParams = {
  sortType: 'name' | 'price';
  order: 'asc' | 'desc';
  label: string;
};

const testCases: SortTestParams[] = [
  { sortType: 'name', order: 'asc', label: 'Name (A - Z)' },
  { sortType: 'name', order: 'desc', label: 'Name (Z - A)' },
  { sortType: 'price', order: 'asc', label: 'Price (Low - High)' },
  { sortType: 'price', order: 'desc', label: 'Price (High - Low)' },
];

test.describe('Product sorting tests', () => {
  for (const { sortType, order, label } of testCases) {
    test(`Verify sorting by ${sortType} in ${order} order`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.open();
      await homePage.selectSortOption(label);

      const actualList = await homePage.getProductList(sortType); 

      const sortedList = [...actualList].sort((a, b) =>
        order === 'asc'
          ? a.localeCompare(b) // A → Z
          : b.localeCompare(a) // Z → A
      );

      console.log('Actual:', actualList);
      console.log('Expected:', sortedList);

      expect(actualList).toEqual(sortedList);
    });
  }
});