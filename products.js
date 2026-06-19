const products = [

{
id:1,
name:"Smart Phone",
price:9999,
image:"https://via.placeholder.com/300x220"
},

{
id:2,
name:"Laptop",
price:39999,
image:"https://via.placeholder.com/300x220"
},

{
id:3,
name:"Headphones",
price:999,
image:"https://via.placeholder.com/300x220"
},

{
id:4,
name:"Smart Watch",
price:1999,
image:"https://via.placeholder.com/300x220"
}

];

const productsContainer =
document.getElementById("productsContainer");

products.forEach(product=>{

productsContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

`;

});

window.addToCart = function(id){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const product =
products.find(item=>item.id===id);

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert("Product Added To Cart");

};