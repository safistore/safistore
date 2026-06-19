if(localStorage.getItem("adminLoggedIn") !== "true"){

    window.location.href = "admin-login.html";

}

const adminProducts =
document.getElementById("adminProducts");

let products =
JSON.parse(localStorage.getItem("products")) || [];

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

function renderProducts(){

    adminProducts.innerHTML = "";

    if(products.length === 0){

        adminProducts.innerHTML =
        "<p>No Products Added</p>";

        return;
    }

    products.forEach((product,index)=>{

        adminProducts.innerHTML += `

        <div class="admin-product">

            <div>

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

            </div>

            <button
            class="delete-btn"
            onclick="deleteProduct(${index})">
            Delete
            </button>

        </div>

        `;

    });

}

function addProduct(){

    const name =
    document.getElementById(
    "productName").value;

    const price =
    document.getElementById(
    "productPrice").value;

    const image =
    document.getElementById(
    "productImage").value;

    if(
        !name ||
        !price ||
        !image
    ){
        alert("Fill All Fields");
        return;
    }

    products.push({

        id: Date.now(),

        name:name,

        price:price,

        image:image

    });

    saveProducts();

    renderProducts();

    document.getElementById(
    "productName").value="";

    document.getElementById(
    "productPrice").value="";

    document.getElementById(
    "productImage").value="";

    alert("Product Added");

}

function deleteProduct(index){

    if(confirm("Delete Product?")){

        products.splice(index,1);

        saveProducts();

        renderProducts();

    }

}

function logoutAdmin(){

    localStorage.removeItem(
    "adminLoggedIn"
    );

    window.location.href =
    "admin-login.html";

}

window.addProduct = addProduct;
window.deleteProduct = deleteProduct;
window.logoutAdmin = logoutAdmin;

renderProducts();