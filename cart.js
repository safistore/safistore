cartList.innerHTML += `
<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="item-details">

        <h3>${item.name}</h3>

        <p>Size: ${item.size}</p>

        <p>Color: ${item.color}</p>

        <p class="price">₹${item.price}</p>

    </div>

</div>
`;
