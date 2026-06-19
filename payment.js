function copyUPI(){

const upi =
document.getElementById("upiId");

navigator.clipboard.writeText(
upi.value
);

alert("UPI ID Copied");

}

window.copyUPI = copyUPI;

const orderForm =
document.getElementById("orderForm");

orderForm.addEventListener(
"submit",
function(e){

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

cart.forEach(item=>{

total += Number(item.price);

orderItems +=
`${item.name} - ₹${item.price}\n`;

});

const orderData = {

customerName:name,
phone:phone,
address:address,
products:cart,
total:total,
status:"Pending"

};

localStorage.setItem(
"latestOrder",
JSON.stringify(orderData)
);

const message =

`🛒 SAFI STORE NEW ORDER

Customer Name:
${name}

Phone:
${phone}

Address:
${address}

Products:
${orderItems}

Total:
₹${total}

Payment Completed.

Please Verify Payment.`;

window.open(
`https://wa.me/919345314960?text=${encodeURIComponent(message)}`,
"_blank"
);

window.location.href =
"thankyou.html";

});