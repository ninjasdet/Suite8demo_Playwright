class ContactLoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginBtn = page.getByRole('button', { name: 'Log In' });
  }

  async goto() {
    await this.page.goto('https://suite8demo.suiteondemand.com/');        
    //await this.username.waitFor(); // ensure login page loaded 
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
    await this.page.waitForURL(/#\/home/);   
  }
}

module.exports = ContactLoginPage;