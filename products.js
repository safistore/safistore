import { db } from "./firebase-config.js";
import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const box = document.getElementById("products");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function load() {
  const snap = await getDocs(collection(db, "products"));

  snap.forEach(doc => {
    const p = doc.data();

    box.innerHTML += `
      <div class="card">
        <img src="${p.image}" width="150">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addCart('${p.name}', ${p.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

window.addCart = (name, price) => {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};

load();