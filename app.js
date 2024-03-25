// app.js
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartItems = document.getElementById('cart-items');
  const resetButton = document.getElementById('reset-btn');
  const placeOrderButton = document.getElementById('place-order-btn');
  const notification = document.getElementById('notification');

  // Initialize cart variables
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  // Update the cart, total price, and localStorage
  function updateCart() {
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach((item, index) => {
      cartItems.innerHTML += `
        <li class="cart-item" data-index="${index}">
          ${item.name} - Rp ${item.price.toFixed(2)} x ${item.quantity} <!-- Added quantity count -->
        </li>
      `;

      totalPrice += item.price * item.quantity;
    });

    cartTotalPrice.innerText = `Rp ${totalPrice.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show or hide the "Place Order" button based on the cart items
    if (cart.length > 0) {
      placeOrderButton.style.display = 'block';
    } else {
      placeOrderButton.style.display = 'none';
    }
  }

  // Add item to the cart
  function addToCart(name, price) {
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  }

  // Reset the cart
  function resetCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
  }

  // Place the order
  function placeOrder() {
    if (cart.length > 0) {
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);

      resetCart();
    }
  }

  // Event listener for add to cart buttons
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.parentElement.querySelector('h2').innerText;
      const price = parseFloat(button.parentElement.dataset.price);

      addToCart(name, price);
    });
  });

  // Event listener for reset button
  resetButton.addEventListener('click', resetCart);

  // Event listener for place order button
  placeOrderButton.addEventListener('click', placeOrder);

  // Initialize cart
  updateCart();
});
