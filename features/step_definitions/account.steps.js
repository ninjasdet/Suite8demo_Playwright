const {Given, When, Then } = require('@cucumber/cucumber');
const {loginPage} = require('../../pageobjects/loginPage.js');
const {navigatePage} = require('../../pageobjects/navigatePage.js');
const {enterValuesPage} = require('../../pageobjects/enterValuesPage.js');
const {POManager} = require('../../pageobjects/POManager.js');
const {validationPage} = require('../../pageobjects/validationPage.js');
const datajson = JSON.parse(JSON.stringify(require('../../utils/data/accountTestData.json')));
const path = require('path');
const filepath= path.join(process.cwd(),'utils','downloads','Accounts.csv');
const writeCsvTest  = require('../../utils/cvstest.js');


//AccountsNavigationValidation
 Given('user signs into the Login page using valid username and password following which navigates to the Home page',{timeout:20000}, async function () {
          this.loginPage = await this.poManager.getLoginPage();
          await this.loginPage.navigateURL();
          await this.loginPage.loginApp(datajson.username, datajson.password);
         });
When('The user clicks on Accounts module from menu.', {timeout:20000}, async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
            await this.navigatePage.AccountsPage();
         });

Then('The user should able to navigate to the Accounts module successfully and the Accounts page URL should be correct',{timeout:20000},  async function () {
            this.validationPage = await this.poManager.getValidationPage();
             await this.validationPage.verifyAccountsPage();
             await this.validationPage.verifyAccountsPageURL();
         });      


//Create Account
 Given('S1 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000},  async function () {
    
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
      await this.loginPage.navigateURL();
      await this.loginPage.loginApp(datajson.username, datajson.password);

 });

 When('The user clicks on Accounts module and click on create account and entering valid data in all fields and  and click on save button.', {timeout:20000}, async function () {
          
       this.navigatePage = await this.poManager.getNavigatePage();
       this.enterValuesPage = await this.poManager.getEnterValuesPage();
        await this.navigatePage.createAccountsPage();
    await this.enterValuesPage.createAccount(
    datajson.accountName,
    datajson.website,
    datajson.email,
    datajson.billingStreet,
    datajson.billingPostalCode,
    datajson.billingCity,
    datajson.billingState,
    datajson.billingCountry,
    datajson.phoneNumber,
    datajson.shippingStreet,
    datajson.shippingPostalCode,
    datajson.shippingCity,
    datajson.shippingState,
    datajson.shippingCountry
  );
         });
 Then('The user should able to see the created account details', {timeout:20000},  async function () {
 
   this.validationPage = await this.poManager.getValidationPage();  
   await this.validationPage.VerifyCreateAccountDetails(datajson.accountName);
    console.log("create account succesfully");
         });


//CreateAccountValidation
 Given('S2 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000},  async function () { 
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
      await this.loginPage.navigateURL();
      await this.loginPage.loginApp(datajson.username, datajson.password);

 });

 When('The user clicks on Accounts module and click on create account', {timeout:20000},  async  function () {
             this.navigatePage = await this.poManager.getNavigatePage();
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.navigatePage.createAccountsPage();
         });

Then('User should navigate to Create Account page and Create label should be visible', {timeout:20000},  async function () {
          this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.Verify_CreateAccountsPage(datajson.pageLabel);
         });

Then('Verify the NAME field should be visible and enabled', {timeout:20000},  async function () {
          this.validationPage = await this.poManager.getValidationPage();
          await this.validationPage.Verify_AccountNAME_Field();
         });


Then('Verify the NAME field editbox is editable', {timeout:20000},  async function () {
            this.validationPage = await this.poManager.getValidationPage();
            await this.validationPage.Verify_AccountNAME_Field_Editable();
         });

 Then('Verify Save button and Cancel button should be visible and enabled', {timeout:20000}, async function () {
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.Verify_SaveAndCancelButton_CreateAccount();
         });


//Verify that user receives error message for empty Name field during Create Account

Given('S3 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000},async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
        await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Accounts module and click on create account and enter details with empty Name',{timeout:20000}, async function () {
              this.navigatePage = await this.poManager.getNavigatePage();
               this.enterValuesPage = await this.poManager.getEnterValuesPage();
              await this.navigatePage.createAccountsPage();
              await this.enterValuesPage.Namevalidation(datajson.emptyAccountName);
              await this.enterValuesPage.save();
         });
Then('The user should able to see error message {string} under Name textbox.', {timeout:20000},async function (string) {
             this.validationPage = await this.poManager.getValidationPage();   
             await this.validationPage.VerifyAccountMandatoryFileds();
         });


//View Accounts
Given('S4 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);
         });   
When('The user clicks on Accounts module and click on view accounts.', {timeout:20000}, async function () {
         this.navigatePage = await this.poManager.getNavigatePage();
         await this.navigatePage.viewAccountsPage();  

         });   
Then('The user should able to see the account details in the list.', {timeout:20000}, async function () {
          this.validationPage = await this.poManager.getValidationPage();   
         await this.validationPage.VerifyViewAccountDetails(
        datajson.accountName,
        datajson.website,
        datajson.email,
        datajson.phoneNumber);
         });


//RecentlyViewedAccounts

Given('S5 user signs into the Login page using valid username and password following which navigates to the Home page', async function () {
         
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);

         });

When('The user clicks on accounts module and click on the viewaccounts.', async function () {
          
             this.navigatePage = await this.poManager.getNavigatePage();
             await this.navigatePage.viewAccountsPage();

         });

When('The user should  see the account details in the list and  again click on the accountsmodule.', async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();   
           await this.enterValuesPage.RecentviewAccounts(datajson.accountName);

         });

Then('The user able to see the recently viewed account details.', async function () {
          this.validationPage = await this.poManager.getValidationPage();
          await this.validationPage.VerifyRecentViewAccountDetails(datajson.accountName);
         });

//Verify that user able to update the account details

Given('S6 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Account module and click on view accounts',{timeout:20000}, async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
           await this.navigatePage.viewAccountsPage(); 
        
         });

When('The user click on account and click on edit button and update the details and click on save button.',{timeout:60000}, async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.UpdateViewAccountDetails( datajson.accountName,datajson.newAccountName);
           await this.enterValuesPage.save();

   });
Then('The user should able to see the updated account details.',{timeout:60000}, async function () {
        
       this.validationPage = await this.poManager.getValidationPage();
      await this.validationPage.VerifyUdateAccountDetails( datajson.newAccountName);
         });
         
//Import Accounts

Given('S7 user signs into the Login page using valid username and password following which navigates to the Home page', {timeout:20000}, async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Accounts module and click on import Accounts.', {timeout:20000}, async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
           await this.navigatePage.importAccountsPage();
        
         });

When('click on Download Import File Template and edit the file and save the file.',{timeout:20000}, async function () {
          this.enterValuesPage = await this.poManager.getEnterValuesPage();
          await this.enterValuesPage.accounts_downloadImportFileTemplate();
          await writeCsvTest(filepath, datajson.importNewValue);
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
            await this.enterValuesPage.accounts_ImportaccountValidation(datajson.importNewValue);
         });


         

         
         