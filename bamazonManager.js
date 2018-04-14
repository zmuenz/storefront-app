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

// Starts application and prompts the user for what command they would like to execute
function startApp() {
    inquirer.prompt([

        {
            type: "list",
            name: "userCommandChoices",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (answer) {

        // This could probably be made into a switch/case statement but I'm not as experiences with those yet
        if (answer.userCommandChoices === "View Products for Sale") {
            viewProducts();

        } else if (answer.userCommandChoices === "View Low Inventory") {
            viewLowInventory();

        } else if (answer.userCommandChoices === "Add to Inventory") {
            addToInventory();

        } else if (answer.userCommandChoices === "Add New Product") {
            addNewProduct();
        }
    });
};

// Function to show the manager the products in the inventory database
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            console.log("ID#: " + data[i].item_id + " | " + "Product: " + data[i].product_name + " | " + "Price: $" + data[i].price + " each" + " | " + "Quantity: " + data[i].stock_quantity + "\n");
        }
        startApp();
    });

};

// Function that returns all items in the database with stock less than 5
function viewLowInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].stock_quantity < 5) {
                console.log("ID#: " + data[i].item_id + " | " + "Product: " + data[i].product_name + " | " + "Price: $" + data[i].price + " each" + " | " + "Quantity: " + data[i].stock_quantity + "\n");
            }
        }
        startApp();
    });
};

// Function to add more stock to an item in the inventory with less than 5 stock
function addToInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        inquirer.prompt([

            {
                type: "list",
                name: "addInventory",
                message: "Which item would you like to add more of?",
                choices: function () {
                    var choiceArray = [];
                    for (i = 0; i < data.length; i++) {
                        if (data[i].stock_quantity < 5) {
                            choiceArray.push(data[i].product_name);
                        }
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                name: "addNumber",
                message: "How many of this item would you like to add to the inventory?"
            }
        ]).then(function (answer) {
            var chosenItem;

            connection.query("SELECT * FROM products", function (err, data) {
                if (err) throw err;

                // Loops through the database for the item with the product name the user has selected
                // and sets the variable chosenItem to that item
                for (var i = 0; i < data.length; i++) {
                    if (data[i].product_name === answer.addInventory) {
                        chosenItem = data[i];
                    }
                }

                // Updates the quantity of the manager's selected item within the database
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: chosenItem.stock_quantity += parseInt(answer.addNumber)
                        },
                        {
                            product_name: chosenItem.product_name
                        }
                    ],

                    // Notifies the manager of how much total stock of their selected item we now have
                    function (err, res) {
                        console.log("\nWe now have " + chosenItem.stock_quantity + " of " + answer.addInventory + ".\n");
                        startApp();
                    }
                );
            });
        });
    });
};

// Function to add a new product to the inventory database
function addNewProduct() {
    inquirer.prompt([

        {
            type: "input",
            name: "addNewItem",
            message: "What is the name of the item you would like to add?"
        },
        {
            type: "input",
            name: "itemDepartment",
            message: "In what department is this item sold?"
        },
        {
            type: "input",
            name: "itemPrice",
            message: "What will this item cost?"
        },
        {
            type: "input",
            name: "newItemQuantity",
            message: "How many of this item should we stock?"
        }

    ]).then(function (answer) {

        // Adds the user's answers as a row within the database
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.addNewItem,
                department_name: answer.itemDepartment,
                price: answer.itemPrice,
                stock_quantity: parseInt(answer.newItemQuantity)
            },

            // Notifies the user that the item has been successfully added
            function (err, res) {
                console.log("We have added " + answer.newItemQuantity + " of the " + answer.addNewItem + " at $" + answer.itemPrice + "!\n");
                startApp();
            }
        );
    });
};