class ImportVCardContactPage {
  constructor(page) {
    this.page=page;   
    this.vcardInput = page.locator('iframe').contentFrame().getByRole('button', { name: 'Choose File' });
    this.importButton = page.locator('iframe').contentFrame().getByRole('button', { name: 'Import vCard' });
  }

  async uploadVCard(filePath) {
    await this.vcardInput.setInputFiles(filePath);
    await this.page.waitForTimeout(5000);
  }

  async clickImport() {
    await this.importButton.click();
    //await this.page.waitForURL(/\/contacts\/record\//);    
  }
}

module.exports = ImportVCardContactPage;