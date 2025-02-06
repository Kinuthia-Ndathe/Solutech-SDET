const { Given, When, Then } = require('@cucumber/cucumber');
//const { expect } = require('chai');
const assert = require('assert');
const { chromium } = require('playwright');

let browser, page; //variable declaration

Given('the user is on the login page', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080/login');
});

When('the user enters invalid credentials', async function () {
    await page.fill('input[name="booking"]', 'invalidUsername');
    await page.fill('input[name="secretsanta"]', 'invalidPassword');
    await page.click('input[name="login"]');
});

Then('the user should see an error message', async function () {
    const error = await page.textContent('.error-message');
    assert(error.includes('Invalid credentials'));
    await browser.close();
});
