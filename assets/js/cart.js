let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
  cart.push({ id: productId, name: productName, price: productPrice, image: productImage });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

function displayCart() {
  const cartItems = document.getElementById('cart-items');
  let total = 0;

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-3');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 50px; height: 50px;">
      <div>
        <p class="mb-0">${item.name}</p>
        <p class="mb-0">₹${item.price}</p>
      </div>
      <button class="btn btn-danger btn-sm ms-auto" onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItems.appendChild(itemElement);
    total += parseFloat(item.price);
  });
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  displayCart();
  document.querySelector('.icon-cart').addEventListener('click', () => {
    document.body.classList.toggle('showCart');
  });
  document.querySelector('.close').addEventListener('click', () => {
    document.body.classList.toggle('showCart');
  });
});