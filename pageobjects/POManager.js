const {loginPage} = require('./loginPage');
const {navigatePage} = require('./navigatePage');
const {enterValuesPage} = require('./enterValuesPage');
const {validationPage} = require('./validationPage');
//const {LoginPage} = require('./loginPage');
//const{NavigatePage} = require('./navigatePage');
//const{EnterValuesPage} = require('./enterValuesPage');
//const{ValidationPage} = require('./validationPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new loginPage(this.page);
        this.navigatePage = new navigatePage(this.page);
        this.enterValuesPage = new enterValuesPage(this.page);
        this.validationPage = new validationPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;

    }

    getNavigatePage(){
        return this.navigatePage;

    }

    getEnterValuesPage(){
        return this.enterValuesPage;
    }

    getValidationPage(){
        return this.validationPage;
    }
}
module.exports = {POManager};