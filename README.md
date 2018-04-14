# Storefront CLI and SQL Web Application

### Overview

This is an Amazon-style command line interface application that allows a user to view an inventory of products pulled from an SQL database and make purchases. There is also a Manager interface that allows for a person to view inventory, view products low on stock, add stock to those items, and add new products.

### Languages

This application uses Node.js and MySql.

### Packages Required

mysql
inquirer

### SQL Database

Bamazon storefront database schema
(./images/bamazon_schema.png)

### Bamazon Customer App

Initial prompt asks the user if they'd like to see the list of products for sale
(./images/bamazon_customer_showproducts.png)

Customer then selects a product by entering the ID# of the product they would like to buy, followed by the quantity they'd like to purchase. If that quantity is available, the app returns the total cost of the customer's purchase. The customer is then prompted again starting the same as the beginning of the app.
(./images/bamazon_customer_buyproduct.png)

### Bamazon Manager App

The app begins by asking the manager what they would like to do from 4 options. If the manager selects the first option, the app returns a list of inventory from the database.
(./images/bamazon_manager_showproducts.png)

If the manager chooses the second option, show low inventory, the app returns any product in the database with a quantity of less than 5.
(./images/bamazon_manager_showlow.png)

The manager can choose the third option to choose any of the low inventory items to add stock to, and the app will add their number input to the stock of that item and then return the new stock of that item.
(./images/bamazon_manager_addinventory.png)

If the manager chooses the 4th and last option, they can add a brand new product to the inventory database.
(./images/bamazon_manager_addproduct.png)