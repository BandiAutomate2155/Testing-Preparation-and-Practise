const {test, expect, request}= require('@playwright/test'); 
const {customtest} = require("../utils/fixtures.js");

const LoginPayLoad = { userEmail: "srihariXYZ", userPassword: "SomeXYZ" }
const orderPayLoad = { orders: [{ country: 'Cuba', productOrderedID: "" }] }


customtest("This is fixtures demo", async({authenticatedPage, CreateOrder})=> {

   await authenticatedPage.goto("https://rahulsettyacademy.com/client");
   await authenticatedPage.locator("button[routerlinik*='myorders']").click();
   await authenticatedPage.locator("tbody").waitFor();
   await expect(authenticatedPage.getByText(CreateOrder.orderId)).toBeVisible();

})