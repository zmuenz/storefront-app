DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price FLOAT(10, 2) DEFAULT 0,
    stock_quantity INT(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pickleball Racket", "Outdoor Leisure", 29.99, 12),("Depth Charge", "Aquatic Warfare", 299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Truck Nutz", "Auto", 24.99, 20),("Haunted Doll", "Kids' Toys", 6.66, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Terrible Frisbee", "Outdoor Leisure", 4.99, 14),("Torpedo", "Aquatic Warfare", 699.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Goblet Crafted from the Skull of My Nemesis", "Occult Fine China", 79.99, 4),("A very small and very sharp sword", "Kids' Toys", 34.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mint condition Luke Skywalker action figure UNOPENED IN PACKAGE", "Kids' Toys", 419.99, 1),("Greasy Chef's Apron", "Kitchen", 2.99, 30);

SELECT * FROM products;