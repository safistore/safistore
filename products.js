let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function addProduct(
id,
name,
price,
image,
sizeId,
colorId
){

const size =
document.getElementById(sizeId).value;

const color =
document.getElementById(colorId).value;

const existing =
cart.find(item =>
item.id===id &&
item.size===size &&
item.color===color
);

if(existing){

existing.qty++;

}else{

cart.push({

id,
name,
price,
image,
size,
color,
qty:1

});

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert("Added To Cart");

}

function searchProducts(){

let input =
document.getElementById("searchInput")
.value
.toLowerCase();

let products =
document.querySelectorAll(".product-card");

products.forEach(product=>{

let title =
product.querySelector("h3")
.innerText
.toLowerCase();

product.style.display =
title.includes(input)
? "block"
: "none";

});

}

function updateCartCount(){

let count = 0;

cart.forEach(item=>{

count += item.qty;

});

document.getElementById(
"cartCount"
).innerText = count;

}

updateCartCount();