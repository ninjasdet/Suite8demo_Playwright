class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactsMenu = page.locator('a').filter({ hasText: /^Contacts$/ }).first();
    this.createContactLink = page.getByRole('link', { name: 'Create Contact', exact: true }).first();
    this.viewContactLink = page.getByRole('link', { name: 'View Contacts' }).first();
    this.importContactsLink = page.getByRole('link', { name: 'Import Contacts' }).first();
    this.importVCardContactsLink = page.getByText('Create Contact From vC', { exact: false }).first();
    this.recentlyViewedContactLink = page.getByText(' Recently Viewed ', { exact: false }).first();
  }
  
  async openContactsMenu() {
    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();
  }

  async clickCreateContact() {

    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();

    await this.createContactLink.waitFor({ state: 'visible' });
    await this.createContactLink.click();

   
  }

  async clickImportVCardContacts() {
    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();

    await this.importVCardContactsLink.waitFor({ state: 'visible' });
    await this.importVCardContactsLink.click();

  }

  async clickViewContacts() {
    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();

    await this.viewContactLink.waitFor({ state: 'visible' });
    await this.viewContactLink.click();
  }

  async clickImportContacts() {
    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();

    await this.importContactsLink.waitFor({ state: 'visible' });
    await this.importContactsLink.click();
  }

  async clickRecentlyViewedContact() {
    await this.contactsMenu.waitFor({ state: 'visible' });
    await this.contactsMenu.click();

    await this.recentlyViewedContactLink.waitFor({ state: 'visible' });
    await this.recentlyViewedContactLink.click();
  }

  getNameLocator(name) {
    //return this.page.locator('scrm-field.field-name-name a.field-link', { hasText: name }).first();
    return this.page.locator('a.field-link', { hasText: name }).first();
  }

  async openContact(name) {
    await this.getNameLocator(name).click();
  }

  async isNameVisible(name) {
    return await this.page.locator('ul.dropdown-menu.submenu span', { hasText: new RegExp(`^${name}$`) }).first().isVisible();
  }


}
module.exports = ContactPage;



