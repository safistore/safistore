function addToCart(name,price){

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    let existing =
    cart.find(
    item => item.name === name
    );

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            name:name,
            price:price,
            qty:1
        });
    }

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    alert("Added To Cart");
}