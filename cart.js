let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer =
document.getElementById("cartContainer");

const totalAmount =
document.getElementById("totalAmount");

function renderCart(){

cartContainer.innerHTML = "";

let total = 0;

if(cart.length === 0){

cartContainer.innerHTML =
"<h3>Your Cart Is Empty</h3>";

totalAmount.innerText =
"Total: ₹0";

return;

}

cart.forEach((product,index)=>{

total += Number(product.price);

cartContainer.innerHTML += `

<div class="cart-item">

<div>
<h3>${product.name}</h3>
<p>₹${product.price}</p>
</div>

<button
class="remove-btn"
onclick="removeItem(${index})">
Remove
</button>

</div>

`;

});

totalAmount.innerText =
`Total: ₹${total}`;

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();

}

function goToPayment(){

if(cart.length === 0){

alert("Your cart is empty");

return;

}

window.location.href =
"payment.html";

}

window.removeItem = removeItem;
window.goToPayment = goToPayment;

renderCart();