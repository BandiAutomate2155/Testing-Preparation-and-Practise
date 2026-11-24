class Dashboardpage
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName)
    {
    const tittles = await this.productsText.allTextContents();
    console.log(tittles);
    const productCount = await this.products.count();
    for(let i =0; i < productCount; ++i)
    {
        if (await this.products.nth(i).locator("b").textContent() === productName);
        {
            // Add to cart 
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    }
    async navigateToCart(){
        await this.cart.click();
    }

}

module.exports = {Dashboardpage};