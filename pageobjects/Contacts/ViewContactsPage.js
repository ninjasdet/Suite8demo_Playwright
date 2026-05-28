class ViewContactPage {
  constructor(page) {
    this.page = page;
  }

  async openContact(name) {
    await this.page.getByRole('link', { name }).click();
  }

  async getFullName() {
    return (await this.page.locator('span.dynamic-label').textContent())?.trim();
  }

}

module.exports = ViewContactPage;
