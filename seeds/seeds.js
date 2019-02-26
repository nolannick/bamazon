const db = require("../models");

let items = [
    {
        product_name: "Catan",
        department_name: "Board Games",
        price: 54.99,
        stock_quantity: 200
    },
    {
        product_name: "Mario Party Switch",
        department_name: "Video Games",
        price: 59.99,
        stock_quantity: 576
    },
    {
        product_name: "Macbook Pro 2019",
        department_name: "Electronics",
        price: 2599,
        stock_quantity: 24
    },
    {
        product_name: "Bose Headphones",
        department_name: "Electronics",
        price: 350,
        stock_quantity: 99
    },
    {
        product_name: "Vintage T-shirt",
        department_name: "Clothing",
        price: 22.50,
        stock_quantity: 204
    },
    {
        product_name: "Stroller",
        department_name: "Baby",
        price: 201,
        stock_quantity: 304
    },
    {
        product_name: "Wrangler 501 Jeans",
        department_name: "Clothing",
        price: 82.90,
        stock_quantity: 1200
    },
    {
        product_name: "Sequence",
        department_name: "Board Games",
        price: 21.90,
        stock_quantity: 22
    },
    {
        product_name: "Samsung 75 inch 4k TV",
        department_name: "Electronics",
        price: 2100,
        stock_quantity: 9
    },
    {
        product_name: "Pacifier - 4 pack",
        department_name: "Baby",
        price: 9.99,
        stock_quantity: 12354 
    },
]

db.sequelize.sync({force: true}).then(function(){
    db.Product.bulkCreate(items)
    .then(function(rows) {
        console.log("Success");
        db.sequelize.close();
    })
    .catch(function(err) {
        console.log({err: err})
    })
})