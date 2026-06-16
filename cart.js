// LOAD CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// ELEMENTS

const cartList =
document.getElementById(
"cartList"
);

const totalItems =
document.getElementById(
"totalItems"
);

const totalPrice =
document.getElementById(
"totalPrice"
);

const paymentBtn =
document.getElementById(
"paymentBtn"
);

// SAVE CART

function saveCart(){

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

}

// INCREASE QUANTITY

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    renderCart();

}

// DECREASE QUANTITY

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

// DELETE ITEM

function deleteItem(index){

    if(confirm(
    "Remove this item from cart?"
    )){

        cart.splice(index,1);

        saveCart();

        renderCart();

    }

}

// RENDER CART

function renderCart(){

    cartList.innerHTML = "";

    let total = 0;

    let itemCount = 0;

    if(cart.length === 0){

        cartList.innerHTML =

        `
        <div class="empty-cart">

            <h2>
            🛒 Your Cart Is Empty
            </h2>

            <p>
            Add some products to continue shopping.
            </p>

        </div>
        `;

        totalItems.textContent = "0";

        totalPrice.textContent = "₹0";

        return;

    }

    cart.forEach((item,index)=>{

        total +=
        item.price *
        item.qty;

        itemCount +=
        item.qty;

        cartList.innerHTML +=

        `
        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="item-details">

                <h3>
                ${item.name}
                </h3>

                <p>
                Size:
                ${item.size}
                </p>

                <p>
                Color:
                ${item.color}
                </p>

                <p class="price">
                ₹${item.price}
                </p>

            </div>

            <div class="quantity">

                <button
                onclick="decreaseQty(${index})">

                -

                </button>

                <span>

                ${item.qty}

                </span>

                <button
                onclick="increaseQty(${index})">

                +

                </button>

            </div>

            <button
            class="delete-btn"
            onclick="deleteItem(${index})">

            🗑

            </button>

        </div>
        `;

    });

    totalItems.textContent =
    itemCount;

    totalPrice.textContent =
    `₹${total}`;

}

// PAYMENT BUTTON

paymentBtn.addEventListener(
"click",
()=>{

    if(cart.length === 0){

        alert(
        "Your cart is empty."
        );

        return;

    }

    window.location.href =
    "payment.html";

}
);

// INITIAL LOAD

renderCart();