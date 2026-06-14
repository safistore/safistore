// LOAD CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// ELEMENTS

const orderTotal =
document.getElementById(
"orderTotal"
);

const finishPaymentBtn =
document.getElementById(
"finishPaymentBtn"
);

// CALCULATE TOTAL

let total = 0;

cart.forEach(item => {

    total +=
    item.price *
    item.qty;

});

// DISPLAY TOTAL

orderTotal.textContent =
`₹${total}`;

// FINISH PAYMENT

finishPaymentBtn.addEventListener(
"click",
() => {

    if(cart.length === 0){

        alert(
        "Your cart is empty."
        );

        return;
    }

    // CREATE ORDER DETAILS

    let orderDetails =
    "";

    cart.forEach(item => {

        orderDetails +=

        `${item.name}
Qty: ${item.qty}
Price: ₹${item.price}

`;

    });

    const message =

`Hello,

I have completed the payment.

Order Details:

${orderDetails}

Total Amount: ₹${total}

I am attaching my payment screenshot.

Please verify and confirm my order.

Thank you.`;

    // OPEN WHATSAPP

    window.open(

    `https://wa.me/919345314960?text=${encodeURIComponent(message)}`,

    "_blank"

    );

    // CLEAR CART

    localStorage.removeItem(
    "cart"
    );

    // REDIRECT

    setTimeout(() => {

        window.location.href =
        "thankyou.html";

    }, 1500);

});