const cart = JSON.parse(localStorage.getItem("cart")) || [];

const box = document.getElementById("cart");

cart.forEach(i => {
  box.innerHTML += `
    <div class="item">
      <p>${i.name} - ₹${i.price}</p>
    </div>
  `;
});