const products = [];
const customers = [];
const orders = [];
const promotions = [];
const cart = [];

let customerID = 1000;
let orderID = 4000;
let productID = 10;

class Product {
    constructor(id, name, price, stock, promotions = []) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.initialStock = stock;//for alert dipping below levels. added late...
        this.isOnSale = false;
        this.promotions = promotions;//link to promotions array storage
    }

    //will apply logic within the function itself
    // applyPromotion (discountPercentage) {
    //     this.isOnSale = true;
    //     this.price *= (1 - discountPercentage / 100); //apply discount rate
    // }
}

class Customer {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }
}

class Order {
    constructor(id, customer, products, orderdate, totalcost) {
        this.id = id;
        this.customer = customer;
        this.products = products; //array to have access to quantity
        this.orderdate = orderdate;
        this.totalcost = totalcost;
        this.status = 'Pending';//default state
    }
    //scrapped
    // completeOrder() {
    //     this.status = 'Completed';
    // }

    // cancelOrder() {
    //     this.status = 'Cancelled';
    // }
}

class Promotion {
    constructor(productId, discountPercentage, startDate, endDate, desc) {
        this.productId = productId;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.desc = desc;
    }

    isActive() {
        const now = new Date();
        return now >= this.startDate && now <= this.endDate;
    }
    
}
//scrapped
// function showPromosInSelect () {

// }

class CartItem {
    constructor(name, quantity, cost) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }
}

//TODO
//instead of using alert all the time
// function showNotification(message, identifier) {
//     const notification = document.querySelector(`#notification${identifier}`);
//     notification.textContent = message;


//     //automatically hide the notification after 3 seconds
//     setTimeout(() => {
//         notification.style.display = 'none';
//     }, 3000);
// }

//done
function addCustomer () {
    //event.preventDefault();//prevent form submission
    //scrapped the form element

    const cName = toTitleCase(document.querySelector('#customerName').value); //name will alwayus be in title case
    const id = customerID++; //start from 1000

    customers.push(new Customer(id, cName)); //add to array storage

    customersInSelect(); // Update the dropdown after adding a customer
}
//done
//populate the select tag with registered customers
function customersInSelect () { //can have same name customers but not same id
    const selectCustomer = document.querySelector('#profileSelect');
    selectCustomer.innerHTML = ''; //clear options after adding a new product

    //default 
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Please choose a profile';
    selectCustomer.appendChild(defaultOption);

    //iterate through array to populate the select tag
    customers.forEach((customer) => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name + ' ' + '(ID:' + customer.id + ')'; //display name and id 
        selectCustomer.appendChild(option);
    });
}
//done
//display hardcoded promotions via a checkbox, to allow users to select more than one options
function displayPromotionOptions() {
    const promotionContainer = document.querySelector('#promotionOptions');
    promotionContainer.innerHTML = ''; //clear previous options

    //iterate through array to create label element for each
    promotions.forEach((promo) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" id="promoID${promo.productId}" name="promotion" value="${promo.discountPercentage}"> ${promo.desc} (ID: ${promo.productId})`; //using productId as ID used as identifier
        promotionContainer.appendChild(label);
        promotionContainer.appendChild(document.createElement('br')); //add line break
    });
}
//done
//given the values inputted in the html input tags and the checking the checked checkboxes store the information as properties of the product class and store the objects in the products array
function addProduct (event) {
    event.preventDefault();//prevent form submission

    const pName = toTitleCase(document.querySelector('#productName').value); //names can have symbols and numbers 
    const pPrice = parseFloat(document.querySelector('#productPrice').value);
    const pStock = parseInt(document.querySelector('#productStock').value);
    const pPromo = document.querySelectorAll('#promotionOptions input[type="checkbox"]:checked');//check for checked boxes, can use global as this is the only instance of the checkbox in the html
    let selectedPromotions = [];//store checkboxes that are checked in a array and will display the array itself when pushing product

    //iterates through the checkboxes
    pPromo.forEach(checkbox => {
        const productId = parseInt(checkbox.id.replace('promoID', '')); //extract product ID from checkbox ID
        const promotion = promotions.find(promo => promo.productId === productId);//find the matching productid in promotions array
        //if found add to array selectedPromotions[]
        if (promotion) {
            selectedPromotions.push(promotion);
        }
    });


    let productExists = false;
    const lowercaseName = pName.toLowerCase(); //cannot add the product if the only the casing of the letters is different

    for (let i = 0; i < products.length; i++) {
        if (lowercaseName === products[i].name.toLowerCase()) {
            productExists = true;
            break;
        }
    }

    if (productExists) {
        alert("Cannot re-register an existing product.");
        return;
    }

    //can add/register products even if the stock level = 0, but cannot add if price <= 0 or stock < 0. 
    if (pPrice === NaN || pStock === NaN || pPrice <= 0 || pStock < 0) { 
        alert("Please enter a valid number for the price/stock.");
        return;
    }

    products.push(new Product(productID++, pName, pPrice, pStock, selectedPromotions));
    //call functions to refresh displays
    displayProducts();
    document.getElementById('productForm').reset();
    displayPromotionOptions();
}
//done
//products will always be in titlecase, first letter of each word is capitalized
function toTitleCase(name) {
    return name
        .toLowerCase() //convert to lowercase first
        .split(' ') //split on spaces to make an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))//for each word in the array capitalize the first letter
        .join(' ');//join the words together as a string with spaces being the separator
}
//done
//display products that are registered by creating elements of 'tr' in a table
function displayProducts () {
    const table = document.querySelector('#tbodyProduct');
    table.innerHTML = '';


    //for each product do:
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const nameBlock = document.createElement('td');
        nameBlock.textContent = product.name;
        row.appendChild(nameBlock);

        // const priceBlock = document.createElement('td');
        // priceBlock.textContent = '$' + (product.isOnSale ? (product.price * 0.9).toFixed(2) : product.price.toFixed(2)); // Example for sale price
        // row.appendChild(priceBlock);

        const priceBlock = document.createElement('td');
        priceBlock.textContent = '$' + product.price.toFixed(2); //2 decimal places 
        row.appendChild(priceBlock);

        const stockBlock = document.createElement('td');
        stockBlock.textContent = product.stock;
        stockBlock.id = `productStock${index}`;
        row.appendChild(stockBlock);

        const promotionBlock = document.createElement('td');
        promotionBlock.style.textAlign = 'center';
        promotionBlock.textContent = product.promotions.length > 0 ? product.promotions.map(promo => promo.desc).join(' + ') : "N/A"; //display promotion descriptions
        row.appendChild(promotionBlock);

        const addToCartBlock = document.createElement('td');
        const selectProductAmount = document.createElement('input');
        const addToCartBttn = document.createElement('button');
        addToCartBttn.style = "margin-left: 10px;" //add spacing between input and button

        addToCartBlock.appendChild(selectProductAmount);

        selectProductAmount.type = "number";
        selectProductAmount.id = `productAmount${index}`;
        selectProductAmount.placeholder = "Select quantity";
        selectProductAmount.min = "0";
        
        addToCartBttn.textContent = "Add to cart";
        addToCartBttn.addEventListener('click', () => addToCart(index));
        addToCartBlock.appendChild(addToCartBttn);
        row.appendChild(addToCartBlock);

        table.appendChild(row);
        
    });    
}
//done
//also updates stock count dynamically even before checkout
function addToCart(index) {

    //extract the correct data
    const amountInput = document.querySelector(`#productAmount${index}`);
    const amount = parseInt(amountInput.value);

    // const stockInput = document.querySelector(`#productStock${index}`);
    // let stock = parseInt(stockInput.value);

    // stock = stock - amount;
    
    if (amount > 0) {
        const product = products[index];

        if (amount > product.stock) {
            alert('Not enough stock available.');
            return;
        }

        const cost = (product.price) * amount;

        product.stock -= amount; //update stock directly

        //check if stock dips below 20% of initial stock below 20 percent of its original stock
        if (product.stock < (product.initialStock * 0.20)) {
            alert(`Stock for ${product.name} is below 20%!`);
        }
        
        //add to array when all conditons are met
        cart.push(new CartItem (product.name, amount, cost));

        alert(`${amount} of ${product.name} added to the cart.`);

        displayShoppingCart();
        displayProducts();

    } else {
        alert('Please select a valid amount.');
    }

    //refresh display functions, might be redundant...
    displayShoppingCart();
    displayProducts();
    
}
//done
function displayShoppingCart() {
    const shoppingCartTable = document.querySelector('#tbodyShoppingCart');
    shoppingCartTable.innerHTML = '';
    let sumOfProductCosts = 0;

    //default display if empty
    if (cart.length === 0) {
        shoppingCartTable.innerHTML = `<td></td><td></td><td></td>`;
    }

    //make rows for the table in html div tbodyshoppingcart
    //make "cells" for each sections first then populate the cells with the right data from arrays
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.id = `cartRow${index}`;

        const nameBlock = document.createElement('td');
        nameBlock.textContent = item.name;
        row.appendChild(nameBlock);

        const quantityBlock = document.createElement('td');
        quantityBlock.textContent = item.quantity;
        quantityBlock.style = 'text-align: center;';
        row.appendChild(quantityBlock);

        const product = products.find(p => p.name === item.name);
        let discountedPrice = product.price;

        //apply promotions cumulatively
        product.promotions.forEach(promo => {
            if (promo.isActive()) {
                discountedPrice *= (1 - promo.discountPercentage / 100);
            }
        });
        //apply the cost appropriatley with promotions if there are any
        const costBlock = document.createElement('td');
        const cost = (discountedPrice * item.quantity).toFixed(2);
        costBlock.textContent = '$' + cost;
        row.appendChild(costBlock);

        const removeFromCartBttn = document.createElement('button');
        removeFromCartBttn.textContent = "Remove";
        removeFromCartBttn.addEventListener('click', () => removeFromCart(index));//identify what row to remove
        removeFromCartBttn.style = "margin-left: 10px;";
        costBlock.appendChild(removeFromCartBttn);

        shoppingCartTable.appendChild(row);
        sumOfProductCosts += parseFloat(cost);
    });

    const footerRow = document.querySelector('#totalCostNumber');
    footerRow.innerHTML = `$${sumOfProductCosts.toFixed(2)}`;//formatting with dollar sign
}

//done
function removeFromCart(index) {
    const item = cart[index];//use the index used in the foreach loop as the identifier

    if (item) {
        const product = products.find(p => p.name === item.name);//find same name in cart and products
        if (product) {
            product.stock += item.quantity; //restore stock
        }

        cart.splice(index, 1); //remove item from cart
        alert(`${item.quantity} of ${item.name} removed from the cart.`);

        displayShoppingCart();
        displayProducts();
    } else {
        alert('Item not found in cart.');
    }
}
//done
function addOrder() {
    //empty cart case
    if (cart.length === 0) {
        alert("The shopping cart is empty.");
        return;
    }

    const selectCustomer = document.querySelector('#profileSelect');
    const orderCustomerId = selectCustomer.value;
    //no chosen profile case
    if (!orderCustomerId) {
        alert("Please select a profile before placing an order.");
        return;
    }

    const orderCustomer = customers.find(c => c.id == orderCustomerId).name; //find from customers array for the name matching id 
    //const orderProducts = cart.map(item => item.name).join(', ');
    const orderDate = new Date().toLocaleString();//get current time
    const totalCost = document.querySelector('#totalCostNumber').textContent;//get total cost from cart

    //an array to hold the multiple product names in an order
    const orderProducts = cart.map(item => ({
        name: item.name,
        quantity: item.quantity
    }));

    //the array itself is the display value in the class
    const newOrder = new Order(orderID++, orderCustomer, orderProducts, orderDate, totalCost);
    orders.push(newOrder);

    //clear the cart after placing the order
    cart.length = 0;

    displayOrders();
    displayShoppingCart(); //this will reset the cart display
    alert("Order placed successfully!");
}
//done
function displayOrders () {

    const orderTableBody = document.querySelector('#orderTableBody');
    orderTableBody.innerHTML = ''; 

    //create rows and cells matching the table in the html ordersTable
    orders.forEach ((order, index) => {
        const row = document.createElement('tr');
        row.id = `orderRow${index}`;

        const idBlock = document.createElement('td');
        idBlock.textContent = order.id;
        row.appendChild(idBlock);

        const customerBlock = document.createElement('td');
        customerBlock.textContent = order.customer;
        row.appendChild(customerBlock);

        const productBlock = document.createElement('td');
        productBlock.textContent = order.products.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ');
        row.appendChild(productBlock);

        const orderDateBlock = document.createElement('td');
        orderDateBlock.textContent = order.orderdate;
        row.appendChild(orderDateBlock);

        const totalCostBlock = document.createElement('td');
        totalCostBlock.textContent = order.totalcost;
        row.appendChild(totalCostBlock);

        const removeFromCartBttn = document.createElement('button');
        removeFromCartBttn.textContent = "Delete Order";
        removeFromCartBttn.addEventListener('click', () => removeFromOrder(index));
        removeFromCartBttn.style = "margin-left: 10px;" //need to change for different number of digits 
        totalCostBlock.appendChild(removeFromCartBttn);

        orderTableBody.appendChild(row);

    })
}

//done
function removeFromOrder(index) {
    const order = orders[index];

    if (order) {
        //restore stock for each product in the order
        order.products.forEach(product => {
            const foundProduct = products.find(p => p.name === product.name);
            if (foundProduct) {
                //check if quantity is a valid number
                if (typeof product.quantity === 'number' && product.quantity > 0) {
                    foundProduct.stock += product.quantity; // Restore the correct quantity
                } else {
                    console.error(`Invalid quantity for product: ${product.name}`);
                }
            } else {
                console.error(`Product not found: ${product.name}`);
            }
        });

        //remove the order from the orders array
        orders.splice(index, 1);
        alert(`Order for ${order.customer} has been removed.`, 'Order');
        displayOrders(); //update the order display
        displayProducts(); //update product display for stock changes
    } else {
        alert('Order not found.');
    }
}





//hardcoded values

customers.push(new Customer(customerID++, "David Kim"));
customersInSelect();

promotions.push(new Promotion(1, 10, new Date('2024-11-01'), new Date('2024-12-01'), "10% Off"));
promotions.push(new Promotion(2, 20, new Date('2024-11-01'), new Date('2024-11-30'), "20% Off"));
promotions.push(new Promotion(3, 15, new Date('2024-11-01'), new Date('2024-11-20'), "15% Off"));

products.push(new Product(1, "Laptop", 1199.99, 50, [promotions[0]]));
products.push(new Product(2, "Phone", 799, 15, [promotions[1]]));
products.push(new Product(3, "Charger", 15.99, 150, [promotions[1]]));
products.push(new Product(4, "Bed", 1699.99, 5, [promotions[0]]));
products.push(new Product(5, "Chair", 315.49, 100));
products.push(new Product(6, "Guitar", 734.99, 75));
products.push(new Product(7, "Shoes", 149.99, 60, [promotions[0]]));
products.push(new Product(8, "Hat", 13.49, 20));
products.push(new Product(9, "Socks", 5.99, 30, [promotions[0], promotions[2]]));
products.push(new Product(10, "Gloves", 7.99, 250));

//functions calls for display functions

displayProducts();
displayOrders();
displayShoppingCart();
displayPromotionOptions();


/*
SCRAPPED
displays the products array elements in the select element 
function productsInSelect () {
    const selectProductForCart = document.querySelector('#addToCartProduct');
    selectProductForCart.innerHTML = ''; //clear options after adding a new product

    products.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        selectProductForCart.appendChild(option);
    });

    const selectQuantityForCart = document.querySelector('#addToCartQuantity');
    selectQuantityForCart.innerHTML = '';

    const selectedProduct = selectProductForCart.value;
    const foundProduct = null;

    for (let i = 0; i < products.length; i++) {    
        
        if (selectProductForCart.value === products[i].name) {
            foundProduct = products[i];
            break;
        }
    }

    if (foundProduct) {
        for (let j = 1; j <= foundProduct.stock; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = j;
            selectQuantityForCart.appendChild(option);
        }
    }

}
    */