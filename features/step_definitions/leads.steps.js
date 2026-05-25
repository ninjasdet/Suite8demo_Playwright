const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const LeadsPage = require('../../pages/Leads/LeadsPage.js');
const CreateLeadPage = require('../../pages/Leads/CreateLeadPage.js');
const ImportVCardLeadPage = require('../../pages/Leads/ImportVCardLeadPage.js');
const ImportLeadsPage = require('../../pages/Leads/ImportLeadsPage.js');
const TestData = require('../../data/testdata.json');
const { generateVCard, randomNameString, writeEmptyFile, writeCsvTest } = require('../../utils/helper.js');

setDefaultTimeout(60 * 1000);

function initLeadsPages(world) {
    if (!world.leads) {
        world.leads = new LeadsPage(world.page);
        world.createLead = new CreateLeadPage(world.page);
        world.importVCardPage = new ImportVCardLeadPage(world.page);
        world.importLeadsPage = new ImportLeadsPage(world.page);
    }
}    

/* -------------------------------
   CREATE LEADS FLOW
-------------------------------- */

When('the user fills in all the required lead details on the Create Lead page', async function () {
    initLeadsPages(this);
    console.log('Scenario: Create a new lead with all required fields filled in');

    await this.leads.clickCreateLead();
    console.log('Create Lead page opened successfully');
    await this.createLead.fillBasicInfo(
        TestData.firstName,
        TestData.lastName,
        TestData.mobile,
        TestData.phone,
        TestData.department,
        TestData.email
    );
});

When('the user fills in the Lead details but leaves the required field {string} empty on the Create Lead page', async function (missingField) {
    initLeadsPages(this);
    console.log(`Scenario: Create a new lead with missing required fields: ${missingField}`);

    await this.leads.clickCreateLead();
    // Leave Last Name empty if specified
    const lastName = missingField === 'Last Name' ? '' : TestData.lastName;

    await this.createLead.fillBasicInfo(
        TestData.firstName,
        lastName,
        TestData.mobile,
        TestData.phone,
        TestData.department,
        TestData.email
    );
}
);

When('the user clicks the Save button on the Create Lead page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the user clicks the Save button');
    await this.createLead.save();
});

Then('the new Lead should be created successfully', async function () {
    initLeadsPages(this);
    console.log('Executing step: the new lead should be created successfully');
    await this.page.waitForURL(/\/leads\/record\//);

});

Then('the user should see an error message indicating the missing required field on the Create Lead page',
    async function () {
        initLeadsPages(this);
        console.log('Executing step: the user should see an error message indicating the missing required field');

        const errorLocator = this.page.locator('.invalid-feedback, .error-message');
        await expect(errorLocator.first()).toBeVisible();
    }
);

Then('the lead should not be created', async function () {
    initLeadsPages(this);
    console.log('Executing step: the lead should not be created');

    await expect(this.page).not.toHaveURL(/\/leads\/record\//);
});

/* -------------------------------
   IMPORT LEAD FROM VCARD FLOW
-------------------------------- */
When('the user uploads a valid vCard file on the Import lead from vCard page', async function () {
    initLeadsPages(this);
    console.log('Scenario: Create a new lead by importing a vCard');

    await this.leads.clickImportVCardLeads();

    // Generate a vCard dynamically
    const vcardPath = generateVCard(
        TestData.firstName,
        TestData.lastName,
        TestData.email,
        TestData.mobile
    );

    // Upload the vCard file

    await this.importVCardPage.uploadVCard(vcardPath);
});

When('the user clicks the "Import vCard" button on the Import lead from vCard page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the user clicks the "Import vCard" button');
    await this.importVCardPage.clickImport();

});

Then('the lead should be created successfully', async function () {
    // Redirects to record view page    
    console.log('Executing step: the lead should be created successfully');
    await this.page.waitForURL(/\/leads\/record\//, { timeout: 20000 });
    await this.page.locator('span.dynamic-label').waitFor({ state: 'visible' });
});

/* -------------------------------
   VIEW LEAD FLOW
-------------------------------- */
When('the user clicks on the specific lead button on the view leads page', async function () {
    initLeadsPages(this);
    console.log('Scenario: View Lead details');

    await this.leads.clickViewLeads();
    console.log('lead name: ' + TestData.leadfullname);
    await this.leads.openLead(TestData.leadfullname);
    
});

Then('the lead full name should be visible in the lead record page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the lead name should be visible in the lead record page');

    await this.page.waitForURL(/\/leads\/record\//, { timeout: 50000 });    

    const leadRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();        
    expect(leadRecordName).toContain(TestData.leadfullname);    
});

/* -------------------------------
   RECENTLY VIEWED LEAD FLOW
-------------------------------- */
Then('the lead should be listed in the recently viewed menu', async function () {
    initLeadsPages(this);
    console.log('Scenario: Recently Viewed Lead');

    await this.leads.clickRecentlyViewedLead();

    expect(await this.leads.isNameVisible(TestData.leadfullname)).toBeTruthy();

});

/* -------------------------------
   IMPORT LEAD FLOW
-------------------------------- */
When('the user uploads a valid file on the Import Leads page', async function () {
    initLeadsPages(this);
    console.log('Scenario: Import Leads with valid file');

    await this.leads.clickImportLeads();

    const filePath = await this.importLeadsPage.downloadTemplateFile();

    const lastName = randomNameString(8);
    const newLeadContent = `"${randomNameString(6)}","${lastName}"`;

    writeCsvTest(filePath, newLeadContent);
    console.log(`file path: ${filePath}`);

    await this.importLeadsPage.uploadFile(filePath);


});

When('the user selects create new records and update existing records and clicks on next button for all 3 steps and clicks on Import Now button on the Import Leads page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the user selects create new records and update existing records and clicks on next button');
    await this.importLeadsPage.clickNext(3);
    await this.importLeadsPage.importNow();

});

When('the user uploads a invalid file on the Import Leads page', async function () {
    initLeadsPages(this);
    console.log('Scenario: Import Leads with invalid file');

    await this.leads.clickImportLeads();

    const filePath = writeEmptyFile();
    console.log(`file path: ${filePath}`);

    await this.importLeadsPage.uploadFile(filePath);

});

Then('the user should view the Import Results screen with new lead details', async function () {
    initLeadsPages(this);
    console.log('Executing step: the user should view the Import Results screen with new lead details');

    await this.page.waitForURL(/import\/Last/, { timeout: 20000 });
    const frame = this.page.frameLocator('iframe');
    await expect(frame.locator('h2.module-title-text')).toHaveText('Step 5: View Import Results');
    //await expect(frame.locator('#finished')).toBeVisible();
});

Then('the user should see the Invalid import file name Message on the Import Leads page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the user should see the Invalid import file name Message on the Import Leads page');

    await this.importLeadsPage.clickNext(1);
    const frame = this.page.frameLocator('iframe');
    await expect(frame.locator('#importMsgWindow_h')).toHaveText('Error');

});

/* -------------------------------
   COMMON VALIDATION FLOW
-------------------------------- */
Then('the lead name should be visible in the lead record page', async function () {
    initLeadsPages(this);
    console.log('Executing step: the lead name should be visible in the lead record page');

    const leadRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();    
    const fullLeadName = `${TestData.firstName} ${TestData.lastName}`;
    expect(leadRecordName).toContain(fullLeadName);    
});