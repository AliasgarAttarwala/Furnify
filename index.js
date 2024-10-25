let cartCount = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.card-action-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  updateCartCount();
  displayCart();
});

function addToCart(event) {
  const button = event.target.closest('.card-action-btn');
  const productName = button.getAttribute('data-title');
  const productPrice = button.getAttribute('data-price');
  const productImage = button.getAttribute('data-image');

  console.log("Cart: ", cart);
  console.log("button: ", button);
  console.log("name: ", productName);

  // Check if product is already in the cart
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    alert('This item is already in your cart!');
    return;
  }

  // Add new item to cart
  const newItem = { id: Date.now(), name: productName, price: productPrice, image: productImage };
  cart.push(newItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  cartCount += 1;
  document.querySelector('.header-action-btn .cart-btn-badge').textContent = cartCount;
  alert('Item has been added to your cart!');

  displayCart(); // Update cart display
}

function updateCartCount() {
  cartCount = cart.length;
  document.querySelector('.header-action-btn .btn-badge').textContent = cartCount;
}

function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
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
      <button class="btn btn-danger btn-sm ms-auto" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(itemElement);
    total += parseFloat(item.price);
  });

  cartTotal.textContent = `₹${total.toFixed(2)}`;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}
