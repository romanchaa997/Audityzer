
import { test, expect } from '@playwright/test';

test.describe('Audityzer E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Audityzer/);
    
    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should start audit process', async ({ page }) => {
    // Look for audit start button or form
    const auditButton = page.locator('[data-testid="start-audit"]').first();
    
    if (await auditButton.isVisible()) {
      await auditButton.click();
      
      // Wait for audit interface to load
      await expect(page.locator('[data-testid="audit-interface"]')).toBeVisible();
    }
  });

  test('should handle URL input validation', async ({ page }) => {
    const urlInput = page.locator('input[type="url"]').first();
    
    if (await urlInput.isVisible()) {
      // Test invalid URL
      await urlInput.fill('invalid-url');
      await page.keyboard.press('Tab');
      
      // Should show validation error
      await expect(page.locator('.error, .invalid')).toBeVisible();
      
      // Test valid URL
      await urlInput.fill('https://example.com');
      await page.keyboard.press('Tab');
      
      // Error should disappear
      await expect(page.locator('.error, .invalid')).not.toBeVisible();
    }
  });

  test('should display audit results', async ({ page }) => {
    // Mock audit completion
    if (process.env.MOCK_MODE === 'true') {
      // Simulate audit flow
      const startButton = page.locator('[data-testid="start-audit"]').first();
      
      if (await startButton.isVisible()) {
        await startButton.click();
        
        // Wait for results to appear
        await expect(page.locator('[data-testid="audit-results"]')).toBeVisible({ timeout: 15000 });
        
        // Check for score display
        await expect(page.locator('[data-testid="audit-score"]')).toBeVisible();
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that content is properly displayed
    await expect(page.locator('main')).toBeVisible();
  });
});
