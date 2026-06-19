import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {

/* PASTE YOUR FIREBASE CONFIG HERE */

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