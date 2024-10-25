// Retrieve the cart data from localStorage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Initial cart loaded:", cart); // Debugging

// Save the current cart state to localStorage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Cart saved to localStorage:", cart); // Debugging
};

// Add an item to the cart
const addItemToCart = (title, price, img) => {
  const product = { title, price: parseFloat(price), img };
  cart.push(product);
  console.log(`Item added to cart: ${title}, Price: ₹${price}`); // Debugging
  saveCart(); // Update localStorage
  alert(`${title} has been added to the cart.`);
  displayCartItems(); // Refresh displayed items
};

// Remove an item from the cart by its index
const removeCartItem = (index) => {
  if (index >= 0 && index < cart.length) {
    console.log("Removing item at index:", index, "Item:", cart[index]); // Debugging
    cart.splice(index, 1); // Remove item from array
    saveCart(); // Update localStorage
    displayCartItems(); // Refresh displayed items
  } else {
    console.warn("Invalid index for removal:", index); // Debugging
  }
};

// Calculate and display the total price
const calculateTotal = () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log("Total calculated:", total); // Debugging
  document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
};

// Display all cart items on the page
const displayCartItems = () => {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear current items

  console.log("Displaying cart items:", cart); // Debugging
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-3');
    itemElement.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="cart-item-img me-3" style="width: 50px; height: 50px;">
      <div class="cart-item-details me-auto">
        <h5>${item.title}</h5>
        <p>₹${item.price.toFixed(2)}</p>
      </div>
      <button class="btn btn-danger btn-sm" onclick="removeCartItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  calculateTotal(); // Update total price each time items are displayed
};

// Load cart items and display them on page load
window.addEventListener('load', () => {
  console.log("Page loaded, displaying cart items"); // Debugging
  displayCartItems();
});


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Retrieve the checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Add an event listener if the checkout button exists
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Proceeding to checkout...'); // Placeholder for checkout functionality
      // Add additional checkout functionality here
    });
  } else {
    console.warn("Checkout button not found in the DOM.");
  }

  // Call displayCartItems() to load cart items on page load
  displayCartItems();
});
