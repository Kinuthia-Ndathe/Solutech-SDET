const { test, expect } = require('@playwright/test');

test('login with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/login');

    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'invalidPassword');
    await page.click('button[type="login"]');
    
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Invalid username or password');
});