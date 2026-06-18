// LOAD CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// TOTAL

let total = 0;

// ELEMENTS

const orderTotal =
document.getElementById(
"orderTotal"
);

const productSummary =
document.getElementById(
"productSummary"
);

// SHOW PRODUCTS

function loadOrderSummary(){

    productSummary.innerHTML = "";

    if(cart.length === 0){

        productSummary.innerHTML =
        "<p>No products found.</p>";

        orderTotal.innerText = "₹0";

        return;
    }

    cart.forEach(item=>{

        const subtotal =
        item.price * item.qty;

        total += subtotal;

        productSummary.innerHTML +=

        `
        <div class="summary-item">

            <div>

                <strong>
                ${item.name}
                </strong>

                <br>

                Size:
                ${item.size}

                <br>

                Color:
                ${item.color}

                <br>

                Qty:
                ${item.qty}

            </div>

            <div>

                ₹${subtotal}

            </div>

        </div>
        `;

    });

    orderTotal.innerText =
    `₹${total}`;

}

loadOrderSummary();

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

// COMPLETE PAYMENT

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

    const address =
    document.getElementById(
    "customerAddress"
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

    // VALIDATION

    if(
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pincode
    ){

        alert(
        "Please fill all shipping details."
        );

        return;
    }

    // ORDER DETAILS

    let orderText = "";

    cart.forEach(item=>{

        orderText +=

`📦 ${item.name}
Size: ${item.size}
Color: ${item.color}
Qty: ${item.qty}
Price: ₹${item.price}

`;

    });

    // WHATSAPP MESSAGE

    const whatsappMessage =

`🛍 NEW ORDER RECEIVED

━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS

Name: ${name}

Phone: ${phone}

Email: ${email}

Address:
${address}

City: ${city}

State: ${state}

Pincode: ${pincode}

━━━━━━━━━━━━━━

📦 ORDER DETAILS

${orderText}

━━━━━━━━━━━━━━

💰 TOTAL AMOUNT

₹${total}

━━━━━━━━━━━━━━

✅ PAYMENT COMPLETED

Customer will send payment screenshot after opening WhatsApp.

Please verify payment and process shipment.`;

    // OPEN WHATSAPP

    window.open(

    `https://wa.me/919345314960?text=${encodeURIComponent(whatsappMessage)}`,

    "_blank"

    );

    // CLEAR CART

    localStorage.removeItem(
    "cart"
    );

    // REDIRECT

    setTimeout(()=>{

        window.location.href =
        "thankyou.html";

    },1500);

});