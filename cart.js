let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

const cartItems =
document.getElementById("cartItems");

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;
        totalItems += item.qty;

        cartItems.innerHTML += `
        <div class="cart-card">

            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="price">
                    ₹${item.price}
                </p>
            </div>

            <div class="quantity">

                <button onclick="decrease(${index})">
                -
                </button>

                <span>${item.qty}</span>

                <button onclick="increase(${index})">
                +
                </button>

            </div>

            <button
            class="delete-btn"
            onclick="removeItem(${index})">
                Delete
            </button>

        </div>
        `;
    });

    document.getElementById(
    "totalPrice"
    ).innerText = `₹${total}`;

    document.getElementById(
    "totalItems"
    ).innerText = totalItems;

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
}

function increase(index){

    cart[index].qty++;

    renderCart();
}

function decrease(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }

    renderCart();
}

function removeItem(index){

    cart.splice(index,1);

    renderCart();
}

function checkout(){

    let total =
    cart.reduce(
    (sum,item)=>
    sum + item.price*item.qty,
    0
    );

    const phone =
    "919876543210";

    const msg =
`Hello,

I have completed payment.

Order Total: ₹${total}

Please confirm my order.`;

    window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
    );
}

renderCart();