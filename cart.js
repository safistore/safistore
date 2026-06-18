let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const cartContainer =
document.getElementById(
"cartContainer"
);

const cartTotal =
document.getElementById(
"cartTotal"
);

function loadCart(){

    cartContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML =

        `
        <div class="empty-cart">

            <h2>Your Cart Is Empty</h2>

            <p>
            Add products from the store.
            </p>

        </div>
        `;

        cartTotal.innerText = "₹0";

        return;
    }

    cart.forEach((item,index)=>{

        total +=
        item.price * item.qty;

        cartContainer.innerHTML +=

        `
        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="item-details">

                <h3>${item.name}</h3>

                <p>
                Size:
                ${item.size}
                </p>

                <p>
                Color:
                ${item.color}
                </p>

                <div class="quantity-box">

                    <button
                    class="qty-btn"
                    onclick="decreaseQty(${index})">

                    -

                    </button>

                    <span class="qty">

                    ${item.qty}

                    </span>

                    <button
                    class="qty-btn"
                    onclick="increaseQty(${index})">

                    +

                    </button>

                </div>

                <button
                class="delete-btn"
                onclick="removeItem(${index})">

                Delete

                </button>

            </div>

            <div class="item-price">

                ₹${item.price * item.qty}

            </div>

        </div>
        `;

    });

    cartTotal.innerText =
    `₹${total}`;

}

function increaseQty(index){

    cart[index].qty++;

    saveCart();

}

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }

    saveCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

}

function saveCart(){

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    loadCart();

}

function goToPayment(){

    if(cart.length === 0){

        alert(
        "Your cart is empty!"
        );

        return;
    }

    window.location.href =
    "payment.html";

}

loadCart();