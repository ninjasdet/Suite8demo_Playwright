const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const ContactPage = require('../../pageobjects/Contacts/ContactPage.js');
const CreateContactPage = require('../../pageobjects/Contacts/CreateContactPage.js');
const ImportVCardPage = require('../../pageobjects/Contacts/ImportVCardContactPage.js');
const ImportContactsPage = require('../../pageobjects/Contacts/ImportContactPage.js');
const ViewContactsPage = require('../../pageobjects/Contacts/ViewContactsPage.js');
const TestData = require('../../utils/data/contactsTestData.json');
const { generateVCard, writeEmptyFile, writeCsvTest } = require('../../pageobjects/helper.js');

setDefaultTimeout(60 * 1000);

function initContactPages(thispage) {
    const page = thispage.page;

    thispage.contacts = new ContactPage(page);
    thispage.create = new CreateContactPage(page);
    thispage.importVCardPage = new ImportVCardPage(page);
    thispage.importContactsPage = new ImportContactsPage(page);
    thispage.viewContactsPage= new ViewContactsPage(page);
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

    await this.create.fillBasicInfo(
        TestData.firstName,
        '', // Leave Last Name empty
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


Then('the user should see an error message indicating the missing required field', async function () {
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
    await this.page.waitForURL(/\/contacts\/record\//);

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

Then('the contact full name should be visible in the contact record page', async function () {
    initContactPages(this);
    console.log('Executing step: the contact full name should be visible in the contact record page');
    
    //const contactRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();
    const contactRecordName = await this.viewContactsPage.getFullName();
    expect(contactRecordName).toContain(TestData.contactfullname);
});

/* -------------------------------
   IMPORT CONTACTS FLOW
-------------------------------- */
When('the user uploads a valid file on the Import Contacts page', async function () {
    initContactPages(this);
    console.log('Scenario: Import Contacts with valid file');

    await this.contacts.clickImportContacts();

    const filePath = await this.importContactsPage.downloadTemplateFile();
    
    const newContactContent = `"${TestData.importfirstname}","${TestData.importlastname}","${TestData.mobile}","${TestData.phone}","${TestData.department}","${TestData.email}"`;

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
   COMMON VALIDATION FLOW FOR CREATE CONTACT FLOW AND IMPORT CONTACT FROM VCARD FLOW
-------------------------------- */

Then('the contact last name should be visible in the contact record page', async function () {
    initContactPages(this);
    console.log('Executing step: the contact full name should be visible in the contact record page');

    const contactRecordName = (await this.page.locator('span.dynamic-label').innerText()).trim();    
    expect(contactRecordName).toContain(TestData.lastName);
});

