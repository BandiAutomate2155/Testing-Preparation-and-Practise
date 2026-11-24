let message1 : string = "Hello";
message1 = "bye";

let age1:number = 20;

let isactive:boolean = true;

let numbers1:number[] = [1,2,3];

let data : any  = "this could be anything";
data = 42;

function add(a:number,b:number): number
{
    return a+b;
}
add(3,4);

let user: {name:string, age:number} = { name: "Bob", age:34};
user.location = "Hyderabad";

const {test, expect} = require('@playwright/test');
class CartPage
{
    page: Page
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
   
    await this.cartProducts.waitFor();
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};