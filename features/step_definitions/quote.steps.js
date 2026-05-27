const {Given, When, Then } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager.js');
//const{POManager} = require('../../pageobjects_suite8demo/POManager.js');
const datasetQuote = JSON.parse(JSON.stringify(require('../../utils/data/quotesTestData.json')));
//const datasetDoc = JSON.parse(JSON.stringify(require('../../utils/data/documentsTestData.json')));
const path = require('path');
const writeExcelTest = require('../../pageobjects/writeExcelTest.js');
const filePathQuotes = path.join(process.cwd(), 'utils', 'downloads', 'Quotes.csv');
const filePathLI = path.join(process.cwd(), 'utils', 'downloads', 'LineItems.csv');
//const filePathDoc = path.join(process.cwd(), 'utils', 'downloads', 'IncomeDocument.xlsx');

//Scenario 1: Create a new Quote
Given('S1 The user has logged into the application with valid username and password', {timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();

    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When('Selecting Create Quote from Quotes option',{timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Select Create Quote from Quotes menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.createQuotePage();
 });
When('Entering valid data in all fields - Overview, Address Information, Line items section and clicking Save button',{timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Enter valid details in Overview section
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.createQuote_Overview(datasetQuote.title,datasetQuote.approvalStatus,datasetQuote.opportunity,datasetQuote.quoteStage,datasetQuote.invoiceStatus,datasetQuote.paymentTerms,datasetQuote.approvalIssues);
    //Enter Account Details
    await this.enterValuesPage.createQuote_Account(datasetQuote.billingAccount,datasetQuote.billingContact);    
    //Enter Line Items
    await this.enterValuesPage.createQuote_LineItems(datasetQuote.groupName,datasetQuote.serviceName,datasetQuote.servicePrice,datasetQuote.serviceDiscount,datasetQuote.serviceVAT);
    //Click save button
    await this.navigatePage.clickSave_Frame();

});
Then('Verify the Quote is created successfully',{timeout:20000}, async function () {

    //Verify quote is created successfully
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.verifyQuote(datasetQuote.title);
});
//************************************************************************************* */
//Scenario 2: Mandatory fields validations for Title and Valid Until fields
Given('S2 The user has logged into the application with valid username and password', {timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Login into applications
    
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When ('Selecting Create Quote from Quotes option and Title and Valid Until fields are blank',{timeout:20000}, async function(){
    //Select Create Quote from Quotes menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.createQuotePage();
    //Clear Valid Until field value
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.quotesPage_clearfield();
});
When('Clicking Save button', {timeout:20000}, async function(){
    //Click save button
    await this.navigatePage.clickSave_Frame();
});
Then('Verify validation message is displayed for mandatory fields', {timeout:20000}, async function() {
    //Verify mandatory validations for Title and Valid Until fields 
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.quotesPage_MandatoryValidations(datasetQuote.ValidationMsgTitle,datasetQuote.ValidationMsgValidUntil);
});
//******************************************************************************************** */
//Scenario 3 : View Quotes
Given('S3 The user has logged into the application with valid username and password', {timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When('Selecting View Quotes from Quotes option',{timeout:20000}, async function(){
    //Select View Quote from Quotes menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.viewQuotesPage();
});
Then('Verify created Quotes is displayed in the View Quotes page', {timeout:20000}, async function(){
    //Verify the Quote is displayed in the table - Screenshot
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.viewQuotes_SCreenshot();
    //Select Quote to view
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.selectQuotesToVerify(datasetQuote.title);
    //Verify values in all fields are displayed correctly
    await this.validationPage.viewQuotes_VerifyFieldValues_Overview(datasetQuote.title,datasetQuote.approvalStatus,datasetQuote.opportunity,datasetQuote.quoteStage,datasetQuote.invoiceStatus,datasetQuote.paymentTerms,datasetQuote.approvalIssues);
    await this.validationPage.viewQuotes_VerifyFieldValues_Account(datasetQuote.billingAccount,datasetQuote.billingContact);

});
//********************************************************************************************* */
//Scenario 4 : View Quotes - Recently Viewed
Given('S4 The user has logged into the application with valid username and password',{timeout:50000}, async function(){
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);    
});
When('Selecting View Quotes and Recently Viewed from Quotes',{timeout:50000},async function(){
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.viewQuotesPage();
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.selectQuotesToVerify(datasetQuote.title);    
});
Then ('Verify Quotes is displayed in the recently viewed section',{timeout:50000}, async function(){
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.viewQuotes_RecentlyViewed(datasetQuote.title);
});
//****************************************************************************************************** */
//Scenario 5: Import Quotes
Given('S5 The user has logged into the application with valid username and password', {timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When ('Selecting Import Quotes from Quotes option',{timeout:20000}, async function(){
    //Select Import from Quotes menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.importQuotesPage();    
});
When ('Import Quotes - Downloading Import file template, modify and select the downloaded document,selecting Next and Import File in corresponding pages', {timeout:20000}, async function(){
    //Download FileTemplate in filepath
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.quotes_downloadImportFileTemplate(filePathQuotes);
    //Calling writeExcelTest function to create new quote entry
    await writeExcelTest(filePathQuotes, datasetQuote.newValue);
    //Import File - attach file to import
    await this.enterValuesPage.quotes_ImportFile(filePathQuotes);  
    await this.enterValuesPage.quotes_ImportFileStep1();
});
Then ('Verify the new Title added in csv file is displayed in the Step2: Confirm Import file Properties page',{timeout:20000}, async function(){
    //Verify the new Title added in csv file is displayed in the Step2: Confirm Import file Properties page
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.quote_VerifyTitleStep2(datasetQuote.newValue);     
});
When('Import Quotes - Click Next and Import buttons',{timeout:20000}, async function(){
    //Click Next and Import buttons
    await this.enterValuesPage.importQuotes_ClickButtons();    
});
Then('Verify import is successful and the new quote Title is displayed in Step5: View Import Details page',{timeout:20000}, async function(){
    //Verify import is successful and the new quote Title is displayed in Step5: View Import Details page
    await this.validationPage.importQuote_ValidateTitle_ImportPage(datasetQuote.newValue);    
});
When('Click Exit in Import Quotes page',{timeout:20000},async function(){
    await this.navigatePage.importQuote_ClickExit();   
});
Then('Verify the file is imported successfully and displayed in View Quotes page',{timeout:20000},async function(){
    //Verify new quote is imported successfully - View Quotes page
    await this.validationPage.verifyImportQuote(datasetQuote.newValue);     
});
//******************************************************************************************* */
//Scenario 6: Import Line Items
Given('S6 The user has logged into the application with valid username and password', {timeout:20000}, async function () {
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When('Selecting Import Line Items from Quotes option',{timeout:20000},async function(){
    //Select Import Line Item from Quotes menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.importLineItems();    
});
When('Import Line Items - Downloading Import file template, modify and select the downloaded document,selecting Next and Import File in corresponding pages',{timeout:20000}, async function(){
    //Download FileTemplate in filepath
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.quotes_downloadImportFileTemplate(filePathLI);

    //Calling writeExcelTest function to create new Line Item entry
    await writeExcelTest(filePathLI, datasetQuote.newServiceValue);

    //Import File - attach file to import
    await this.enterValuesPage.quotes_ImportFile(filePathLI); 
    await this.enterValuesPage.quotes_ImportFileStep1();    
});
Then('Verify the new Line Item added in csv file is displayed in the Step2: Confirm Import file Properties page',{timeout:20000}, async function(){
    //Verify the new Title added in csv file is displayed in the Step2: Confirm Import file Properties page
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.quote_VerifyTitleStep2(datasetQuote.newServiceValue);    
});
When('Import Line Items - Click Next and Import buttons',{timeout:20000},async function(){
    //Click Next and Import buttons
    await this.enterValuesPage.importQuotes_ClickButtons();    
});
Then('Verify import is successful and the new Line Item Title is displayed in Step5: View Import Details page',{timeout:20000}, async function(){
    //Verify import is successful and the new LineItem Title is displayed in Step5: View Import Details page
    await this.validationPage.importQuote_ValidateTitle_ImportPage(datasetQuote.newServiceValue);    
});
When('Click Exit in Import Line Item page',{timeout:20000},async function(){
    await this.navigatePage.importQuote_ClickExit();
});
Then('Verify the file is imported successfully',{timeout:20000}, async function(){
    //Verify new line item is imported successfully - View Line Items page
    await this.validationPage.verifyImportLineItems(datasetQuote.newServiceValue);    
});
//****************************************************************************** */
//Scenario 7 : Delete Quote
Given('S7 The user has logged into the application with valid username and password', {timeout:20000}, async function(){
    //Login into applications
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetQuote.username,datasetQuote.password);
});
When('Selecting Quotes and Deleting',{timeout:20000}, async function(){
    //Select View Quote from Quotes menu - Quotes to Delete
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.viewQuotesPage();
    //Filter the Quote to delete
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.filterQuote(datasetQuote.title);
    //Select checkbox and perform delete action
    await this.enterValuesPage.deleteQuote();
});
Then('Verify the Quote is deleted',{timeout:20000}, async function(){
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.verifyQuote_Delete();
});