const { expect } = require('@playwright/test');

class enterValuesPage {
    constructor(page) {
        this.page = page;
    }

    async createAccount(accountName,website,email,billingStreet,billingPostalCode,billingCity,billingState,billingCountry,phoneNumber,shippingStreet,shippingPostalCode,shippingCity,shippingState,shippingCountry) {
        await this.page.getByRole('textbox').nth(1).fill(accountName);
        await this.page.getByRole('textbox').nth(2).fill(website);
        await this.page.locator('scrm-composite-field').getByRole('textbox').fill(email);
        await this.page.locator('scrm-group-field').filter({ hasText: 'Billing Street Billing Postal' }).locator('textarea').fill(billingStreet);
        await this.page.locator('input[type="text"]').nth(5).fill(billingPostalCode);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-billing_address_city > .d-flex > .flex-grow-1 > .form-control').fill(billingCity);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-billing_address_state > .d-flex > .flex-grow-1 > .form-control').fill(billingState);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-billing_address_country > .d-flex > .flex-grow-1 > .form-control').fill(billingCountry);
        await this.page.getByRole('textbox').nth(3).fill(phoneNumber);
        await this.page.locator('scrm-group-field').filter({ hasText: 'Shipping Street Shipping' }).locator('textarea').fill(shippingStreet);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-shipping_address_postalcode > .d-flex > .flex-grow-1 > .form-control').fill(shippingPostalCode);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-shipping_address_city > .d-flex > .flex-grow-1 > .form-control').fill(shippingCity);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-shipping_address_state > .d-flex > .flex-grow-1 > .form-control').fill(shippingState);
        await this.page.locator('.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-shipping_address_country > .d-flex > .flex-grow-1 > .form-control').fill(shippingCountry);
         await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(5000);
    }
    

    async save() {
         await this.page.getByRole('button', { name: 'Save', exact: true }).click();
    }

    async Namevalidation(emptyAccountName) {
        await this.page.getByRole('textbox').nth(1).fill(emptyAccountName);
    }

    async accounts_downloadImportFileTemplate(){
        const download = await Promise.all([
    this.page.waitForEvent('download'),
    this.page.locator('iframe').contentFrame().getByRole('link', { name: 'Download Import File Template' }).click(),
  ])
  const filename = download[0].suggestedFilename();
  await download[0].saveAs('utlis/downloads/' + filename);

    }

    async accounts_ImportFile(filepath){
        await this.page.locator('iframe').contentFrame().locator('input[type="file"]')
  .setInputFiles(filepath);

    }

    async accounts_ImportClickButtons(){
  await this.page.waitForTimeout(5000)
  await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
  await this.page.waitForTimeout(3000);
  await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
  await this.page.waitForTimeout(3000);
  await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
  await this.page.waitForTimeout(5000);
  await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Import Now' }).click();
    }

    async accounts_ImportaccountValidation(ImportNewValue){
          await this.page.waitForLoadState('networkidle');
          await this.page.waitForTimeout(5000);
          expect(await this.page.locator('iframe').contentFrame().getByRole('link', { name: ImportNewValue}).textContent()).toContain(ImportNewValue);
    }

    async createOpportunities(opportunitieName,opportunitieAmount,salesStage,probability, accountName,expectedcloseDate,type,leadsource){
  await this.page.getByRole('textbox').nth(1).fill(opportunitieName);
  await this.page.locator('scrm-currency-edit').getByRole('textbox').fill(opportunitieAmount);
  await this.page.locator('scrm-dropdownenum-edit').filter({ hasText: 'Prospecting Qualification' }).getByRole('combobox')
    .selectOption(salesStage);
  await this.page.getByRole('textbox').nth(4).fill(probability);
  await this.page.waitForTimeout(3000);
  await this.page.locator('#pn_id_1').getByRole('button', { name: 'dropdown trigger' }).click();
  await this.page.locator('#pn_id_1').getByRole('textbox').pressSequentially('dav');
  await this.page.getByRole('option', { name: accountName }).first().click();
  await this.page.waitForTimeout(3000);
  await this.page.getByRole('textbox', { name: 'yyyy-mm-dd' }).fill(expectedcloseDate);
  await this.page.locator('scrm-dropdownenum-edit').filter({ hasText: 'Existing Business New Business' }).getByRole('combobox').selectOption(type);
  await this.page.locator('scrm-dropdownenum-edit').filter({ hasText: 'Cold Call Existing Customer' }).getByRole('combobox').selectOption(leadsource);
  await this.page.waitForTimeout(3000);
  await this.page.getByRole('button', { name: 'Save', exact: true }).click();
     }


     async opportunitieNameValidation(){ 
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
     }

     async Opportunitie_ImportFile(filepath){
        await this.page.locator('iframe').contentFrame().locator('input[type="file"]')
  .setInputFiles(filepath);
     }

    async Opportunitie_ImportClickButtons(){
    await this.page.waitForTimeout(5000);
    await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Import Now' }).click();

     }


    async ImportOpportunitieValidation(ImportNewValue){
      expect(await this.page.locator('iframe').contentFrame().getByRole('cell', { name: ImportNewValue }).textContent()).toContain(ImportNewValue);
    }

    async RecentviewOpportunities(opportunitieName){
         await this.page.getByRole('link', { name: opportunitieName }).first().click();
         await this.page.waitForTimeout(5000);
         await this.page.locator('a').nth(1).click()
         await this.page.waitForTimeout(3000);
         await this.page.locator('a').nth(5).click();
         await this.page.waitForTimeout(3000);
         await this.page.getByRole('navigation').getByRole('link', { name: opportunitieName }).click();
         
    }


    async RecentviewAccounts(accountName){
        await this.page.locator('scrm-field').filter({ hasText: accountName }).first().click();
         await this.page.waitForTimeout(5000);
         await this.page.locator('a').nth(1).click()
         await this.page.waitForTimeout(3000);
         await this.page.locator('a').nth(5).click();
         await this.page.waitForTimeout(5000);
         await this.page.getByRole('navigation').getByRole('link', { name: accountName }).first().click();
    }
        

}
module.exports = {enterValuesPage};