// CART STORAGE

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// ELEMENTS

const cartBtn =
document.getElementById("cartBtn");

const closeCart =
document.getElementById("closeCart");

const cartSidebar =
document.getElementById("cartSidebar");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const cartTotal =
document.getElementById("cartTotal");

const goToCart =
document.getElementById("goToCart");

// OPEN SIDEBAR

cartBtn.addEventListener(
"click",
() => {

    cartSidebar.classList.add(
    "active"
    );

}
);

// CLOSE SIDEBAR

closeCart.addEventListener(
"click",
() => {

    cartSidebar.classList.remove(
    "active"
    );

}
);

// ADD PRODUCT

function addToCart(
id,
name,
price,
image
){

    const existing =
    cart.find(
    item => item.id === id
    );

    if(existing){

        existing.qty++;

    }else{

        cart.push({

            id,
            name,
            price,
            image,
            qty:1

        });

    }

    saveCart();

    renderCart();

}

// SAVE CART

function saveCart(){

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

}

// UPDATE CART COUNT

function updateCartCount(){

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    cartCount.textContent =
    count;

}

// CALCULATE TOTAL

function calculateTotal(){

    let total = 0;

    cart.forEach(item => {

        total +=
        item.price *
        item.qty;

    });

    cartTotal.textContent =
    total;

}

// RENDER SIDEBAR CART

function renderCart(){

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML =

        `
        <p style="
        text-align:center;
        color:#94a3b8;
        ">
        Cart is empty
        </p>
        `;

    }

    cart.forEach(item => {

        cartItems.innerHTML +=

        `
        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="cart-details">

                <h4>
                ${item.name}
                </h4>

                <p>
                ₹${item.price}
                </p>

                <small>
                Qty:
                ${item.qty}
                </small>

            </div>

        </div>
        `;

    });

    updateCartCount();

    calculateTotal();

}

// GO TO CART PAGE

goToCart.addEventListener(
"click",
() => {

    window.location.href =
    "cart.html";

}
);

// INITIAL LOAD

renderCart();