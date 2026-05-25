class ImportVCardContactPage {
  constructor(page) {
    this.page=page;   
    this.vcardInput = page.locator('iframe').contentFrame().getByRole('button', { name: 'Choose File' });
    this.importButton = page.locator('iframe').contentFrame().getByRole('button', { name: 'Import vCard' });
  }

  async uploadVCard(filePath) {
    //await this.vcardInput.waitFor({ state: 'attached' });
    await this.vcardInput.setInputFiles(filePath);
  }

  async clickImport() {
    await this.importButton.click();
  }
}

module.exports = ImportVCardContactPage;