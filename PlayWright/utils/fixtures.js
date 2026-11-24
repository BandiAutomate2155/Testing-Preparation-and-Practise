const { base, request} = require('@playwright/test');
const {ApiUtils} = require('ApiUtils.js');
const LoginPayLoad = { userEmail: "srihariXYZ", userPassword: "SomeXYZ" };
const orderPayLoad = { orders: [{ country: 'Cuba', productOrderedID: "" }] };

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ page }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await page.locator("#userEmail").fill("Srihari");
            await page.locator("userPassword").fill("xyspassword");
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');
            await use(page);  // Code after use will not execute which a Tear Down and it will execute only after entire test is done in fixturedemo.spec.js
            await context.close();
        },
        createOrder: async ({}, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new ApiUtils(apiContext, loginPayload);
            response = await ApiUtils.createOrder(OrderPayLoad);
            await use(response);
            await apiContext.dispose();
        },
        testDataForOrder: {
            productName: 'ADIDAS ORIGINAL'

        }
    });