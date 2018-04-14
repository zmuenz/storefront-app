var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "",
    database: "bamazon"
});

// Initial connection to the database
connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

// Function that starts the application by showing a prompt
function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "showList",
            message: "Would you like to see our products for sale?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answer) {
        if (answer.showList === "Yes") {
            showProducts();
        } else {
            inquirer.prompt([
                {
                    type: "list",
                    name: "shop",
                    message: "Would you like buy something?",
                    choices: ["Yes", "No"]
                }
            ]).then(function (answer) {
                if (answer.shop === "Yes") {
                    buyItem();
                } else {
                    connection.end();
                }
            });
        }
    })
};

// Function to log all the products available for purchase
function showProducts() {
    console.log("Showing all available products...\n");
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        // Loop through the database and log the inventory of items available for purchase
        for (i = 0; i < data.length; i++) {
            console.log("ID#: " + data[i].item_id + " | " + "Product: " + data[i].product_name + " | " + "Price: $" + data[i].price + " each" + "\n");
        }
        // Run the buyItem function
        buyItem();
    });
};

// Function that prompts the user asking for which item and what quantity to purchase
function buyItem() {
    inquirer.prompt([

        {
            type: "input",
            name: "itemID",
            message: "What is the ID# of the item you would like to purchase?"
        },
        {
            type: "input",
            name: "itemQuantity",
            message: "How many of this item would you like to purchase?"
        }

    ]).then(function (answer) {
        var itemQuantity = parseInt(answer.itemQuantity);
        var chosenItem;

        connection.query("SELECT * FROM products", function (err, data) {
            if (err) throw err;

            // Loops through the database for the item with the ID number the user has entered and
            // sets the variable chosenItem to that item
            for (var i = 0; i < data.length; i++) {
                if (data[i].item_id === parseInt(answer.itemID)) {
                    chosenItem = data[i];
                }
            }

            // If the stock of the item is greater than or equal to the quantity the user wants,
            // update the database quantity and tell the user their total
            if (parseInt(chosenItem.stock_quantity) >= itemQuantity) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: parseInt(chosenItem.stock_quantity) - itemQuantity
                        },
                        {
                            item_id: answer.itemID
                        }
                    ],
                    function (err, data) {
                        if (err) throw err;
                        console.log("\nYou've purchased " + itemQuantity + " of " + chosenItem.product_name + " for a total of $" + (chosenItem.price * itemQuantity) + "\n");
                        startApp();
                    }
                )

            // If there isn't sufficient stock, notify the user and let them know how many of that item is in stock
            } else {
                console.log("\nWe don't have enough for your order! There is only " + chosenItem.stock_quantity + " of this item in stock. Please try again.\n");
                startApp();
            };
        });
    });
};