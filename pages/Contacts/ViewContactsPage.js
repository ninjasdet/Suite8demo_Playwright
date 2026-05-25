export class ViewContactPage {
  constructor(page) {
    this.page = page;
  }

  async openContact(name) {
    await this.page.getByRole('link', { name }).click();
  }

  async verifyContactHeader(name) {    
    const locator = this.page.locator('#full_name', { hasText: name });
    return await locator.isVisible();  
  }

  async getFullName() { 
  return (await this.page.locator('span.dynamic-label').textContent())?.trim();
}
  async verifyTabsVisible() {
    return await this.page.locator('.tab-content').isVisible();
  }
}
