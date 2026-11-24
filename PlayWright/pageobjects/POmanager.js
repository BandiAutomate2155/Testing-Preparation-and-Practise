const {LoginPage} = require('./LoginPage');
const {Dashboardpage} = require('./Dashboardpage');


class POmanager
{
    constructor(page)
    {
        this.page = page;
        this.loginpage= new LoginPage(this.page);
        this.dashboardpage = new Dashboardpage(this.page);

    }

getLoginPage()
{
    return this.loginpage;

}

getDashboardpage()
{
    return this.dashboardpage; 
}
}

module.exports ={POmanager};