class loginPage{
    constructor(page){
        this.page = page;
    }

    async navigateURL(){
         await this.page.goto('https://suite8demo.suiteondemand.com/');
    }

    async loginToApp(username,password){
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Log In' }).click();
    }
}

module.exports = {loginPage};