import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

function copyUPI() {
  navigator.clipboard.writeText("9345314960@axl");
  alert("UPI Copied");
}
window.copyUPI = copyUPI;

function generateOrderId() {

  const d = new Date();

  const year = d.getFullYear();

  const month = String(d.getMonth() + 1).padStart(2, "0");

  const day = String(d.getDate()).padStart(2, "0");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `SAFI-${year}${month}${day}-${random}`;
}

const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  let itemsText = "";

  cart.forEach(item => {
    total += Number(item.price);
    itemsText += `${item.name} - ₹${item.price}\n`;
  });

  const orderId = generateOrderId();

  const orderData = {
    orderId,
    customerName: name,
    phone,
    address,
    items: cart,
    total,
    status: "Pending",
    createdAt: Timestamp.now()
  };

  // SAVE TO FIREBASE
  await addDoc(collection(db, "orders"), orderData);

  // WHATSAPP MESSAGE
  const message = `
🛒 SAFI STORE ORDER

Order ID: ${orderId}
Name: ${name}
Phone: ${phone}
Address: ${address}

Items:
${itemsText}

Total: ₹${total}
Status: Pending Verification
`;

  window.open(
    `https://wa.me/919345314960?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  localStorage.setItem("latestOrder", JSON.stringify(orderData));

  window.location.href = "thankyou.html";
});