const { expect } = require('@playwright/test');

class validationPage {
    constructor(page) {
        this.page = page;
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
    const ErrorMessage = await this.page.getByText('Missing required field').nth(1).textContent();
        console.log('Errormessage under passwordtextbox :' +ErrorMessage);   
    }


    async login_WithPasswordEmptyUsername(){ 
      await this.page.waitForTimeout(5000);
    const ErrorMessage = await this.page.getByText('Missing required field').first().textContent();
        console.log('Errormessage under usernametextbox :' +ErrorMessage);   
    }
    

    async VerifyCreateAccountDetails(accountName){
      await this.page.waitForLoadState('networkidle');
      expect(await this.page.getByLabel('OVERVIEW').getByText(accountName, { exact: true }).textContent()).toContain(accountName);
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

    
    
  }



module.exports = {validationPage} ;