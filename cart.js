import { db } from "./firebase-config.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const box = document.getElementById("cart");

cart.forEach(item => {
  box.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
});

function orderId() {
  const d = new Date();
  return `SAFI-${d.getFullYear()}${d.getMonth()+1}${d.getDate()}-${Math.floor(Math.random()*9000)}`;
}

window.order = async function() {

  const id = orderId();

  await addDoc(collection(db, "orders"), {
    orderId: id,
    items: cart,
    status: "Pending",
    total: cart.reduce((a,b)=>a+b.price,0)
  });

  localStorage.removeItem("cart");

  alert("Order placed: " + id);

  window.location.href = "thankyou.html";
};