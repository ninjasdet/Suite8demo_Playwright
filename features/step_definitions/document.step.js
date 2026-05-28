const {Given, When, Then } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager.js');
//const{POManager} = require('../../pageobjects_suite8demo/POManager.js');
//const datasetQuote = JSON.parse(JSON.stringify(require('../../utils/data/quotesTestData.json')));
const datasetDoc = JSON.parse(JSON.stringify(require('../../utils/data/documentsTestData.json')));
const path = require('path');
const writeExcelTest = require('../../pageobjects/writeExcelTest.js');
//const filePathQuotes = path.join(process.cwd(), 'utils', 'downloads', 'Quotes.csv');
//const filePathLI = path.join(process.cwd(), 'utils', 'downloads', 'LineItems.csv');
const filePathDoc = path.join(process.cwd(), 'utils', 'downloads', 'IncomeDocument.xlsx');

//Scenario 6 : Create Documents
Given('D1 The user has logged into the application with valid username and password',{timeout:20000}, async function(){
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetDoc.username,datasetDoc.password);    
});
When ('Selecting Create Documents from Documents option',{timeout:20000}, async function(){
    //Select Create Documents from Documents menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.createDocumentPage();    
});
When('Entering valid details in all fields Documents Page',{timeout:50000}, async function(){
    //Enter values in create document page
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.createDocument(filePathDoc, datasetDoc.titleName, datasetDoc.docType, datasetDoc.docCategory, datasetDoc.docSubCategory);

  
});
When('Saving in Documents page', {timeout:50000}, async function(){
    //Click save button
    await this.navigatePage.clickSave();  
})
Then('Verify document is created successfully', {timeout:50000}, async function(){
    //Verify Documents is created successfully
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.verifyDocument(datasetDoc.fileName);    
});
//***************************************************************************************** */
//Scenario 7 : Mandatory fields validation - File Name, Document Name, Revision
Given('D2 The user has logged into the application with valid username and password',{timeout:20000}, async function(){
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetDoc.username,datasetDoc.password);    
});
When ('Selecting Create Documents from Documents option and having blank values in File Name, Document Name, Revision fields and clicking save button',{timeout:20000}, async function(){
    //Select Create Documents from Documents menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.createDocumentPage();
    //Click save button
    await this.navigatePage.clickSave();
    //Clear revision field value
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.documentsPage_clearfield();
});
Then ('Verify validation message is displayed for mandatory fields in Documents page',{timeout:20000}, async function(){
    //Verify Validation Message for mandatory fields are displayed
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.documentsPage_MandatoryValidations(datasetDoc.msgFile,datasetDoc.msgDocName,datasetDoc.msgRevision);    
});
//************************************************************************ */
//Scenario 8 : View Documents
Given('D3 The user has logged into the application with valid username and password',{timeout:50000}, async function(){
    this.loginPage = await this.poManager.getLoginPage();
    await this.loginPage.navigateURL();
    await this.loginPage.loginToApp(datasetDoc.username,datasetDoc.password);    
});
When ('Navigating to Documents in Documents Page',{timeout:50000}, async function(){
    //Select View Documents from Documents menu
    this.navigatePage = this.poManager.getNavigatePage();
    await this.navigatePage.viewDocumentsPage();

    //Select Document toverify
    this.enterValuesPage = this.poManager.getEnterValuesPage();
    await this.enterValuesPage.selectDocToVerify(datasetDoc.fileName);
});
Then ('Verify created document is displayed in the Documents page',{timeout:50000}, async function(){
    //Verify field values 
    this.validationPage = this.poManager.getValidationPage();
    await this.validationPage.viewDocuments_VerifyFieldValues(datasetDoc.fileName,datasetDoc.docCategory,datasetDoc.docSubCategory);    
});