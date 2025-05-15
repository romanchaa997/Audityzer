import { test, expect } from '@playwright/test';

test('demo dapp loads and displays heading', async ({ page }) => {
  const url = process.env.TARGET_URL || 'http://localhost:5001';
  await page.goto(url);
  await expect(page).toHaveTitle(/Demo DApp|DevForge|Web3/i);
  // Take a screenshot for artifacts
  await page.screenshot({ path: 'test-output/demo-dapp.png', fullPage: true });
}); 