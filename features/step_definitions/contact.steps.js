const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const ContactPage = require('../../pages/Contacts/ContactPage.js');
const CreateContactPage = require('../../pages/Contacts/CreateContactPage.js');
const ImportVCardPage = require('../../pages/Contacts/ImportVCardContactPage.js');
const ImportContactsPage = require('../../pages/Contacts/ImportContactPage.js');


const TestData = require('../../data/testdata.json');
const { generateVCard, randomNameString, writeEmptyFile, writeCsvTest } = require('../../utils/helper.js');

setDefaultTimeout(60 * 1000);

function initContactPages(world) {
    if (!world.contacts) {
        world.contacts = new ContactPage(world.page);
        world.create = new CreateContactPage(world.page);
        world.importVCardPage = new ImportVCardPage(world.page);
        world.importContactsPage = new ImportContactsPage(world.page);
    }
}

/* -------------------------------
   CREATE CONTACT FLOW
-------------------------------- */

When('the user fills in all the required contact details on the Create Contact page', async function () {
    
    initContactPages(this);
    console.log('Scenario: Create a new contact with all required fields filled in');

    await this.contacts.clickCreateContact();
    await this.create.fillBasicInfo(
        TestData.firstName,
        TestData.lastName,
        TestData.mobile,
        TestData.phone,
        TestData.department,
        TestData.email
    );
});

When('the user fills in the contact details but leaves the required field {string} empty on the Create Contact page', async function (missingField) {
    initContactPages(this);
    console.log(`Scenario: Create a new contact with missing required fields: ${missingField}`);

    await this.contacts.clickCreateContact();
    // Leave Last Name empty if specified
    const lastName = missingField === 'Last Name' ? '' : TestData.lastName;

    await this.create.fillBasicInfo(
        TestData.firstName,
        lastName,
        TestData.mobile,
        TestData.phone,
        TestData.department,
        TestData.email
    );
}
);

When('the user clicks the Save button', async function () {
    initContactPages(this);
    console.log('Executing step: the user clicks the Save button');
    await this.create.save();
});

Then('the new contact should be created successfully', async function () {
    initContactPages(this);
    console.log('Executing step: the new contact should be created successfully');
    await this.page.waitForURL(/\/contacts\/record\//);

});

/* -------------------------------
   IMPORT VCARD FLOW
-------------------------------- */
When('the user uploads a valid vCard file on the Import vCard page', async function () {
    initContactPages(this);
    console.log('Scenario: Create a new contact by importing a vCard');

    await this.contacts.clickImportVCardContacts();

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

When('the user clicks the "Import vCard" button', async function () {
    initContactPages(this);
    console.log('Executing step: the user clicks the "Import vCard" button');
    await this.importVCardPage.clickImport();

});

Then('the contact should be created successfully', async function () {
    // Redirects to record view page    
    console.log('Executing step: the contact should be created successfully');
    await this.page.waitForURL(/\/contacts\/record\//, { timeout: 20000 });
    await this.page.locator('span.dynamic-label').waitFor({ state: 'visible' });
});

/* -------------------------------
   VIEW CONTACT FLOW
-------------------------------- */
When('the user clicks on the specific contact button on the view contacts page', async function () {
    initContactPages(this);
    console.log('Scenario: View Contact details');

    await this.contacts.clickViewContacts();

    //await this.page.waitForURL(/\/contacts\/index\//, { timeout: 50000 });    
    await this.contacts.openContact(TestData.contactfullname);
});

/* -------------------------------
   IMPORT CONTACTS FLOW
-------------------------------- */
When('the user uploads a valid file on the Import Contacts page', async function () {
    initContactPages(this);
    console.log('Scenario: Import Contacts with valid file');

    await this.contacts.clickImportContacts();

    const filePath = await this.importContactsPage.downloadTemplateFile();

    const lastName = randomNameString(8);
    const newContactContent = `"${randomNameString(6)}","${lastName}"`;

    writeCsvTest(filePath, newContactContent);
    console.log(`file path: ${filePath}`);

    await this.importContactsPage.uploadFile(filePath);


});

When('the user selects create new records and update existing records and clicks on next button for all 3 steps and clicks on Import Now button', async function () {
    initContactPages(this);
    console.log('Executing step: the user selects create new records and update existing records and clicks on next button');
    await this.importContactsPage.clickNext(3);
    await this.importContactsPage.importNow();

});

When('the user uploads a invalid file on the Import Contacts page', async function () {
    initContactPages(this);
    console.log('Scenario: Import Contacts with invalid file');

    await this.contacts.clickImportContacts();

    const filePath = writeEmptyFile();
    console.log(`file path: ${filePath}`);

    await this.importContactsPage.uploadFile(filePath);

});

Then('the user should view the Import Results screen with new contact details', async function () {
    initContactPages(this);
    console.log('Executing step: the user should view the Import Results screen with new contact details');

    await this.page.waitForURL(/import\/Last/, { timeout: 20000 });
    const frame = this.page.frameLocator('iframe');
    await expect(frame.locator('h2.module-title-text')).toHaveText('Step 5: View Import Results');
    //await expect(frame.locator('#finished')).toBeVisible();
});

Then('the user should see the Invalid import file name Message', async function () {
    initContactPages(this);
    console.log('Executing step: the user should see the Invalid import file name Message');

    await this.importContactsPage.clickNext(1);
    const frame = this.page.frameLocator('iframe');
    await expect(frame.locator('#importMsgWindow_h')).toHaveText('Error');

});

/* -------------------------------
   RECENTLY VIEWED CONTACT FLOW
-------------------------------- */
Then('the contact should be listed in the recently viewed menu', async function () {
    initContactPages(this);
    console.log('Scenario: Recently Viewed Contact');

    await this.contacts.clickRecentlyViewedContact();

    expect(await this.contacts.isNameVisible(TestData.contactfullname)).toBeTruthy();

});

/* -------------------------------
   VALIDATIONS
-------------------------------- */

Then('the contact last name should be visible in the contact record page', async function () {
    initContactPages(this);
    console.log('Executing step: the contact full name should be visible in the contact record page');

    const contactRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();
    //expect(contactRecordName).toContain(TestData.firstName);
    expect(contactRecordName).toContain(TestData.lastName);
});

Then('the contact full name should be visible in the contact record page', async function () {
    initContactPages(this);
    console.log('Executing step: the contact full name should be visible in the contact record page');

    const contactRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();
    expect(contactRecordName).toContain(TestData.contactfullname);
});

Then('the user should see an error message indicating the missing required field',
    async function () {
        initContactPages(this);
        console.log('Executing step: the user should see an error message indicating the missing required field');

        const errorLocator = this.page.locator('.invalid-feedback, .error-message');
        await expect(errorLocator.first()).toBeVisible();
    }
);

Then('the contact should not be created', async function () {
    initContactPages(this);
    console.log('Executing step: the contact should not be created');

    await expect(this.page).not.toHaveURL(/\/contacts\/record\//);
});
