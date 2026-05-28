class navigatePage {
    constructor(page) {
        this.page = page;
    }

    async createAccountsPage() {
        await this.page.locator('a').filter({ hasText: /^Accounts$/ }).click();
        await this.page.getByRole('link', { name: 'Create Account' }).click();
    }

    async viewAccountsPage() {
        await this.page.locator('a').filter({ hasText: /^Accounts$/ }).click();
        await this.page.getByRole('link', { name: 'View Accounts' }).click();
    }

    async importAccountsPage() {
        await this.page.locator('a').filter({ hasText: /^Accounts$/ }).click();
        await this.page.getByRole('link', { name: 'Import Accounts' }).click();
    }

    async recentViewAccountsPage() {
        await this.page.locator('a').filter({ hasText: /^Accounts$/ }).click();
        await this.page.locator('a').nth(5).click();

    }

    async createOpportunitiesPage(){
        await this.page.locator('a').filter({ hasText: /^Opportunities$/ }).click();
        await this.page.getByRole('link', { name: 'Create Opportunity' }).click();

    }

   async viewOpportunitiesPage(){
    await this.page.locator('a').filter({ hasText: /^Opportunities$/ }).click();
    await this.page.getByRole('link', { name: 'View Opportunities' }).click();

   }

   async importOpportunitiePage() {
    await this.page.locator('a').filter({ hasText: /^Opportunities$/ }).click();
    await this.page.getByRole('link', { name: 'Import Opportunities' }).click();
    }
}


module.exports = {navigatePage};