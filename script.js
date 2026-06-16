function addVariationProduct(){

    const size =
    document.getElementById("size1").value;

    const color =
    document.getElementById("color1").value;

    const product = {

        id:1,

        name:"Premium T-Shirt",

        price:599,

        image:"products/tshirt.jpg",

        qty:1,

        size:size,

        color:color

    };

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    cart.push(product);

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    alert(
    "Added To Cart!"
    );

    renderCart();
}