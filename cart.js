const cartContainer =
document.getElementById("cartContainer");

const totalItems =
document.getElementById("totalItems");

const totalAmount =
document.getElementById("totalAmount");

/* Get Cart */

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}

/* Save Cart */

function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* Load Cart */

function loadCart(){

    let cart = getCart();

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <h2>Your Cart Is Empty</h2>

            <p>
                Add products from the store.
            </p>

        </div>

        `;

        totalItems.innerText = "0";
        totalAmount.innerText = "₹0";

        return;
    }

    let grandTotal = 0;
    let itemCount = 0;

    cart.forEach((item,index)=>{

        const quantity =
        Number(item.quantity || 1);

        const price =
        Number(item.price || 0);

        const subtotal =
        price * quantity;

        grandTotal += subtotal;
        itemCount += quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="item-info">

                <h3>${item.name}</h3>

                <div class="price">
                    ₹${price}
                </div>

                <div class="quantity-box">

                    <button
                    onclick="decreaseQty(${index})">
                    -
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                    onclick="increaseQty(${index})">
                    +
                    </button>

                </div>

                <p>
                    Subtotal:
                    ₹${subtotal}
                </p>

                <button
                class="remove-btn"
                onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    totalItems.innerText = itemCount;
    totalAmount.innerText = "₹" + grandTotal;

}

/* Increase Quantity */

window.increaseQty = function(index){

    let cart = getCart();

    cart[index].quantity =
    (cart[index].quantity || 1) + 1;

    saveCart(cart);

    loadCart();

};

/* Decrease Quantity */

window.decreaseQty = function(index){

    let cart = getCart();

    if((cart[index].quantity || 1) > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart(cart);

    loadCart();

};

/* Remove Item */

window.removeItem = function(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    loadCart();

};

/* Clear Cart */

document
.getElementById("clearCartBtn")
.addEventListener("click",()=>{

    if(confirm("Clear all cart items?")){

        localStorage.removeItem("cart");

        loadCart();

    }

});

/* Checkout */

document
.getElementById("checkoutBtn")
.addEventListener("click",()=>{

    let cart = getCart();

    if(cart.length === 0){

        alert("Your cart is empty");

        return;
    }

    window.location.href =
    "payment.html";

});

/* Start */

loadCart();