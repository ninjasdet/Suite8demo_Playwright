
const {loginPage} = require('./loginPage.js');
const {navigatePage} = require('./navigatePage.js');
const {validationPage} = require('./validationPage.js');
const {enterValuesPage} = require('./enterValuesPage.js');



class POManager{

    constructor(page)
    {
   
   this.page = page;
   this.loginPage = new loginPage(this.page);
   this.navigatePage = new navigatePage(this.page);
   this.enterValuesPage = new enterValuesPage(this.page);
   this.validationPage = new validationPage(this.page);


    }

    getLoginPage()
{
    return this.loginPage;
}

getNavigatePage()
{
    return this.navigatePage;
}

getEnterValuesPage()
{
    return this.enterValuesPage;
}
getValidationPage()
{
    return this.validationPage;
}

}
module.exports = POManager;

    


