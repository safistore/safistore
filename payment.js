document.getElementById(
"finishPaymentBtn"
).addEventListener(
"click",
()=>{

const name =
document.getElementById(
"customerName"
).value;

const phone =
document.getElementById(
"customerPhone"
).value;

const email =
document.getElementById(
"customerEmail"
).value;

const city =
document.getElementById(
"customerCity"
).value;

const state =
document.getElementById(
"customerState"
).value;

const pincode =
document.getElementById(
"customerPincode"
).value;

const address =
document.getElementById(
"customerAddress"
).value;

if(
!name ||
!phone ||
!city ||
!state ||
!pincode ||
!address
){
    alert(
    "Please fill all shipping details."
    );
    return;
}

let orderDetails = "";

cart.forEach(item=>{

orderDetails +=

`• ${item.name}
Size: ${item.size}
Color: ${item.color}
Qty: ${item.qty}
Price: ₹${item.price}

`;

});

const message =

`🛍 NEW ORDER

CUSTOMER DETAILS

Name: ${name}

Phone: ${phone}

Email: ${email}

Address:
${address}

City: ${city}

State: ${state}

Pincode: ${pincode}

----------------------

ORDER DETAILS

${orderDetails}

----------------------

TOTAL AMOUNT: ₹${total}

Payment Completed.
Screenshot attached by customer.`;

window.open(
`https://wa.me/919345314960?text=${encodeURIComponent(message)}`,
"_blank"
);

localStorage.removeItem(
"cart"
);

});