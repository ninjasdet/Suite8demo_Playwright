class LeadsPage {
    constructor(page) {
        this.page = page;
        this.leadsMenu = page.locator('a').filter({ hasText: /^Leads$/ }).first();
        this.createLeadLink = page.getByRole('link', { name: 'Create Lead', exact: true }).first();
        this.viewLeadsLink = page.getByRole('link', { name: 'View Leads' }).first();
        this.importLeadsLink = page.getByRole('link', { name: 'Import Leads' }).first();
        this.importVCardLeadsLink = page.getByText('Create Lead From vCard', { exact: false }).first();
        this.recentlyViewedLeadLink = page.getByText(' Recently Viewed ', { exact: false }).first();

    }

    async clickCreateLead() {
        await this.leadsMenu.waitFor({ state: 'visible' });
        await this.leadsMenu.click();

        await this.createLeadLink.waitFor({ state: 'visible' });
        await this.createLeadLink.click();
        //await this.page.waitForURL(/Contacts\/create/);
    }

    async clickImportVCardLeads() {
        await this.leadsMenu.waitFor({ state: 'visible' });
        await this.leadsMenu.click();

        await this.importVCardLeadsLink.waitFor({ state: 'visible' });
        await this.importVCardLeadsLink.click();
        //await this.page.waitForURL(/contacts\/importvcard/);
    }

    async clickViewLeads() {
        await this.leadsMenu.waitFor({ state: 'visible' });
        await this.leadsMenu.click();

        await this.viewLeadsLink.waitFor({ state: 'visible' });
        await this.viewLeadsLink.click();
    }

    async clickRecentlyViewedLead() {
        await this.leadsMenu.waitFor({ state: 'visible' });
        await this.leadsMenu.click();

        await this.recentlyViewedLeadLink.waitFor({ state: 'visible' });
        await this.recentlyViewedLeadLink.click();
    }

    async clickImportLeads() {
        await this.leadsMenu.waitFor({ state: 'visible' });
        await this.leadsMenu.click();

        await this.importLeadsLink.waitFor({ state: 'visible' });

        await this.importLeadsLink.click();
    }

    getNameLocator(name) {
        //return this.page.locator('scrm-field.field-name-name a.field-link', { hasText: name }).first();
        return this.page.locator('a.field-link', { hasText: name }).first();
    }

    async openLead(name) {
        await this.getNameLocator(name).click();
    }
}

module.exports = LeadsPage;



