// LOAD CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// CALCULATE TOTAL

let total = 0;

cart.forEach(item => {

    total += item.price * item.qty;

});

// SHOW TOTAL

document.getElementById(
"orderTotal"
).innerText = "₹" + total;

// COPY UPI

function copyUPI(){

    const upi =
    document.getElementById(
    "upiId"
    ).innerText;

    navigator.clipboard
    .writeText(upi);

    const btn =
    document.getElementById(
    "copyBtn"
    );

    btn.innerText =
    "Copied ✓";

    setTimeout(()=>{

        btn.innerText =
        "Copy";

    },2000);

}

// FINISH PAYMENT

document.getElementById(
"finishPaymentBtn"
).addEventListener(
"click",
function(){

    const name =
    document.getElementById(
    "customerName"
    ).value.trim();

    const phone =
    document.getElementById(
    "customerPhone"
    ).value.trim();

    const email =
    document.getElementById(
    "customerEmail"
    ).value.trim();

    const city =
    document.getElementById(
    "customerCity"
    ).value.trim();

    const state =
    document.getElementById(
    "customerState"
    ).value.trim();

    const pincode =
    document.getElementById(
    "customerPincode"
    ).value.trim();

    const address =
    document.getElementById(
    "customerAddress"
    ).value.trim();

    if(
        !name ||
        !phone ||
        !city ||
        !state ||
        !pincode ||
        !address
    ){

        alert(
        "Please fill all shipping details."
        );

        return;
    }

    let orderDetails = "";

    cart.forEach(item => {

        orderDetails +=

`Product: ${item.name}
Size: ${item.size}
Color: ${item.color}
Quantity: ${item.qty}
Price: ₹${item.price}

`;

    });

    const message =

`🛍 NEW ORDER

CUSTOMER DETAILS

Name: ${name}

Phone: ${phone}

Email: ${email}

Address:
${address}

City: ${city}

State: ${state}

Pincode: ${pincode}

----------------------

ORDER DETAILS

${orderDetails}

----------------------

TOTAL AMOUNT: ₹${total}

Payment Completed.

Customer will send payment screenshot.`;

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

    },1000);

});