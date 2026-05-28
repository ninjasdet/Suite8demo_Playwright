const { title } = require("node:process");

class enterValuesPage{
    constructor(page){
        this.page = page;
        this.framePage =  page.frameLocator('[src*="index.php"]');
    }

    async createQuote_Overview(title,approvalStatus,opportunity,quoteStage,invoiceStatus,paymentTerms,approvalIssues){
        await this.framePage.locator('#name').fill(title);
        await this.framePage.locator('#approval_status').selectOption(approvalStatus);
        await this.framePage.locator('#opportunity').click();
        await this.framePage.locator('#opportunity').pressSequentially(opportunity);
        await this.framePage.locator('#stage').selectOption(quoteStage);
        await this.framePage.locator('#invoice_status').selectOption(invoiceStatus);
        await this.framePage.locator('#term').selectOption(paymentTerms);
        await this.framePage.locator('#approval_issue').fill(approvalIssues);
    }

    async createQuote_Account(billingAccount,billingContact){
        await this.framePage.locator('#billing_account').click();
        await this.framePage.locator('#billing_account').pressSequentially(billingAccount);
        await this.framePage.locator('#billing_contact').waitFor();
        await this.framePage.locator('#billing_contact').click();
        await this.framePage.locator('#billing_contact').pressSequentially(billingContact);
        await this.framePage.locator('#billing_address_street').click();
    }

    async createQuote_LineItems(groupName,serviceName,servicePrice,serviceDiscount,serviceVAT){
        await this.framePage.getByRole('button', { name: 'Add Group' }).click();
        await this.framePage.getByRole('button', { name: 'Add Service Line' }).click();
        await this.framePage.locator('#group0name').fill(groupName);
        await this.framePage.locator('#service_name0').fill(serviceName);
        await this.framePage.locator('.service_list_price').fill(servicePrice);
        await this.framePage.locator('.service_discount_text').fill(serviceDiscount);
        await this.framePage.locator('.service_vat_select').selectOption(serviceVAT);
    }

    async quotesPage_clearfield(){
        await this.framePage.locator('#expiration').clear();
    }

    async selectQuotesToVerify(title){
        //await this.page.locator('scrm-varchar-detail').filter({ hasText: 'QuoteTest' }).first().click();
        await this.page.locator('scrm-varchar-detail').filter({ hasText: title }).first().click();
    }

    async quotes_downloadImportFileTemplate(filePath){
        const downloadPromise = this.page.waitForEvent('download');
        await this.framePage.getByText('Download Import File Template', { exact: true }).click();
        const download = await downloadPromise;
        await download.saveAs(filePath);
    }

    async quotes_ImportFile(filePath){
        await this.framePage.locator('#userfile').setInputFiles(filePath);
    }

    async quotes_ImportFileStep1(){
        await this.framePage.getByTitle('Next >', { exact: true }).click();
        await this.page.waitForLoadState('networkidle');
        await this.framePage.locator('td[class="impSample"]').last().waitFor();
    }

    async importQuotes_ClickButtons(){
        //Click Next in Step2 Import file page
        await this.framePage.getByTitle('Next >', { exact: true }).click();
        await this.framePage.locator('#addrow').waitFor();
        //Click Next in Step3:Confirm Field Mapping page
        await this.framePage.getByTitle('Next >', { exact: true }).click();
        //Click Next in Step4:Check for Possible Duplicates Page
        await this.framePage.getByTitle('Import Now', { exact: true }).click();
    }

    async filterQuote(title){
        await this.page.locator('button[class*="filter-settings-button"]').click();
        await this.page.locator('scrm-varchar-filter[class*="ng-star-inserted"]').locator('input[type="text"]').nth(0).fill(title);
        await this.page.getByText('Search', { exact: true }).click();
        //await this.page.locator('scrm-label').filter({ hasText: 'Search' }).first().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('scrm-module-title[class="list-view-title"]').waitFor();
    }

    async deleteQuote(){
        await this.page.locator('span[class="checkmark"]').nth(1).waitFor();
        await this.page.locator('span[class="checkmark"]').nth(1).click();
        await this.page.locator('button').filter({ hasText: 'Bulk Action' }).last().click();
        await this.page.locator('div').filter({ hasText: 'Delete' }).last().click();
        await this.page.locator('div[role="document"]').getByRole('button', { name: 'Proceed' }).click();
    }

    async createDocument(filePath, titleName, docType, docCategory, docSubCategory){
        await this.page.locator('input[type="file"]').setInputFiles(filePath);
        await this.page.getByRole('textbox').nth(1).fill(titleName);
        await this.page.getByRole('combobox').nth(1).selectOption(docType);
        await this.page.getByRole('combobox').nth(2).selectOption(docCategory);
        await this.page.getByRole('combobox').nth(3).selectOption(docSubCategory);
        //await this.page.locator('form.create.field-layout').screenshot({path: 'tests/screenshot/Create_Documents.png'});
    }

    async documentsPage_clearfield(){
        await this.page.getByRole('textbox').nth(2).clear();
    }

    async selectDocToVerify(fileName){
        await this.page.locator('scrm-varchar-detail[class="ng-star-inserted"]').first().waitFor();
        const docToVerify = await this.page.locator('td[class*="column-document_name"]').locator('a[href*="documents"]').allInnerTexts();

        for(let i=0; i<docToVerify.length; i++){
            if (docToVerify[i].includes(fileName.split(".")[0])){
                await this.page.locator('td[class*="column-document_name"]').locator('a[href*="documents"]').nth(i).click();
            }
        }
    }
}
module.exports = {enterValuesPage};