const {test, expect, request} = require('@playwright/test');
const LoginPayLoad = {userEmail:"sriharixyz@gmail.com", userPassword:"HeyApiTest@00"}
const loginPayLoad = {userEmail:"sriharixyz@gmail.com",userPassword:"IMXYZABC"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let token; // When we decalre consta we have to decalre value also for that 
let orderId; // let will be delaclred when it doesn't have value right now i.e inisitlation is not done right now when it is declared

test.beforeAll( async ()=>  // => is know to be fat operator -- It will execute once once before all the tests get executed
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client/#/auth/login",{data:LoginPayLoad})
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    //
   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayLoad,
        headers: {
            'Autihorization' : token, 
            'content-Type' : 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.order[0];

});

test.beforeEach(()=> 
{

});

//test 1, test 2, test 3

test('Place the order', async ({page})=>   // async function() ,  async ()=> , browser is a global fixture
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    const productName = "Zara Coat 4"
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".cart-body");
    const tittles = await page.locator(".card-body b").allTextContents();
    console.log(tittles);
    const productCount = await products.count();
    for(let i =0; i < productCount; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName);
        {
            // Add to cart 
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    const OrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderID);
    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(i=0; i<await rows.count(); i++)
    {
        const rowOrderId = rows.nth(i).locator("th").textContent();
        if (OrderID.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
        }
    }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(OrderID.includes(orderIdDetails)).toBeTruthy();
}); 
   
