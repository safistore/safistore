import { db } from "./firebase-config.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

function orderId() {
  const d = new Date();
  return `SAFI-${d.getFullYear()}${d.getMonth()+1}${d.getDate()}-${Math.floor(1000+Math.random()*9000)}`;
}

window.placeOrder = async function() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const id = orderId();

  await addDoc(collection(db, "orders"), {
    orderId: id,
    items: cart,
    total: cart.reduce((a,b)=>a+b.price,0),
    status: "Pending"
  });

  localStorage.removeItem("cart");

  window.location.href = "thankyou.html";
};