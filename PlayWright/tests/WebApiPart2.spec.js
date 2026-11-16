// Login UI 

// Test , cart , order , orderdetails , 

const {test, expect} = require('@playwright/test'); // constant variable
let webContext;

test.beforeAll(async({browser})=> // To identify as fixture we should keep curly barsis{}
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Srihari");
    await page.locator("userPassword").fill("xyspassword");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})

test('Browser context Playwright Test', async ()=>   // async function() ,  async ()=> , browser is a global fixture
{
    const productName = "Zara Coat 4"
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".cart-body");
    await page.locator(".card-body b").last().waitFor();  // It will wait till last element loads. --> first() wait for first element to load    
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
   // await page.pause();
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();  // Wait for cannot be applied for multiple elements, If it is multiple then we should put .first().waitFor();
    const bool = await page.locator("h3:has-text('productName')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country]").pressSequentially("ind"); // pressSequentially('World', { delay: 100 }); // Types slower, like a user
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = dropdown.locator("button").count();
    for(let i =0; i<optionsCount; i++)
    {
       const text = await dropdown.locator("button").nth[i].textContent();
        if(text === " India") // text.trim() === " India" or text.includes === " India"
        {
            await dropdown.locator("button").nth[i].click();
            break;
        } 
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText("sriharibandi@gmail.com")
    await page.locator(".action__submit").click();
    await expect(page.locator("hero-primary").first()).toHaveText(" Thank you for the Order. ");
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
   