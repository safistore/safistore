// Load cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD PRODUCT TO CART */

function addProduct(
    id,
    name,
    price,
    image,
    sizeId,
    colorId
){

    const size =
    document.getElementById(sizeId).value;

    const color =
    document.getElementById(colorId).value;

    // Check if same product with same variation exists

    const existingProduct =
    cart.find(item =>

        item.id === id &&
        item.size === size &&
        item.color === color

    );

    if(existingProduct){

        existingProduct.qty++;

    }else{

        cart.push({

            id: id,
            name: name,
            price: price,
            image: image,
            size: size,
            color: color,
            qty: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        `${name}\nSize: ${size}\nColor: ${color}\nAdded To Cart`
    );
}

/* SEARCH PRODUCTS */

function searchProducts(){

    const input =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const products =
    document.querySelectorAll(".product-card");

    products.forEach(product => {

        const title =
        product.querySelector("h3")
        .innerText
        .toLowerCase();

        if(title.includes(input)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}

/* UPDATE CART COUNT */

function updateCartCount(){

    const cartCount =
    document.getElementById("cartCount");

    if(!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.qty;

    });

    cartCount.innerText = totalItems;

}

/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const productsContainer =
document.getElementById("productsContainer");

async function loadProducts(){

const snapshot =
await getDocs(
collection(db,"products")
);

snapshot.forEach(doc=>{

const product =
doc.data();

productsContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.description}</p>

<h4>₹${product.price}</h4>

<select>

${product.sizes.map(size=>
`<option>${size}</option>`
).join("")}

</select>

<select>

${product.colors.map(color=>
`<option>${color}</option>`
).join("")}

</select>

<button>
Add To Cart
</button>

</div>

`;

});

}

loadProducts();