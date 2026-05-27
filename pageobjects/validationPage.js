const { expect } = require('@playwright/test');
class validationPage{
    constructor(page){
        this.page = page;
        this.framePage =  page.frameLocator('[src*="index.php"]');
    }

    async verifyQuote(title){
        await this.page.waitForLoadState('networkidle');
        await expect(this.framePage.locator('.module-title-text')).toContainText(title);
    }

    async quote_VerifyTitleStep2(newValue){
            expect(await this.framePage.locator('td[class="impSample"]').allInnerTexts()).toContain(newValue);
    }

    async importQuote_ValidateTitle_ImportPage(newValue){
        expect(await this.framePage.locator('a[href*="quotes"]').textContent()).toContain(newValue);
    }

    async verifyImportQuote(newValue){
        await this.page.locator('.list-view-title').waitFor();
        await this.page.locator('scrm-varchar-detail[class ="ng-star-inserted"]').first().waitFor();
        expect(await this.page.locator('scrm-varchar-detail[class ="ng-star-inserted"]').first().textContent()).toContain(newValue);
    }

    async verifyImportLineItems(newServiceValue){
        await this.page.locator('.list-view-title').waitFor();
        await this.page.locator('a[href*="products-quotes"]').first().waitFor();
        expect(await this.page.locator('a[href*="products-quotes"]').first().textContent()).toContain(newServiceValue);
    }
    async quotesPage_MandatoryValidations(ValidationMsgTitle,ValidationMsgValidUntil){
        await expect(this.framePage.locator('.validation-message').first()).toContainText(ValidationMsgTitle);
        await expect(this.framePage.locator('.validation-message').last()).toContainText(ValidationMsgValidUntil);
    }

    async viewQuotes_SCreenshot(){
        await expect(this.page.locator('.list-view-table')).toBeVisible();
        await this.page.locator('.list-view-table').screenshot({path: 'tests/screenshot/view_quotes.png'});
    }

    async verifyQuote_Delete(){
        await expect(this.page.getByText('No results found.', { exact: true })).toBeVisible();
    }

    async verifyDocument(fileName){
        await this.page.waitForLoadState('networkidle');
        await this.page.getByText('Document Revisions', { exact: true }).waitFor();
        expect(await this.page.locator('span[class*="uploaded-file-name"]').nth(0).getAttribute('title')).toContain(fileName);

    }

    async documentsPage_MandatoryValidations(msgFile,msgDocName,msgRevision){
        expect(await this.page.getByText(msgFile, { exact: true })).toBeVisible
        expect(await this.page.getByText(msgDocName, { exact: true })).toBeVisible
        expect(await this.page.getByText(msgRevision, { exact: true })).toBeVisible
        //expect(await this.page.getByText('Missing required field: File', { exact: true })).toBeVisible
        //expect(await this.page.getByText('Missing required field: Document Name', { exact: true })).toBeVisible
        //expect(await this.page.getByText('Missing required field: Revision', { exact: true })).toBeVisible
    }

    async viewQuotes_VerifyFieldValues_Overview(title,approvalStatus,opportunity,quoteStage,invoiceStatus,paymentTerms,approvalIssues){
        await this.framePage.locator('#name').waitFor();
        await expect(this.framePage.locator('#name')).toContainText(title);
        await expect(this.framePage.locator('div[field="approval_status"]')).toContainText(approvalStatus);
        await expect(this.framePage.locator('#opportunity_id')).toContainText(opportunity);
        await expect(this.framePage.locator('div[field="stage"]')).toContainText(quoteStage);
        await expect(this.framePage.locator('div[field="invoice_status"]')).toContainText(invoiceStatus);
        await expect(this.framePage.locator('div[field="term"]')).toContainText(paymentTerms);
        await expect(this.framePage.locator('#approval_issue')).toContainText(approvalIssues);

    }

    async viewQuotes_VerifyFieldValues_Account(billingAccount,billingContact){
        await this.framePage.locator('a:has-text("QUOTE TO")').last().click();
        await expect(this.framePage.locator('div[field="billing_account"]')).toContainText(billingAccount);
        await expect(this.framePage.locator('div[field="billing_contact"]')).toContainText(billingContact);
    }

    async viewQuotes_RecentlyViewed(title){
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().hover();
        await this.page.getByText('Recently Viewed', { exact: true }).first().click();
        await this.page.locator('a').filter({ hasText: title }).last().click();
        //await this.page.locator('a').filter({ hasText: 'QuoteTest' }).last().click();
        await this.page.waitForLoadState('networkidle');
        await this.framePage.locator('#name').waitFor();
        await this.framePage.locator('h2[class="module-title-text"]').waitFor();
        await expect(this.framePage.locator('#name')).toContainText(title)
    }

    async viewDocuments_VerifyFieldValues(fileName,docCategory,docSubCategory){
        expect(await this.page.locator('span[class*="uploaded-file-name"]').nth(0).getAttribute('title')).toContain(fileName);
        expect(await this.page.locator('scrm-dynamic-field[class*="document_name"]').textContent()).toContain(fileName.split(".")[0]);
    
        expect(await this.page.locator('scrm-dropdownenum-detail[class*="flex-grow-1"]').nth(0).textContent()).toContain(docCategory);
        expect(await this.page.locator('scrm-dropdownenum-detail[class*="flex-grow-1"]').nth(1).textContent()).toContain(docSubCategory);
 
        expect(await this.page.locator('span[class*="uploaded-file-name"]').nth(1).getAttribute('title')).toContain(fileName);

    }
}
module.exports = {validationPage};