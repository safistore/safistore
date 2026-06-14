// LOAD CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

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

// INCREASE QTY

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    renderCart();
}

// DECREASE QTY

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();
}

// DELETE PRODUCT

function deleteItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();
}

// RENDER CART

function renderCart(){

    cartList.innerHTML = "";

    let itemsCount = 0;

    let total = 0;

    if(cart.length === 0){

        cartList.innerHTML =

        `
        <div class="empty-cart">

            <h2>
            Your cart is empty
            </h2>

            <br>

            <p>
            Add products to continue shopping.
            </p>

        </div>
        `;

        totalItems.textContent = 0;

        totalPrice.textContent = "₹0";

        return;
    }

    cart.forEach(
    (item,index)=>{

        itemsCount += item.qty;

        total +=
        item.price *
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
                Quantity:
                ${item.qty}
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
    itemsCount;

    totalPrice.textContent =
    `₹${total}`;
}

// PROCEED TO PAYMENT

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