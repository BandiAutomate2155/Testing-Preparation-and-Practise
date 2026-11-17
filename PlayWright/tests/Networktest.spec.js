const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils.js');
const LoginPayLoad = { userEmail: "srihariXYZ", userPassword: "SomeXYZ" }
const orderPayLoad = { orders: [{ country: 'Cuba', productOrderedID: "" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };


let token; // When we decalre consta we have to decalre value also for that 
let orderId; // let will be delaclred when it doesn't have value right now i.e inisitlation is not done right now when it is declared
let response;

test.beforeAll(async () =>  // => is know to be fat operator -- It will execute once once before all the tests get executed
{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, LoginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);


});

test.beforeEach(() => {

});

//test 1, test 2, test 3

test('Place the order', async ({ page }) =>   // async function() ,  async ()=> , browser is a global fixture
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    const productName = "Zara Coat 4"
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulsettyacademy.com/api/ecom/order/get-orders-for-cusomers/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);

            route.fulfill({
                response, body,
            })
            // intercepting response - API response --> Browser--> render data on front end 
        })
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");  // * is intersept 
    console.log(await page.locator(".mt-4").textContent());
 
 

}); 