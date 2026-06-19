import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAszpqCGgqPq-a90hcpy7lO5VrpNRfMxSQ",
authDomain: "safistore-c956b.firebaseapp.com",
projectId: "safistore-c956b",
storageBucket: "safistore-c956b.appspot.com",
messagingSenderId: "977849577729",
appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.addProduct = async function(){

const name =
document.getElementById("productName").value;

const description =
document.getElementById("productDescription").value;

const price =
document.getElementById("productPrice").value;

const image =
document.getElementById("productImage").value;

const sizes =
document.getElementById("productSizes").value
.split(",");

const colors =
document.getElementById("productColors").value
.split(",");

if(
!name ||
!description ||
!price ||
!image
){
alert("Fill all fields");
return;
}

await addDoc(
collection(db,"products"),
{
name,
description,
price:Number(price),
image,
sizes,
colors
}
);

alert("Product Added Successfully");

location.reload();

};

async function loadProducts(){

const container =
document.getElementById("productsContainer");

container.innerHTML = "";

const snapshot =
await getDocs(
collection(db,"products")
);

document.getElementById(
"totalProducts"
).innerText =
snapshot.size;

snapshot.forEach(product=>{

const data =
product.data();

container.innerHTML += `

<div class="product-card">

<img src="${data.image}">

<div class="product-info">

<h3>${data.name}</h3>

<p>${data.description}</p>

<div class="product-price">
₹${data.price}
</div>

<button
class="delete-btn"
onclick="deleteProduct('${product.id}')">

Delete

</button>

</div>

</div>

`;

});

}

window.deleteProduct =
async function(id){

if(
confirm("Delete Product?")
){

await deleteDoc(
doc(db,"products",id)
);

location.reload();

}

};

async function loadOrders(){

const container =
document.getElementById(
"ordersContainer"
);

const snapshot =
await getDocs(
collection(db,"orders")
);

container.innerHTML = "";

let revenue = 0;

document.getElementById(
"totalOrders"
).innerText =
snapshot.size;

snapshot.forEach(order=>{

const data =
order.data();

revenue +=
Number(data.total || 0);

container.innerHTML += `

<div class="order-card">

<h3>
Order ID:
${order.id}
</h3>

<p>
Customer:
${data.name || ""}
</p>

<p>
Phone:
${data.phone || ""}
</p>

<p>
Address:
${data.address || ""}
</p>

<p>
Total:
₹${data.total || 0}
</p>

</div>

`;

});

document.getElementById(
"totalRevenue"
).innerText =
"₹" + revenue;

}

loadProducts();

loadOrders();
