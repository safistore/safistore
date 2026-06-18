// Load cart from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart

function addProduct(id, name, price, image) {

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {

        existingProduct.qty++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            qty: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}

// Search products

function searchProducts() {

    const input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const title =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

        if (title.includes(input)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}

// Update cart count

function updateCartCount() {

    const cartBtn =
        document.querySelector(".cart-btn");

    if (!cartBtn) return;

    let total = 0;

    cart.forEach(item => {
        total += item.qty;
    });

    cartBtn.innerHTML = `🛒 Cart (${total})`;
}

// Run on page load

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});