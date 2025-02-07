const { test, expect } = require('@playwright/test');
test('View all bookings as Admin', async ({ page }) => {
    
    await page.goto('http://localhost:8000/admin');  
    await page.fill('#Username', 'admin@account.com');
    await page.fill('#Password', 'password');
    await page.click('#Login');
    await expect(page).toHaveText('#welcomeMessage', 'Welcome', '#Username!');
    await page.click('#Bookings');  
    
    const bookingsList = await page.locator('.Booking List');
    expect(await bookingsList.count()).toBeGreaterThan(0);  // At least one booking

});