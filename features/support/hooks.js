const { chromium } = require('@playwright/test');
const { Before, After } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager.js');

Before(async function () {
    this.browser = await chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage(); 
    this.poManager = new POManager(this.page);
});

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();

});