const { test, expect } = require('@playwright/test');
test('Create new tours as Admin', async ({ page }) => {

    await page.goto('http://localhost:8000/admin');  
    await page.fill('#Username', 'admin@account.com');
    await page.fill('#Password', 'password');
    await page.click('#Login');
    await expect(page).toHaveText('#welcomeMessage', 'Welcome', '#Username!');
    
    await page.click('#manageTours');
    await page.click('#addNewTour');
    await page.fill('#newTourName', 'Destination Bali');
    await page.fill('#newTourDate', '2025-01-23');
    await page.fill('tourPrice', '$450.00');
    await page.click('#saveTour');
    
    const successMessage = await page.locator('#successMessage').toBeVisible();
    await expect(successMessage).toHaveText('Tour added successfully');

});