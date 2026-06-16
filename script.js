// CART ARRAY

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// ADD PRODUCT TO CART

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

    showNotification(
        `${name} Added To Cart`
    );

}

// NOTIFICATION

function showNotification(message){

    let notification =
    document.createElement("div");

    notification.className =
    "notification";

    notification.innerText =
    message;

    document.body.appendChild(
    notification
    );

    setTimeout(()=>{

        notification.classList.add(
        "show"
        );

    },100);

    setTimeout(()=>{

        notification.classList.remove(
        "show"
        );

        setTimeout(()=>{

            notification.remove();

        },300);

    },2500);

}