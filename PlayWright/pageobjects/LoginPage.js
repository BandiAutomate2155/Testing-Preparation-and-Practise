class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.signInButton = page.locator("[value='Login");
        this.userName = page.locator("#userEmail"); 
        this. password = page.locator("#userPassword")
    }

    async goTo()
    {
        await this.page.goTo("https://rahulsettyacademy.com/client");
    }

    async Validlogin(username,Password)
    {
        await this.userName().fill(username);
        await this.password().fill(Password); 
        await this.signin().click();  
        await page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage};