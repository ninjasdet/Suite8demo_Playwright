class ImportVCardContactPage {
  constructor(page) {
    this.page=page;   
    this.vcardInput = page.locator('iframe').contentFrame().getByRole('button', { name: 'Choose File' });
    this.importButton = page.locator('iframe').contentFrame().getByRole('button', { name: 'Import vCard' });
    this.errorMessage = page.locator('iframe').contentFrame().locator('div.error');
  }

  async uploadVCard(filePath) {
    await this.vcardInput.setInputFiles(filePath);
    await this.page.waitForTimeout(5000);
  }

  async clickImport() {
    await this.importButton.click();
    //await this.page.waitForURL(/\/contacts\/record\//);    
  }

  async getErrorMessage() {
    await this.page.waitForURL(/\/contacts\/Importvcard\?error=vcardErrorRequired/i, { timeout: 15000 });
    return await this.errorMessage.textContent();
  }
}

module.exports = ImportVCardContactPage;