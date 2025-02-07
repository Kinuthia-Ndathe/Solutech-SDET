const { test, expect } = require('@playwright/test');
test('Book Tour', async ({ page }) => {
    
    await page.goto('http://localhost:8000');
    await page.click('a[href="http://localhost:8000/BookTour"]');
    await page.fill('#tourName', 'Destination Bali');
    await page.fill('#tourDate', '2023-12-25');
    await page.fill('#numberOfGuests', '2');
    await page.fill('#guestName', 'Guest1');
    await page.fill('#guestEmail', 'guest.one@outlook.com');
    await page.click('#submitBooking');
    await expect(page).toHaveText('#confirmationMessage', 'Booking confirmed!');
});
