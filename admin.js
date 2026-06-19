import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
doc,
updateDoc
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

const container =
document.getElementById("ordersContainer");

window.updateStatus =
async function(id,status){

await updateDoc(
doc(db,"orders",id),
{
orderStatus:status
}
);

location.reload();
};

async function loadOrders(){

container.innerHTML="";

const snapshot =
await getDocs(collection(db,"orders"));

snapshot.forEach(orderDoc=>{

const order =
orderDoc.data();

let productsHTML="";

order.products.forEach(product=>{

productsHTML += `
<p>
${product.name}
× ${product.qty}
=
₹${product.price * product.qty}
</p>
`;

});

container.innerHTML += `

<div class="order-card">

<h3>
Order ID:
${order.orderId}
</h3>

<p>
Customer:
${order.customerName}
</p>

<p>
Phone:
${order.phone}
</p>

<p>
Address:
${order.address}
</p>

<p>
City:
${order.city}
</p>

<p>
State:
${order.state}
</p>

<p>
Pincode:
${order.pincode}
</p>

<hr>

${productsHTML}

<hr>

<p>
Total:
₹${order.total}
</p>

<p>
Status:
${order.orderStatus}
</p>

<div class="status-buttons">

<button onclick="
updateStatus(
'${orderDoc.id}',
'Pending'
)">
Pending
</button>

<button onclick="
updateStatus(
'${orderDoc.id}',
'Shipped'
)">
Shipped
</button>

<button onclick="
updateStatus(
'${orderDoc.id}',
'Delivered'
)">
Delivered
</button>

</div>

</div>
`;

});

}

loadOrders();