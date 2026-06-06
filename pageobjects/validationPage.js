const { expect } = require('@playwright/test');

class validationPage {
    constructor(page) {
        this.page = page;
        this.framePage =  page.frameLocator('[src*="index.php"]');
    }

    async verifySuccesfulLogin() {
        await this.page.waitForLoadState('networkidle');
        expect(await this.page.locator('iframe').contentFrame().getByRole('link', { name: 'SUITECRM DASHBOARD' }).textContent()).toContain('SUITECRM DASHBOARD');
        console.log("successfully navigated to home page");
    }

    async Login_invalidusernameandpassword(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(3000);
      const ErrorMessage = await this.page.getByText('Login credentials incorrect,').textContent();
        console.log(ErrorMessage);
    }

    async  login_withemptyfields() {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(10000);
      const ErrorMessage1 = await this.page.getByText('Missing required field').first().textContent();
        console.log('Errormessage under usernametextbox:' +ErrorMessage1);

      const ErrorMessage2  = await this.page.getByText('Missing required field').nth(1).textContent();
         console.log('Errormessage under passwordtextbox:' +ErrorMessage2);
    }

    async login_WithUsernameEmptyPassword(){ 
      await this.page.waitForTimeout(5000);
    const ErrorMessage = await this.page.getByText('Missing required field').textContent();
        console.log('Errormessage under passwordtextbox :' +ErrorMessage);   
    }


    async login_WithPasswordEmptyUsername(){ 
      await this.page.waitForTimeout(5000);
    const ErrorMessage = await this.page.getByText('Missing required field').first().textContent();
        console.log('Errormessage under usernametextbox :' +ErrorMessage);   
    }

    async verifyAccountsPage() {
    await this.page.waitForLoadState('networkidle');
   expect (await this.page.locator('a').nth(1)).toBeVisible();
    }

     async verifyAccountsPageURL() {
        await this.page.waitForTimeout(3000);
        expect (await this.page.getByText('ACCOUNTS', { exact: true })).toContainText('ACCOUNTS');
        console.log("successfully navigated to accounts page");
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveURL(/accounts/);
     }
    

    async VerifyCreateAccountDetails(accountName){
      await this.page.waitForLoadState('networkidle');
      expect(await this.page.getByLabel('OVERVIEW').getByText(accountName, { exact: true }).textContent()).toContain(accountName);
    }

      async Verify_CreateAccountsPage(pageLabel){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        expect(await this.page.getByText(pageLabel, { exact: true })).toBeVisible();
        expect(await this.page.getByText(pageLabel, { exact: true })).toContainText(pageLabel);
      }

      async Verify_AccountNAME_Field(){
            await this.page.waitForTimeout(3000);
            expect(await this.page.getByRole('textbox').nth(1)).toBeVisible();
            expect(await this.page.getByRole('textbox').nth(1)).toBeEnabled();
      }

         async Verify_AccountNAME_Field_Editable(){
            expect(await this.page.getByRole('textbox').nth(1)).toBeEditable();
    }

    async Verify_SaveAndCancelButton_CreateAccount(){
        await this.page.waitForTimeout(3000);
        expect(await this.page.getByRole('button', { name: 'Save' })).toBeVisible();
        expect(await this.page.getByRole('button', { name: 'Save' })).toBeEnabled();
        expect(await this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        expect(await this.page.getByRole('button', { name: 'Cancel' })).toBeEnabled();
    }

    
     async VerifyAccountMandatoryFileds(){
         await this.page.waitForLoadState('networkidle');
         await this.page.waitForTimeout(3000);
         const ErrorMessage = await this.page.getByText('Missing required field: Name').textContent();
         console.log(ErrorMessage);
         expect(await this.page.getByText('Missing required field: Name').textContent()).toContain('Missing required field: Name');

     }

    async VerifyViewAccountDetails(accountName,website,email,phoneNumber) {
      await this.page.locator('scrm-field').filter({ hasText: accountName }).first().click();
      await this.page.waitForTimeout(5000);
      expect(await this.page.getByLabel('OVERVIEW').getByText(accountName, { exact: true }).textContent()).toContain(accountName);
      await this.page.waitForTimeout(3000);
      expect(await this.page.getByRole('link', { name: website }).getAttribute('href')).toContain(website);
      //await this.page.waitForTimeout(3000);
      //expect(await this.page.locator('scrm-email-detail')).toContainText(email);
     
      }

    async UpdateViewAccountDetails(accountName,NewAccountName) {
        await this.page.locator('scrm-field').filter({ hasText: accountName }).first().click();
        await this.page.getByRole('button', { name: 'Edit' }).click();
        await this.page.getByRole('textbox').nth(1).fill(NewAccountName);
      }

    async VerifyUdateAccountDetails(NewAccountName) {
       await this.page.waitForLoadState('networkidle');
       await this.page.waitForTimeout(5000);
       await expect(this.page.locator('scrm-varchar-detail').filter({ hasText: NewAccountName })).toBeVisible();
       console.log("updated successfully")
        }

    async VerifyRecentViewAccountDetails(NewAccountName) {
            await this.page.locator('a').nth(5).click();
            await this.page.getByRole('navigation').getByRole('link', { name: NewAccountName }).click();
            expect(await this.page.getByLabel('OVERVIEW').getByText(NewAccountName).textContent()).toContain(NewAccountName);
     
      }

    async verifyOpportunitie(opportunitieName){
        expect(await this.page.getByLabel('BASIC').getByText(opportunitieName).textContent()).toContain(opportunitieName);
      }

    async VerifyOpportunitieMandatoryFileds(){
       await this.page.waitForLoadState('networkidle');
       await this.page.waitForTimeout(3000);
      expect(await this.page.getByText('Missing required field: Opportunity Name').textContent()).toContain('Missing required field: Opportunity Name');
      await this.page.waitForTimeout(3000);
      expect(await this.page.getByText('Missing required field: Opportunity Amount').textContent()).toContain('Missing required field: Opportunity Amount');
      await this.page.waitForTimeout(3000);
      expect(await this.page.getByText('Missing required field: Sales').textContent()).toContain('Missing required field: Sales');
      await this.page.waitForTimeout(3000);
      expect(await this.page.getByText('Missing required field: Account Name').textContent()).toContain('Missing required field: Account Name');
      await this.page.waitForTimeout(3000);
      expect(await this.page.getByText('Missing required field: Expected Close Date').textContent()).toContain('Missing required field: Expected Close Date');
  
    }
    

    async VerifyViewOpportunitieDetails(opportunitieName,opportunitieAmount,salesStage,accountName){
        await this.page.getByRole('link', { name: opportunitieName }).first().click();
        await this.page.waitForTimeout(5000);
        expect(await this.page.getByLabel('BASIC').getByText(opportunitieName).textContent()).toContain(opportunitieName);
        //await this.page.waitForTimeout(30000);
        //expect(await this.page.getByText(opportunitieAmount).textContent()).toContain(opportunitieAmount);
        expect(await this.page.getByText(salesStage).textContent()).toContain(salesStage);
        //await this.page.waitForTimeout(5000);
        //expect(await this.page.getByText(accountName).textContent()).toContain(accountName);
      }

      async UpdateViewOpportunitieDetails(opportunitieName,NewOpportunitieName) {
        await this.page.getByRole('link', { name: opportunitieName }).first().click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Edit' }).click();
        await this.page.getByRole('textbox').nth(1).click();
        await this.page.getByRole('textbox').nth(1).fill(NewOpportunitieName);
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
      }


      async VerifyUdateOpportunitieDetails(NewOpportunitieName){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);
        expect(await this.page.getByLabel('BASIC').getByText(NewOpportunitieName).textContent()).toContain(NewOpportunitieName);
      }


      async VerifyRecentViewOpportunitieDetails(opportunitieName) {
        await this.page.getByText('ACCOUNT NAME').hover();
        await this.page.waitForTimeout(5000);
        expect(await this.page.locator('.flex-grow-1.text-break').first().textContent()).toContain(opportunitieName);
      }

      async  VerifyRecentViewAccountDetails(accountName){
         await this.page.waitForTimeout(5000);
        expect(await this.page.locator('.flex-grow-1.text-break').first().textContent()).toContain(accountName);
        
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

