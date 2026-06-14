let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

let total = 0;

cart.forEach(item=>{

    total +=
    item.price * item.qty;
});

document.getElementById(
"amount"
).innerText =
`Total Amount: ₹${total}`;

function paymentDone(){

    window.location.href =
    "success.html";
}