import { db } from "./enterprise-config.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const box = document.getElementById("orders");

async function loadOrders() {
  const snap = await getDocs(collection(db, "orders"));

  snap.forEach(d => {
    const o = d.data();

    box.innerHTML += `
      <div class="order">
        <h4>${o.orderId}</h4>
        <p>Total: ₹${o.total}</p>
        <p>Status: ${o.status}</p>

        <button onclick="update('${d.id}','Confirmed')">Confirm</button>
        <button onclick="update('${d.id}','Shipped')">Ship</button>
        <button onclick="update('${d.id}','Delivered')">Deliver</button>
      </div>
    `;
  });
}

window.update = async (id, status) => {
  const ref = doc(db, "orders", id);
  await updateDoc(ref, { status });
  alert("Updated");
};

loadOrders();