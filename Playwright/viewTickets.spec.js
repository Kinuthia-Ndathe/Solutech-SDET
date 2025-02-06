const { test, expect } = require('@playwright/test');
test('View all tickets as Admin', async ({ page }) => {
    
    await page.goto('http://localhost:8080/admin');  
    await page.fill('#Username', 'booking');
    await page.fill('#Password', 'secret@santa');
    await page.click('#Login');
    await expect(page).toHaveText('#welcomeMessage', 'Welcome', '#Username!');
    await page.click('#Tickets');

    const tickets = await page.locator('.Tickets');
    expect(await tickets.count()).toBeGreaterThan(0);  // At least one ticket
});