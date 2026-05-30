const { Given } = require('@cucumber/cucumber');
const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

const LoginPage = require('../../pageobjects/Contacts/ContactLoginPage.js');
const TestData = require('../../utils/data/loginTestData.json');

// Before(async function () {
//     this.browser = await chromium.launch({headless: false });
//     this.context = await this.browser.newContext();
//     this.page = await this.context.newPage(); // Attaching page to 'this'    
// });
// After(async function () {
//     await this.browser.close();
// });

Given('the user is logged into the application and on the home page', async function () {
    console.log('Executing shared login step');

    this.login = new LoginPage(this.page);
    
    await this.login.goto();
    await this.page.waitForURL(/login/i, { timeout: 150000 });
    await this.login.login(TestData.username, TestData.password);

    await this.page.waitForURL(/#\/home/, { timeout: 150000 });
        await this.page.locator('scrm-base-menu-item').first().waitFor({ state: 'visible', timeout: 50000 });

    console.log('Home page loaded successfully');
});
