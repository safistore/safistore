// CART STORAGE

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// ADD PRODUCT

function addProduct(
id,
name,
price,
image,
sizeId,
colorId
){

    const size =
    document.getElementById(
    sizeId
    ).value;

    const color =
    document.getElementById(
    colorId
    ).value;

    const existingProduct =
    cart.find(item =>

        item.id === id &&
        item.size === size &&
        item.color === color

    );

    if(existingProduct){

        existingProduct.qty++;

    }else{

        cart.push({

            id:id,

            name:name,

            price:price,

            image:image,

            size:size,

            color:color,

            qty:1

        });

    }

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    alert(
    `${name} added to cart`
    );

}

// SEARCH PRODUCTS

function searchProducts(){

    const input =
    document.getElementById(
    "searchInput"
    ).value
    .toLowerCase();

    const products =
    document.querySelectorAll(
    ".product-card"
    );

    products.forEach(product=>{

        const title =
        product.querySelector(
        "h3"
        ).innerText
        .toLowerCase();

        if(
            title.includes(input)
        ){

            product.style.display =
            "block";

        }else{

            product.style.display =
            "none";

        }

    });

}

// OPTIONAL CART COUNT

function updateCartCount(){

    const cartBtn =
    document.querySelector(
    ".cart-btn"
    );

    if(!cartBtn) return;

    let count = 0;

    cart.forEach(item=>{

        count += item.qty;

    });

    cartBtn.innerHTML =
    `🛒 Cart (${count})`;

}

updateCartCount();