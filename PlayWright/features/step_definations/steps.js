const { Given, When, Then } = require('@cucumber/cucumber');
const {test, expect, playwright} = require('@playwright/test');
const {POManager} = require('../../pageobjects/POmanager');

Given('A login to Ecommerce Application with {string} and {string}', 
{timeout:100*1000}, async function (username, password) {
    
     const browser = await playwright.chromium.launch({
        headless:false,
     });

     const context = await browser.newContext();
     const page = await context.newPage();
     this.poManager = new POManager(page);
     const products = page.locator(".card-body");
     const loginPage = this.poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);

});

When('Adding {string} to cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

Then('Verify {string} is displayed in the cart page', 
async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter Valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await this.poManager.getDashboardPage().navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Then('Verify order is present in the order history', async function () {
   await this.poManager.getDashboardPage().navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});