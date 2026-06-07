const {Given, When, Then ,setDefaultTimeout } = require('@cucumber/cucumber');
const {loginPage} = require('../../pageobjects/loginPage.js');
//const {POManager} = require('../../pageobjects/POManager.js');
const datajson = JSON.parse(JSON.stringify(require('../../utils/data/loginTestData.json')));
const datajson1 = JSON.parse(JSON.stringify(require('../../utils/data/InvalidLoginTestData.json')));
const {validationPage} = require('../../pageobjects/validationPage.js');

 setDefaultTimeout(60 * 1000);
        
 //login_valid
 
Given('The user is on the Login page',  async function () { 
             //Login into applications
             this.loginPage = await this.poManager.getLoginPage();
               await this.loginPage.navigateURL();
         });

When('The user enters valid username and  password and clicks on Login', async function () {
            this.loginPage = await this.poManager.getLoginPage();
             await this.loginPage.loginApp(datajson.username, datajson.password);
         });

Then('The user lands on Home page.',{timeout:20000},async function () {
        
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.verifySuccesfulLogin();

         });

//Login_invalidusernameandpassword

Given('S1 The user is on the Login page', async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
         });

When('the user clicks on loginbutton by entering invalid username and invalid password', async function () {
           this.loginPage = await this.poManager.getLoginPage();
            await this.loginPage.loginApp(datajson1.username, datajson1.password);
         });

Then('the user should able to see errormessage {string}', async function (string) {

          this.validationPage = await this.poManager.getValidationPage();
          await this.validationPage.Login_invalidusernameandpassword();
         });

//login_withemptyfields
Given('S2 The user is on the Login page', async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
         });

When('the user clicks on Loginbutton without entering username and password', async function () {
          this.loginPage = await this.poManager.getLoginPage();
             await this.loginPage.loginAppWithEmptyFields();
         });

Then('the user should able to see errormessage {string} under usernametextbox and passwordtextbox', async function (string) {
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.login_withemptyfields() ;
         });


 //login_usernameEmptyPassword

 Given('S3 The user is on the Login page', async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
         });  
When('the user clicks on loginbutton by entering username without password', async function () {
           this.loginPage = await this.poManager.getLoginPage();
             await this.loginPage.loginAppWithUsername(datajson.username);
         });
         
Then('the user should able to see errormessage {string} under passwordtextbox', async function (string) {
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.login_WithUsernameEmptyPassword() ;
         });

//login_passwordEmptyusername

Given('S4 The user is on the Login page', async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
         });

When('the user clicks on loginbutton by entering password without username', async function () {
           this.loginPage = await this.poManager.getLoginPage();
             await this.loginPage.loginAppWithPassword(datajson.password);
         });

Then('the user should able to see errormessage {string} under usernametextbox', async function (string) {
           this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.login_WithPasswordEmptyUsername() ;
         });
       


