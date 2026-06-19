import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const productsEl = document.getElementById("totalProducts");
const ordersEl = document.getElementById("totalOrders");
const revenueEl = document.getElementById("totalRevenue");
const ordersContainer = document.getElementById("ordersContainer");

/* =========================
   LOAD DASHBOARD DATA
========================= */

async function loadDashboard() {

  const productsSnap = await getDocs(collection(db, "products"));
  const ordersSnap = await getDocs(collection(db, "orders"));

  let revenue = 0;

  productsEl.innerText = productsSnap.size;
  ordersEl.innerText = ordersSnap.size;

  ordersContainer.innerHTML = "";

  if (ordersSnap.empty) {
    ordersContainer.innerHTML = "<p>No Orders Found</p>";
    revenueEl.innerText = "₹0";
    return;
  }

  ordersSnap.forEach(docSnap => {

    const o = docSnap.data();
    const id = docSnap.id;

    revenue += Number(o.total);

    ordersContainer.innerHTML += `
      <div class="order-card">

        <p><b>Order ID:</b> ${o.orderId}</p>
        <p><b>Name:</b> ${o.customerName}</p>
        <p><b>Phone:</b> ${o.phone}</p>
        <p><b>Total:</b> ₹${o.total}</p>

        <p>
          <b>Status:</b>
          <span id="status-${id}">${o.status}</span>
        </p>

        <select id="select-${id}">
          <option value="Pending" ${o.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Confirmed" ${o.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Shipped" ${o.status === "Shipped" ? "selected" : ""}>Shipped</option>
          <option value="Delivered" ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>

        <button onclick="updateStatus('${id}')">
          Update Status
        </button>

      </div>
    `;

  });

  revenueEl.innerText = "₹" + revenue;

}

loadDashboard();

/* =========================
   UPDATE ORDER STATUS
========================= */

window.updateStatus = async function(id) {

  const select = document.getElementById(`select-${id}`);
  const newStatus = select.value;

  try {

    const orderRef = doc(db, "orders", id);

    await updateDoc(orderRef, {
      status: newStatus
    });

    document.getElementById(`status-${id}`).innerText = newStatus;

    alert("Order status updated to: " + newStatus);

  } catch (error) {

    alert("Error updating status: " + error.message);

  }

};