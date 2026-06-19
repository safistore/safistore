function copyUPI() {

    const upi = document.getElementById("upiId");

    navigator.clipboard.writeText(upi.value);

    alert("UPI ID Copied Successfully");

}

window.copyUPI = copyUPI;

const orderForm =
document.getElementById("orderForm");

function generateOrderId() {

    const today = new Date();

    const year = today.getFullYear();

    const month =
    String(today.getMonth() + 1)
    .padStart(2, "0");

    const day =
    String(today.getDate())
    .padStart(2, "0");

    const randomNumber =
    Math.floor(
        1000 + Math.random() * 9000
    );

    return `SAFI-${year}${month}${day}-${randomNumber}`;

}

orderForm.addEventListener(
"submit",
function (e) {

    e.preventDefault();

    const name =
    document.getElementById(
    "customerName"
    ).value;

    const phone =
    document.getElementById(
    "customerPhone"
    ).value;

    const address =
    document.getElementById(
    "customerAddress"
    ).value;

    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    let total = 0;

    let orderItems = "";

    cart.forEach(item => {

        total += Number(item.price);

        orderItems +=
        `${item.name} - ₹${item.price}\n`;

    });

    const orderId =
    generateOrderId();

    const orderData = {

        orderId: orderId,

        customerName: name,

        phone: phone,

        address: address,

        products: cart,

        total: total,

        status: "Pending",

        orderDate:
        new Date().toLocaleString()

    };

    localStorage.setItem(
    "latestOrder",
    JSON.stringify(orderData)
    );

    const message =

`🛒 SAFI STORE NEW ORDER

Order ID:
${orderId}

Customer Name:
${name}

Phone:
${phone}

Address:
${address}

Products:
${orderItems}

Total Amount:
₹${total}

Order Status:
Pending Verification

Please Verify Payment.`;

    window.open(
    `https://wa.me/919345314960?text=${encodeURIComponent(message)}`,
    "_blank"
    );

    window.location.href =
    "thankyou.html";

});