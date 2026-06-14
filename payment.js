let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const orderTotal =
document.getElementById(
"orderTotal"
);

const finishPaymentBtn =
document.getElementById(
"finishPaymentBtn"
);

let total = 0;

cart.forEach(item => {

total +=
item.price *
item.qty;

});

orderTotal.innerText =
`₹${total}`;

function copyUPI(){

const upi =
document.getElementById(
"upiId"
).innerText;

navigator.clipboard
.writeText(upi)
.then(()=>{

const btn =
document.getElementById(
"copyBtn"
);

btn.innerHTML =
"Copied ✓";

setTimeout(()=>{

btn.innerHTML =
"Copy";

},2000);

});

}

finishPaymentBtn
.addEventListener(
"click",
()=>{

let details = "";

cart.forEach(item=>{

details +=
`${item.name}
Qty: ${item.qty}
Price: ₹${item.price}

`;

});

const message =

`Hello,

I have completed the payment.

Order Details:

${details}

Total Amount: ₹${total}

I am attaching my payment screenshot.

Please verify and confirm my order.

Thank you.`;

window.open(
`https://wa.me/919345314960?text=${encodeURIComponent(message)}`,
"_blank"
);

localStorage.removeItem(
"cart"
);

setTimeout(()=>{

window.location.href =
"thankyou.html";

},1500);

});