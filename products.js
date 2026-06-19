import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

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
storageBucket: "safistore-c956b.appspot.com",
messagingSenderId: "977849577729",
appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

async function loadProducts(){

const container =
document.getElementById("productsContainer");

container.innerHTML = "";

const snapshot =
await getDocs(
collection(db,"products")
);

snapshot.forEach(product=>{

const data =
product.data();

container.innerHTML += `

<div class="product-card">

<img src="${data.image}" alt="${data.name}">

<h3>${data.name}</h3>

<p>${data.description}</p>

<div class="price">
₹${data.price}
</div>

<select class="size">

${data.sizes.map(size=>
`<option>${size}</option>`
).join("")}

</select>

<select class="color">

${data.colors.map(color=>
`<option>${color}</option>`
).join("")}

</select>

<button
onclick="addToCart(
'${product.id}',
'${data.name}',
${data.price},
'${data.image}'
)">

Add To Cart

</button>

</div>

`;

});

}

window.addToCart =
function(
id,
name,
price,
image
){

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

cart.push({
id,
name,
price,
image,
qty:1
});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert(
name +
" added to cart"
);

};

loadProducts();

document
.getElementById("searchInput")
.addEventListener(
"keyup",
function(){

const value =
this.value.toLowerCase();

const cards =
document.querySelectorAll(
".product-card"
);

cards.forEach(card=>{

const text =
card.innerText
.toLowerCase();

card.style.display =
text.includes(value)
? "block"
: "none";

});

});
