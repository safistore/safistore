import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const container = document.getElementById("productsContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {

  const snapshot = await getDocs(collection(db, "products"));

  container.innerHTML = "";

  snapshot.forEach(doc => {

    const p = doc.data();

    container.innerHTML += `
      <div class="product-card">

        <img src="${p.image}" />

        <h3>${p.name}</h3>

        <p>₹${p.price}</p>

        <button onclick="addToCart('${doc.id}', '${p.name}', ${p.price}, '${p.image}')">
          Add To Cart
        </button>

      </div>
    `;

  });

}

window.addToCart = function(id, name, price, image) {

  cart.push({
    id,
    name,
    price,
    image
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
};

loadProducts();