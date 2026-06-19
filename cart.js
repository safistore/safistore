const cartContainer =
document.getElementById("cartContainer");

const totalItems =
document.getElementById("totalItems");

const totalAmount =
document.getElementById("totalAmount");

function loadCart(){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

cartContainer.innerHTML = "";

if(cart.length === 0){

cartContainer.innerHTML = `

<div class="empty-cart">

<h2>Your Cart Is Empty</h2>

<p>Add products from Products Page</p>

</div>

`;

totalItems.innerText = "0";
totalAmount.innerText = "₹0";

return;

}

let grandTotal = 0;
let itemCount = 0;

cart.forEach((item,index)=>{

const quantity =
Number(item.quantity || 1);

const price =
Number(item.price || 0);

const subtotal =
price * quantity;

grandTotal += subtotal;
itemCount += quantity;

cartContainer.innerHTML += `

<div class="cart-item">

<img
src="${item.image}"
alt="${item.name}">

<div class="item-info">

<h3>${item.name}</h3>

<p class="price">
₹${price}
</p>

<div class="quantity-box">

<button onclick="decreaseQty(${index})">
-
</button>

<span>
${quantity}
</span>

<button onclick="increaseQty(${index})">
+
</button>

</div>

<p>
Subtotal:
₹${subtotal}
</p>

<button
class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

`;

});

totalItems.innerText = itemCount;
totalAmount.innerText = "₹" + grandTotal;

}

window.increaseQty = function(index){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

cart[index].quantity =
(cart[index].quantity || 1) + 1;

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

loadCart();

};

window.decreaseQty = function(index){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

if((cart[index].quantity || 1) > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

loadCart();

};

window.removeItem = function(index){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

loadCart();

};

document
.getElementById("clearCartBtn")
.addEventListener("click",()=>{

localStorage.removeItem("cart");

loadCart();

});

document
.getElementById("checkoutBtn")
.addEventListener("click",()=>{

alert("Checkout Coming Soon");

});

loadCart();