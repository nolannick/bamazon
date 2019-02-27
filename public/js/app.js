
const cart = [];

//Validates a user selection to add to cart, adds items to the cart array, populates the alert block
const addToCart = function () {
    const productID = $(this).attr("data-productID");
    $.get(`/api/products/${productID}`).then(function (product) {
        if ($(`#countSelection${product.id}`).val() > product.stock_quantity || $(`#countSelection${product.id}`).val() === "") {
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-danger" role="alert">
            Select number of items to add to cart and click add to cart.
          </div>`);
        }
        else {
            //adds selections to the cart array
            const cartItem = {
                name: product.product_name,
                id: product.id,
                quantityOrdered: $(`#countSelection${product.id}`).val(),
                price: product.price
            }
            cart.push(cartItem);
            //updates the alert text
            $(".alertBlock").empty();
            $(".alertBlock").prepend(`<div class="alert alert-success" role="alert">
            Your goodies have been added to the cart!</div>`);
            $(`#countSelection${product.id}`).val("");
        }
    })
}

//contacts the API to obtain the products data and initiates the render function
const getAllProducts = function () {
    $.get("/api/products").then(function (products) {
        renderTable(products)
    })
}



const renderTable = function (products) {
    //empty product table prior to rendering
    $(".productTable").empty();

    //loop through products in table and insert HTML for each row of the table
    products.forEach(function (element) {
        $(".productTable").append(
            `<tr>
                <td><input type="number" class="form-control bg-secondary" id="countSelection${products.indexOf(element) + 1}"></td>
                <td>${element.product_name}</td>
                <td>${element.stock_quantity}</td>
                <td>$ ${element.price}</td>
                <td class="addToCart" data-productID=${element.id}><button class="btn btn-primary">Add to Cart</button></td>
            </tr>`);

    });
}

//Renders Cart modal and populates with data from what was added to cart.
const renderCart = function () {
    // $("#myCart").modal("hide");

    //Clears out the cart table and order total prior to population
    $(".myCartTable").empty();
    $(".orderTotal").empty();
    
    //loops through the cart array, populates HTML for the cart table
    for (let i = 0; i < cart.length; i++) {
        $(".myCartTable").append(
            `<tr>
                <td>${cart[i].quantityOrdered}</td>
                <td>${cart[i].name}</td>
                <td>$ ${cart[i].price}</td>
                <td>$ ${cart[i].quantityOrdered * cart[i].price}</td>
                <td class="deleteFromCart" id="productID" data-cartIndex=${i}><button class="btn btn-danger">Remove</button></td>
            </tr>`);
        if (i === cart.length - 1) {
            // calculates the order total for the cart modal
            let orderTotal = 0;
            for (let x = 0; x < cart.length; x++) {
                orderTotal += (cart[x].quantityOrdered * cart[x].price);
            }
            $(".modal-body").append(`<div class="orderTotal">Price at Checkout: $${orderTotal}</div>`);
        }
    }
    if (cart.length === 0) {
        $(".modal-body").html("Your cart is empty");
    }
    $(".modal").modal("show");
}

//removes an item from cart
const removeFromCart = function () {
    const cartIndex = $(this).attr("data-cartIndex");
    cart.splice(cartIndex, 1);
    renderCart();
}

// processes the cart selection for checkout. This will process the items in the cart and remove them from the invetory count in the DB.
const checkOut = function () {
    for (let i = 0; i < cart.length; i++) {
        $.get(`/api/products/${cart[i].id}`).then(function (product) {
            $.ajax({
                url: `api/products/${product.id}`,
                method: "PUT",
                data: {
                    product_name: product.product_name,
                    department_name: product.department_name,
                    price: product.price,
                    stock_quantity: product.stock_quantity - cart[i].quantityOrdered
                }
            }).then(function () {
                //clears cart items and provides a success message
                $(".myCartTable").empty();
                $(".orderTotal").empty();
                $(".myCartTable").append(`<div>Your goodies have been purchased. Thanks for doing business with Bamazon!</div>`);
                getAllProducts();
                cart.length = 0;
            });
        })
    }
}



getAllProducts();
$("#myCart").on("click", renderCart);
$(".table").on("click", ".addToCart", addToCart);
$(".table").on("click", "#productID", removeFromCart);
$("#checkOut").on("click", checkOut);