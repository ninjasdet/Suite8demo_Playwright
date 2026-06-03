const path = require('path');

class ImportLeadsPage {
  constructor(page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');

    this.leadsMenu = page.locator('a', { hasText: /^Leads$/ });
    this.importLeadsLink = page.getByRole('link', { name: 'Import Leads' });

    this.headingStep1 = this.frame.getByRole('heading', { name: 'Step 1: Upload Import File' });
    this.downloadTemplate = this.frame.getByRole('link', { name: 'Download Import File Template' });
    this.selectFile = this.frame.getByRole('button', { name: 'Select file:' });
    this.createNewRecords = this.frame.getByText('Create new records and update');
    this.nextButton = this.frame.getByRole('button', { name: 'Next >' });
    this.importNowButton = this.frame.getByRole('button', { name: 'Import Now' });
    this.exitButton = this.frame.getByRole('button', { name: 'Exit' });
  }

  async openImportLeads() {
    await this.leadsMenu.hover();
    await this.importLeadsLink.click();
    await this.headingStep1.waitFor();
  }

  async downloadTemplateFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadTemplate.click()
    ]);

    const filename = download.suggestedFilename();
    const filePath = path.join(process.cwd(), filename);
    await download.saveAs(filePath);

    return filePath;
  }

  
  async uploadFile(filePath) {
    await this.selectFile.setInputFiles(filePath);
    await this.createNewRecords.click();
  }

  async clickNext(times = 3) {
    for (let i = 0; i < times; i++) {
      await this.nextButton.waitFor({ state: 'visible' });
      await this.nextButton.click();
      await this.page.waitForTimeout(5000);
      
    }
  }


  async importNow() {
    await this.importNowButton.click();
  }

  async verifyImported(lastName) {
    const link = this.frame.getByRole('link', { name: lastName });
    const text = await link.textContent();
    return text.includes(lastName);
  }

  async exit() {
    await this.exitButton.click();
  }
}

module.exports = ImportLeadsPage;