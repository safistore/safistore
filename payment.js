import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

/* =========================
   FIREBASE CONFIG
   Replace with your config
========================= */

const firebaseConfig = {
       apiKey: "AIzaSyAszpqCGgqPq-a90hcpy7lO5VrpNRfMxSQ",
    authDomain: "safistore-c956b.firebaseapp.com",
    projectId: "safistore-c956b",
    storageBucket: "safistore-c956b.firebasestorage.app",
    messagingSenderId: "977849577729",
    appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
   ORDER ID
========================= */

const orderId =
"SAFI" + Date.now();

document.getElementById("orderId").innerText =
orderId;

/* =========================
   LOAD CART
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let subtotal = 0;
let discount = 0;
const deliveryCharge = 50;

const orderSummary =
document.getElementById("orderSummary");

orderSummary.innerHTML = "";

cart.forEach(item => {

    const itemTotal =
    item.price * item.qty;

    subtotal += itemTotal;

    orderSummary.innerHTML += `
        <div class="order-item">

            <h4>${item.name}</h4>

            <p>Size: ${item.size || "-"}</p>

            <p>Color: ${item.color || "-"}</p>

            <p>Qty: ${item.qty}</p>

            <p>Price: ₹${item.price}</p>

            <p><strong>Total: ₹${itemTotal}</strong></p>

        </div>
    `;
});

updateTotals();

/* =========================
   TOTALS
========================= */

function updateTotals(){

    document.getElementById("subtotal")
    .innerText =
    "₹" + subtotal;

    document.getElementById("discount")
    .innerText =
    "₹" + discount;

    const finalTotal =
    subtotal - discount + deliveryCharge;

    document.getElementById("deliveryCharge")
    .innerText =
    "₹" + deliveryCharge;

    document.getElementById("finalTotal")
    .innerText =
    "₹" + finalTotal;
}

/* =========================
   COUPON
========================= */

window.applyCoupon = function(){

    const coupon =
    document.getElementById("couponCode")
    .value
    .trim()
    .toUpperCase();

    if(coupon === "SAFI10"){

        discount =
        Math.floor(subtotal * 0.10);

        alert("10% Discount Applied");

    }
    else{

        discount = 0;

        alert("Invalid Coupon");
    }

    updateTotals();
}

/* =========================
   COPY UPI
========================= */

window.copyUPI = function(){

    const upi =
    document.getElementById("upiId");

    upi.select();

    navigator.clipboard.writeText(
        upi.value
    );

    alert("UPI ID Copied");
}

/* =========================
   COMPLETE PAYMENT
========================= */

window.completePayment =
async function(){

    const customerName =
    document.getElementById("customerName").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const address =
    document.getElementById("address").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();

    if(
        !customerName ||
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

    const finalTotal =
    subtotal - discount + deliveryCharge;

    try{

        await addDoc(
            collection(db,"orders"),
            {

                orderId,

                customerName,
                phone,
                email,

                address,
                city,
                state,
                pincode,

                products: cart,

                subtotal,
                discount,
                deliveryCharge,
                total: finalTotal,

                paymentStatus: "Paid",
                orderStatus: "Pending",

                createdAt:
                serverTimestamp()

            }
        );

        const whatsappNumber =
        "919345314960"; // Replace with your number

        let productText = "";

        cart.forEach(item => {

            productText +=
            `${item.name}\n` +
            `Qty: ${item.qty}\n` +
            `Price: ₹${item.price}\n\n`;

        });

        const message =
`Hello,

I have completed the payment.

Order ID: ${orderId}

Customer Details

Name: ${customerName}
Phone: ${phone}
Address: ${address}
City: ${city}
State: ${state}
Pincode: ${pincode}

Order Details

${productText}

Total Amount: ₹${finalTotal}

Please verify and confirm my order.

Thank you.`;

        const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        localStorage.removeItem("cart");

        alert(
            "Order Saved Successfully!"
        );

        window.open(
            whatsappURL,
            "_blank"
        );

    }
    catch(error){

        console.error(error);

        alert(
            "Failed to save order."
        );
    }
}