import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

async function loadDashboard(){

const snapshot =
await getDocs(collection(db,"orders"));

let totalOrders = 0;
let totalRevenue = 0;
let pendingOrders = 0;
let deliveredOrders = 0;

const customers = new Set();

snapshot.forEach(doc=>{

const order = doc.data();

totalOrders++;

totalRevenue += Number(order.total || 0);

customers.add(order.phone);

if(order.orderStatus==="Pending"){
pendingOrders++;
}

if(order.orderStatus==="Delivered"){
deliveredOrders++;
}

});

document.getElementById("totalOrders").innerText =
totalOrders;

document.getElementById("totalRevenue").innerText =
"₹"+totalRevenue;

document.getElementById("pendingOrders").innerText =
pendingOrders;

document.getElementById("deliveredOrders").innerText =
deliveredOrders;

document.getElementById("totalCustomers").innerText =
customers.size;

}

loadDashboard();