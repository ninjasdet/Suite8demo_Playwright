const {Given, When, Then ,setDefaultTimeout } = require('@cucumber/cucumber');
const {loginPage} = require('../../pageobjects/loginPage.js');
const {navigatePage} = require('../../pageobjects/navigatePage.js');
const {enterValuesPage} = require('../../pageobjects/enterValuesPage.js');
const {POManager} = require('../../pageobjects/POManager.js');
const {validationPage} = require('../../pageobjects/validationPage.js');
const datajson = JSON.parse(JSON.stringify(require('../../utils/data/opportunitieTestData.json')));
const path = require('path');
const filepath= path.join(process.cwd(),'utils','downloads','Opportunities.csv');
const writeCsvTest  = require('../../utils/cvstest.js');

  setDefaultTimeout(60 * 1000);

Given('user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
           //Login into applications
               this.loginPage = await this.poManager.getLoginPage();
                 await this.loginPage.navigateURL();
                 await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Opportunities module and click on create opportunity and enter details and click on save button.',async function () {
            this.navigatePage = await this.poManager.getNavigatePage();
            this.enterValuesPage = await this.poManager.getEnterValuesPage();
            await this.navigatePage.createOpportunitiesPage();
            await this.enterValuesPage.createOpportunities(
           datajson.opportunitieName,
           datajson.opportunitieAmount,
           datajson.salesStage,
           datajson.probability,
           datajson.accountName,
           datajson.expectedcloseDate,
           datajson.type,
           datajson.leadsource
  );
         });

Then('The user should able to see the created opportunities details.', async function () {
           
      this.validationPage = await this.poManager.getValidationPage();  
      await this.validationPage.verifyOpportunitie(datajson.opportunitieName);

         });
//EmptyOpportunityName 
Given('S1 user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
                 this.loginPage = await this.poManager.getLoginPage();
                 await this.loginPage.navigateURL();
                 await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Opportunities module and click on create opportunitie and enter the details with mandatory fileds empty and click on save button.', async function () {
           this.navigatePage = await this.poManager.getNavigatePage();
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.navigatePage.createOpportunitiesPage();
           await this.enterValuesPage.opportunitieNameValidation();
         });

Then('The user should able to see error messages under the mandatory fileds.', async function () {
           this.validationPage = await this.poManager.getValidationPage(); 
            await this.validationPage.VerifyOpportunitieMandatoryFileds();
         });

//ViewOpportunities
Given('S2 user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
         this.loginPage = await this.poManager.getLoginPage();
                 await this.loginPage.navigateURL();
                 await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Opportunities module and click on view opportunities.', async  function () {
        this.navigatePage = await this.poManager.getNavigatePage();
         await this.navigatePage.viewOpportunitiesPage();  

         });

Then('The user should able to see the opportunities details in the list.',async  function () {
           this.validationPage = await this.poManager.getValidationPage();   
         await this.validationPage.VerifyViewOpportunitieDetails(
          datajson.opportunitieName,
          datajson.opportunitieAmount,
          datajson.salesStage,
          datajson.accountName); 
         });



//@RecentlyViewedOpportunities

Given('S3 user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);

         });

When('The user clicks on Opportunities module and click on the viewopportunities.', async  function () {
        this.navigatePage = await this.poManager.getNavigatePage();
         await this.navigatePage.viewOpportunitiesPage();  

         });

When('The user should  see the opportunities details in the list and  again click on the opportunities module.', async function () {
        this.enterValuesPage = await this.poManager.getEnterValuesPage();   
       await this.enterValuesPage.RecentviewOpportunities(datajson.opportunitieName)

         });

Then('The user able to see the recently viewed opportunities details.', async function () {
          this.validationPage = await this.poManager.getValidationPage();
        await this.validationPage.VerifyRecentViewOpportunitieDetails(datajson.opportunitieName)
         });
  //UpdateOpportunities     

Given('S4user signs into the Login page using valid username and password following which navigates to the Home page.',async  function () {
           this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);

         });

When('The user clicks on Opportunities module and click on viewopportunities.', async  function () {
        this.navigatePage = await this.poManager.getNavigatePage();
         await this.navigatePage.viewOpportunitiesPage();  

         });
When('The user click on opportunities and click on edit button and update the details and click on save button.',async function () {
            this.validationPage = await this.poManager.getValidationPage();
           await this.validationPage.UpdateViewOpportunitieDetails(
                datajson.opportunitieName,
                datajson.newOpportunitieName);

         });
Then('The user should able to see the updated opportunities details.', async function () {
          
                this.enterValuesPage = await this.poManager.getEnterValuesPage();
                this.validationPage = await this.poManager.getValidationPage();
                 await this.validationPage.VerifyUdateOpportunitieDetails(datajson.newOpportunitieName);

         });
//ImportOpportunities

Given('S5 user signs into the Login page using valid username and password following which navigates to the Home page.', async function () {
               this.loginPage = await this.poManager.getLoginPage();
           await this.loginPage.navigateURL();
           await this.loginPage.loginApp(datajson.username, datajson.password);
         });

When('The user clicks on Opportunities module and click on import Opportunities.', async function () {
            this.navigatePage = await this.poManager.getNavigatePage();
           await this.navigatePage.importOpportunitiePage();
         });

When('Start to type your When step here click on Download Import File Template and edit the file and save the file.', async function () {
           
          this.enterValuesPage = await this.poManager.getEnterValuesPage();
          await this.enterValuesPage.accounts_downloadImportFileTemplate();
          await writeCsvTest(filepath, datajson.importNewValue);

         });

When('click on choose file and uploads a valid CSV file.', async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.enterValuesPage.Opportunitie_ImportFile(filepath);
         });

 When('click on the next button and click on next button and click on next button and click on import now button.', async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.enterValuesPage.Opportunitie_ImportClickButtons();
         });

Then('The user should able to see the viewimport results.', async function () {
           this.enterValuesPage = await this.poManager.getEnterValuesPage();
           await this.enterValuesPage.ImportOpportunitieValidation(datajson.importNewValue);

         });




        