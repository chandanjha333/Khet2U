// Sample initial cart data
let cart = [
  { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
  { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
  { id: 3, name: 'Product 3', price: 19.99, quantity: 1 }
];

// Function to update quantity
function updateQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = Math.max(0, item.quantity + change);
    if (item.quantity === 0) {
        removeItem(id);
    } else {
        renderCart();
    }
  }
}

// Function to remove item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// Function to calculate totals
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}

// Function to render cart
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    cartSummary.innerHTML = '';
    return;
  }

  // Render cart items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>${item.name}</div>
      <div>$${item.price.toFixed(2)}</div>
      <div class="quantity-controls">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <div>$${(item.price * item.quantity).toFixed(2)}</div>
      <div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  // Render summary
  const { subtotal, tax, shipping, total } = calculateTotals();
  cartSummary.innerHTML = `
    <div class="summary-row">
      <span>Subtotal:</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Tax (10%):</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping:</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="summary-row" style="font-weight: bold;">
      <span>Total:</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
  `;
}

// Function to handle checkout
function checkout() {
  const { total } = calculateTotals();
  alert(`Order placed! Total amount: $${total.toFixed(2)}`);
  cart = [];
  renderCart();
}

// Initial render
renderCart();