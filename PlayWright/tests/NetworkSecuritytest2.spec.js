const {test, expect}= require('@playwright/test')


test('Security test request intercept',async({page})=> 
{
    await page.route("https://rahulsettyacademy.com/api/ecom/order/get-order-details?id=*", route=>route.continue({url: 'https://rahulsettyacademy.com/api/ecom/order/get-order-details?id=8716836r36871gkbdkjb5315'}))
    await page.locator("button:has-text('View')").click();
    // await page.pause();
    await expect(page.locator("p")).last().toHavetext("You are not authorize to view this order");
})