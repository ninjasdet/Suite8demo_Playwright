class navigatePage{
    constructor(page){
        this.page = page;
        this.framePage =  page.frameLocator('[src*="index.php"]');
    }

    async clickSave(){

        await this.page.locator('scrm-label').filter({ hasText: 'Save' }).click();

    }

    async clickSave_Frame(){
        await this.framePage.getByRole('button', {name: 'Save' }).click();
    }

    async importQuote_ClickExit(){
        await this.framePage.locator('#finished').click();
    }

    async createQuotePage(){
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().hover();
        await this.page.locator('span').filter({ hasText: 'Create Quote' }).first().click();
    }

    async importQuotesPage(){
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().hover();
        await this.page.getByText('Import', { exact: true }).click();        
    }

    async importLineItems(){
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().hover();
        await this.page.getByText('Import Line Items', { exact: true }).click();
    }

    async viewQuotesPage(){
        await this.page.locator('span').filter({ hasText: 'Quotes' }).first().hover();
        await this.page.getByText('View Quotes', { exact: true }).click(); 
        await this.page.waitForLoadState('networkidle');       
    }

    async createDocumentPage(){
        await this.page.locator('span').filter({ hasText: 'Documents' }).first().hover();
        await this.page.getByText('Create Document', { exact: true }).click();
    }

    async viewDocumentsPage(){
        await this.page.locator('span').filter({ hasText: 'Documents' }).first().hover();
        await this.page.getByText('View Documents', { exact: true }).click();
    }


}

module.exports = {navigatePage};
