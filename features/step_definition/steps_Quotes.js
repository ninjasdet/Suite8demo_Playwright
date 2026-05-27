const {Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { Before, After } = require('@cucumber/cucumber');

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

After(async function () {
    await browser.close();
});

 Given('user signs into the Login page using valid username and password following which navigates to the Home page', async function () {
         
     
       console.log('Given statement');
         });

          When('The user clicks on Accounts module and click on create account', function () {
           console.log(" create account");
         });

            When('Entering valid data in all fields and  and click on save button', function () {
           console.log("entering the details");
         });


         Then('The user should able to see the created account details', function () {
           console.log("verifying the details");
         });