const {test, expect, request}= require('@playwright/test'); 
const {customtest} = require("../utils/fixtures");


customtest("This is fixtures demo", async({authenticatedPage, CreateOrder, testDataForOrder})=> {
   await authenticatedPage.goto("https://rahulsettyacademy.com/client");
   await authenticatedPage.locator("button[routerlinik*='myorders']").click();
   await authenticatedPage.locator("tbody").waitFor();
   await expect(authenticatedPage.getByText(CreateOrder.orderId)).toBeVisible();
   console.log(testDataForOrder.productName);
})