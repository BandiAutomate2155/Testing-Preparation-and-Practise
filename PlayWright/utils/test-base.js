const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataForOrder:     {
    username: "xyz@gmail.com",
    password: "somexyz",
    productName: "Zara coat4"
    }
}
)