import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "safistore-c956b.firebaseapp.com",
    projectId: "safistore-c956b",
    storageBucket: "safistore-c956b.firebasestorage.app",
    messagingSenderId: "977849577729",
    appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveOrder() {

    try {

        const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

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

        if (
            !customerName ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !pincode
        ) {
            alert("Please fill all shipping details.");
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.qty;
        });

        const deliveryCharge = 50;
        const total = subtotal + deliveryCharge;

        const orderId =
        "SAFI" + Date.now();

        await addDoc(
            collection(db, "orders"),
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
                deliveryCharge,
                total,

                paymentStatus: "Paid",
                orderStatus: "Pending",

                createdAt: serverTimestamp()
            }
        );

        alert(
            "Order Placed Successfully!\nOrder ID: " +
            orderId
        );

        localStorage.removeItem("cart");

    } catch (error) {

        console.error(error);

        alert(
            "Failed to save order."
        );
    }
}

window.saveOrder = saveOrder;