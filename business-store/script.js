function orderProduct(product, price){

    const phone = "919345314960";

    const message =
`Hello,

I would like to order:

Product: ${product}
Price: ₹${price}

Please provide more details.`;

    const whatsappURL =
`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}