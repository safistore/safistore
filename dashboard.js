if(localStorage.getItem("adminLoggedIn") !== "true"){

    window.location.href =
    "admin-login.html";

}

const totalProducts =
document.getElementById(
"totalProducts"
);

const totalOrders =
document.getElementById(
"totalOrders"
);

const totalRevenue =
document.getElementById(
"totalRevenue"
);

const ordersContainer =
document.getElementById(
"ordersContainer"
);

const products =
JSON.parse(
localStorage.getItem("products")
) || [];

const latestOrder =
JSON.parse(
localStorage.getItem("latestOrder")
);

totalProducts.innerText =
products.length;

if(latestOrder){

    totalOrders.innerText = 1;

    totalRevenue.innerText =
    `₹${latestOrder.total}`;

    ordersContainer.innerHTML = `

    <div class="order-card">

        <p>
        <strong>Name:</strong>
        ${latestOrder.customerName}
        </p>

        <p>
        <strong>Phone:</strong>
        ${latestOrder.phone}
        </p>

        <p>
        <strong>Address:</strong>
        ${latestOrder.address}
        </p>

        <p>
        <strong>Total:</strong>
        ₹${latestOrder.total}
        </p>

        <p>
        <strong>Status:</strong>
        ${latestOrder.status}
        </p>

    </div>

    `;

}else{

    totalOrders.innerText = 0;

    totalRevenue.innerText =
    "₹0";

}