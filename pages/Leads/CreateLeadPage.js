class CreateLeadPage {
  constructor(page) {
    this.page=page;
    this.salutation=page.locator('select');
    this.firstName = page.getByRole('textbox').nth(1);
    this.lastName = page.getByRole('textbox').nth(2);
    this.officePhone = page.getByRole('textbox').nth(3);
    this.mobilePhone = page.locator('.dynamic-field-name-phone_mobile .form-control');
    this.department = page.locator('.dynamic-field-name-department .form-control');
    this.email = page.locator('.dynamic-field-name-email_address .form-control');
    this.primaryEmailCheckbox = page.locator('.dynamic-field-name-primary_address .checkbox-container input[type="checkbox"]').first();
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  async fillBasicInfo(first, last, office, mobile, dept, email) {
    await this.salutation.selectOption('Mr.');
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.officePhone.fill(office);
    await this.mobilePhone.fill(mobile);
    await this.department.fill(dept);
    await this.email.fill(email);
    await this.primaryEmailCheckbox.check();
  }

  async save() {
    await this.saveBtn.click();
  }
}   
module.exports = CreateLeadPage;