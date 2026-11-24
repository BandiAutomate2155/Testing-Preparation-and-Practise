const {test, expect} = require('@playwright/test'); // constant variable
const LoginPage = require('./pageobjects/LoginPage');

test('Browser context Playwright Test', async ({browser})=>   // async function() ,  async ()=> , browser is a global fixture
{
    const userName="xyz@gmail.com";
    const Password = 'someXYZ';
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginpage = new LoginPage(page);
    loginpage.goto();
    loginpage.validLogin("username, Password")

})