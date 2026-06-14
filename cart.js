let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let container =
document.getElementById("cartItems");

let total = 0;

cart.forEach(item=>{

    total += item.price;

    container.innerHTML += `
        <div>
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <hr><br>
        </div>
    `;
});

document.querySelector("h3")
.innerHTML = `Total : ₹${total}`;

function confirmOrder(){

    let phone = "919876543210";

    let message =
`Hello,

I have completed payment.

Order Total: ₹${total}

Please confirm my order.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    );
}