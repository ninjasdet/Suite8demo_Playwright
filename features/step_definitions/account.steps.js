const {Given, When, Then } = require('@cucumber/cucumber');
const {loginPage} = require('../../pageobjects/loginPage.js');
const {navigatePage} = require('../../pageobjects/navigatePage.js');
const {enterValuesPage} = require('../../pageobjects/enterValuesPage.js');
const {POManager} = require('../../pageobjects/POManager.js');
const {validationPage} = require('../../pageobjects/validationPage.js');
const datajson = JSON.parse(JSON.stringify(require('../../utils/data/datajson.js')));
const path = require('path');
const filepath= path.join(process.cwd(),'utils','downloads','Accounts.csv');
const writeCsvTest  = require('../../utils/cvstest.js');



//Create Account
 Given('S1 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000},  async function () {
    
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
      await this.loginPage.navigateURL();
      await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);

 });

 When('The user clicks on Accounts module and click on create account and entering valid data in all fields and  and click on save button.', {timeout:20000}, async function () {
          
       this.navigatePage = await this.poManager.getNavigatePage();
       this.enterValuesPage = await this.poManager.getEnterValuesPage();
        await this.navigatePage.createAccountsPage();
    await this.enterValuesPage.createAccount(
    datajson.accountDetails.accountName,
    datajson.accountDetails.website,
    datajson.accountDetails.email,
    datajson.accountDetails.billingStreet,
    datajson.accountDetails.billingPostalCode,
    datajson.accountDetails.billingCity,
    datajson.accountDetails.billingState,
    datajson.accountDetails.billingCountry,
    datajson.accountDetails.phoneNumber,
    datajson.accountDetails.shippingStreet,
    datajson.accountDetails.shippingPostalCode,
    datajson.accountDetails.shippingCity,
    datajson.accountDetails.shippingState,
    datajson.accountDetails.shippingCountry
  );
         });
 Then('The user should able to see the created account details', {timeout:20000},  async function () {
 
   this.validationPage = await this.poManager.getValidationPage();  
   await this.validationPage.VerifyCreateAccountDetails(datajson.accountDetails.accountName);
    console.log("create account succesfully");
         });

//Verify that user receives error message for empty Name field during Create Account

Given('S2 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000},async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
        await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);
         });

When('The user clicks on Accounts module and click on create account and enter details with empty Name',{timeout:20000}, async function () {
              this.navigatePage = await this.poManager.getNavigatePage();
               this.enterValuesPage = await this.poManager.getEnterValuesPage();
              await this.navigatePage.createAccountsPage();
              await this.enterValuesPage.Namevalidation(datajson.accountDetails.emptyAccountName);
              await this.enterValuesPage.save();
         });
Then('The user should able to see error message {string} under Name textbox.', {timeout:20000},async function (string) {
             this.validationPage = await this.poManager.getValidationPage();   
             await this.validationPage.VerifyAccountMandatoryFileds();
         });


//View Accounts
Given('S3 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);
         });   
When('The user clicks on Accounts module and click on view accounts.', {timeout:20000}, async function () {
         this.navigatePage = await this.poManager.getNavigatePage();
         await this.navigatePage.viewAccountsPage();  

         });   
Then('The user should able to see the account details in the list.', {timeout:20000}, async function () {
          this.validationPage = await this.poManager.getValidationPage();   
         await this.validationPage.VerifyViewAccountDetails(
        datajson.accountDetails.accountName,
        datajson.accountDetails.website,
        datajson.accountDetails.email,
        datajson.accountDetails.phoneNumber);
         });


//RecentlyViewedAccounts

Given('S4 user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
         
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);

         });

When('The user clicks on accounts module and click on the viewaccounts.', async function () {
          
             this.navigatePage = await this.poManager.getNavigatePage();
             await this.navigatePage.viewAccountsPage();

         });

When('The user should  see the account details in the list and  again click on the accountsmodule.', async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();   
           await this.enterValuesPage.RecentviewAccounts(datajson.accountDetails.accountName);

         });

Then('The user able to see the recently viewed account details.', async function () {
          this.validationPage = await this.poManager.getValidationPage();
          await this.validationPage.VerifyRecentViewAccountDetails(datajson.accountDetails.accountName);
         });

//Verify that user able to update the account details

Given('S5 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);
         });

When('The user clicks on Account module and click on view accounts',{timeout:20000}, async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
           await this.navigatePage.viewAccountsPage(); 
        
         });

When('The user click on account and click on edit button and update the details and click on save button.',{timeout:60000}, async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.UpdateViewAccountDetails( datajson.accountDetails.accountName,datajson.accountDetails.NewAccountName);
           await this.enterValuesPage.save();

   });
Then('The user should able to see the updated account details.',{timeout:60000}, async function () {
        
       this.validationPage = await this.poManager.getValidationPage();
      await this.validationPage.VerifyUdateAccountDetails( datajson.accountDetails.NewAccountName);
         });
         
//Import Accounts

Given('S6 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.validUser.username, datajson.validUser.password);
         });

When('The user clicks on Accounts module and click on import Accounts.', {timeout:20000}, async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
           await this.navigatePage.importAccountsPage();
        
         });

When('click on Download Import File Template and edit the file and save the file.',{timeout:20000}, async function () {
          this.enterValuesPage = await this.poManager.getEnterValuesPage();
          await this.enterValuesPage.accounts_downloadImportFileTemplate();
          await writeCsvTest(filepath, datajson.accountDetails.ImportNewValue);
         });

When('click on choose file and uploads a CSV file.', {timeout:20000}, async function () {
          this.enterValuesPage = await this.poManager.getEnterValuesPage();
          await this.enterValuesPage.accounts_ImportFile(filepath);
         });
When('click on the next button and click on next button and click on import now button.',{timeout:20000},async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.enterValuesPage.accounts_ImportClickButtons();
         });

Then('The user should able to see the view import results.',{timeout:20000}, async function () {
            this.enterValuesPage = await this.poManager.getEnterValuesPage();
            await this.enterValuesPage.accounts_ImportaccountValidation(datajson.accountDetails.ImportNewValue);
         });


         

         
         