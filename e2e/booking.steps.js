const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { chromium } = require('playwright');

let browser, page;

Given('I am on the home page', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080/booking');
});

When('I select a tour', async function () {
    await page.click('text=Tour Name');
});

When('I enter my booking details', async function () {
    await page.fill('input[name="name"]', 'booking');
    await page.fill('input[name="email"]', 'booking@account.com');
    await page.fill('input[name="phone"]', '+254711223344');
    await page.selectOption('select[name="tour"]', 'First Tour');
});

When('I confirm the booking', async function () {
    await page.click('button[name="book"]');
});

Then('I should see a booking confirmation', async function () {
    const confirmationMessage = await page.textContent('.confirmation-message');
    assert(confirmationMessage.includes('Booking confirmed'));
    await browser.close();
});

//Admin steps

Given('I am an admin & logged in', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080/login');
    await page.fill('input[name="username"]', 'TourAdmin');
    await page.fill('input[name="password"]', 'TourAdminpassword');
    await page.click('input[name="login"]');
    await page.waitForNavigation();
});

When('I add a new tour with available slots, pricing, descriptions, and destinations', async function () {
    await page.goto('http://localhost:8080/admin/tours'); 
    await page.click('button[name="Add Tour"]');
    await page.fill('input[name="tour-name"]', 'New Tour');
    await page.fill('input[name="slots"]', '10');
    await page.fill('input[name="price"]', '$275');
    await page.fill('textarea[name="description"]', 'Adventure Awaits');
    await page.fill('input[name="destination"]', 'Tsavo National Park');
    await page.click('button[name="Submit tour"]');
});

Then('the tour should be available for booking', async function () {
    const tourList = await page.textContent('.tour-list');
    assert(tourList.includes('New Tour'));
    await browser.close();
});

When('I view all bookings', async function () {
    await page.goto('http://localhost:8080/admin/bookings');
});

Then('I should see a list of all bookings made by users', async function () {
    const bookingList = await page.textContent('.booking-list');
    assert(bookingList.length > 0);
    await browser.close();
});

When('I view all tickets', async function () {
    await page.goto('http://localhost:8080/admin/tickets');
});

Then('I should see all tickets generated from bookings', async function () {
    const ticketList = await page.textContent('.ticket-list');
    assert(ticketList.length > 0);
    await browser.close();
});