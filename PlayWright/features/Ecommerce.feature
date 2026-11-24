Feature: Ecommerce validations

    Scenario: Placing the order
      Given A login to Ecommerce Application with "xyz@gmail.com" and "somexyz"
      When Adding "Zara coat 3" to cart 
      Then Verify "Zara coat 3" is displayed in the cart page
      When Enter Valid details and place the order
      Then Verify order is present in the order history
