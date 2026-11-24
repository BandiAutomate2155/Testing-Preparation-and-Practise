const {POManager} = require('../../pageobjects/POmanager');
const {POManager} = require('../../pageobjects/POmanager');
const { Given, When, Then } = require('@cucumber/cucumber');


Before(async function () {

       const browser = await playwright.chromium.launch({
          headless:false,
       });
       
       const context = await browser.newContext();
       const page = await context.newPage();
       this.poManager = new POManager(page);
})