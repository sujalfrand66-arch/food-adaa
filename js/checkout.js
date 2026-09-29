/* ============================================================
   BISHNOI FOOD ADDA — checkout.js
   Form Validation, Order Building, WhatsApp Submission
   ============================================================ */

'use strict';

/* ============================================================
   FORM FIELD VALIDATION HELPERS
   ============================================================ */
function setError(fieldEl, errorEl, message) {
  fieldEl.classList.add('error');
  fieldEl.setAttribute('aria-invalid', 'true');
  if (errorEl) { errorEl.textContent = message; errorEl.classList.remove('hidden'); }
}

function clearError(fieldEl, errorEl) {
  fieldEl.classList.remove('error');
  fieldEl.setAttribute('aria-invalid', 'false');
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.add('hidden'); }
}

function validateName(value) {
  if (!value.trim()) return 'Please enter your full name.';
  if (value.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
}

function validatePhone(value) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Please enter your mobile number.';
  // Accept 10-digit Indian mobile or with country code 91
  if (!/^(91)?[6-9]\d{9}$/.test(digits)) return 'Please enter a valid 10-digit Indian mobile number.';
  return null;
}

function validateAddress(value, locationMode) {
  if (locationMode === 'live') return null; // live location; address optional
  if (!value.trim()) return 'Please enter your delivery address or use live location.';
  if (value.trim().length < 10) return 'Please enter a complete delivery address.';
  return null;
}

/* ============================================================
   REAL-TIME VALIDATION
   ============================================================ */
function attachRealTimeValidation() {
  const fields = [
    { input: 'customer-name',  error: 'name-error',  fn: v => validateName(v) },
    { input: 'customer-phone', error: 'phone-error', fn: v => validatePhone(v) },
  ];

  fields.forEach(({ input, error, fn }) => {
    const inputEl = document.getElementById(input);
    const errorEl = document.getElementById(error);
    if (!inputEl) return;
    inputEl.addEventListener('blur', () => {
      const msg = fn(inputEl.value);
      msg ? setError(inputEl, errorEl, msg) : clearError(inputEl, errorEl);
    });
    inputEl.addEventListener('input', () => {
      if (inputEl.classList.contains('error')) {
        const msg = fn(inputEl.value);
        msg ? setError(inputEl, errorEl, msg) : clearError(inputEl, errorEl);
      }
    });
  });
}

/* ============================================================
   RENDER ORDER SUMMARY SIDEBAR
   ============================================================ */
function renderOrderSummary() {
  const body   = document.getElementById('order-summary-body');
  const footer = document.getElementById('order-summary-footer');
  if (!body) return;

  const cart = window.getCart();
  const R    = window.RESTAURANT_CONFIG;

  if (!cart.length) {
    body.innerHTML = `<div class="empty-state__sub" style="padding:var(--space-4);color:var(--color-text-muted)">Your cart is empty. <a href="menu.html" class="text-accent">Add items →</a></div>`;
    return;
  }

  const subtotal = window.getCartTotal();
  const delivery = subtotal >= R.min_free_delivery ? 0 : R.delivery_charge;
  const total    = subtotal + delivery;

  body.innerHTML = cart.map(item => `
    <div class="order-item">
      <span class="order-item__qty">${item.qty}</span>
      <span class="order-item__name">${item.name}</span>
      <span class="order-item__price">${R.currency}${item.price * item.qty}</span>
    </div>`).join('');

  if (footer) footer.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span>${R.currency}${subtotal}</span></div>
    <div class="cart-summary-row${delivery === 0 ? ' discount-row' : ''}"><span>Delivery</span><span>${delivery === 0 ? 'FREE 🎉' : R.currency + delivery}</span></div>
    <div class="cart-summary-row cart-summary-row--total"><span>Total</span><span>${R.currency}${total}</span></div>`;
}

/* ============================================================
   BUILD WHATSAPP MESSAGE
   ============================================================ */
function buildWhatsAppMessage(formData, locationPayload) {
  const R    = window.RESTAURANT_CONFIG;
  const cart = window.getCart();

  const subtotal = window.getCartTotal();
  const delivery = subtotal >= R.min_free_delivery ? 0 : R.delivery_charge;
  const total    = subtotal + delivery;

  const itemLines = cart.map(item =>
    `  ${item.qty} × ${item.name} — ${R.currency}${item.price * item.qty}`
  ).join('\n');

  const locationLine = locationPayload.mode === 'live' && locationPayload.mapsUrl
    ? `📍 Live Location: ${locationPayload.mapsUrl}`
    : `🏠 Delivery Address: ${locationPayload.address || formData.address}${formData.landmark ? '\n  📌 Landmark: ' + formData.landmark : ''}`;

  const message = [
    `🍽️ *BISHNOI FOOD ADDA — NEW ORDER*`,
    ``,
    `👤 *Customer:* ${formData.name}`,
    `📞 *Mobile:* ${formData.phone}`,
    formData.email ? `📧 Email: ${formData.email}` : null,
    `🛵 *Order Type:* Delivery`,
    ``,
    `*— ORDER ITEMS —*`,
    itemLines,
    ``,
    `💰 Subtotal: ${R.currency}${subtotal}`,
    `🚗 Delivery: ${delivery === 0 ? 'FREE' : R.currency + delivery}`,
    `✅ *Total: ${R.currency}${total}*`,
    ``,
    `*— DELIVERY DETAILS —*`,
    locationLine,
    formData.notes ? `\n📝 *Order Notes:* ${formData.notes}` : null,
    ``,
    `_Please confirm my order. Thank you! 🙏_`,
  ].filter(line => line !== null).join('\n');

  return message;
}

/* ============================================================
   VALIDATE & SUBMIT
   ============================================================ */
function validateAndSubmit(e) {
  e.preventDefault();

  const R = window.RESTAURANT_CONFIG;

  // Gather form fields
  const nameEl    = document.getElementById('customer-name');
  const phoneEl   = document.getElementById('customer-phone');
  const emailEl   = document.getElementById('customer-email');
  const addressEl = document.getElementById('delivery-address');
  const landmarkEl= document.getElementById('delivery-landmark');
  const notesEl   = document.getElementById('order-notes');

  const nameErrEl    = document.getElementById('name-error');
  const phoneErrEl   = document.getElementById('phone-error');
  const addressErrEl = document.getElementById('address-error');

  // Get location state
  const locationPayload = window.getLocationPayload ? window.getLocationPayload() : { mode: 'manual', address: addressEl?.value?.trim() };

  // Clear existing errors
  [nameEl, phoneEl, addressEl].forEach(el => el && clearError(el, null));

  let valid = true;

  // Validate name
  const nameMsg = validateName(nameEl?.value || '');
  if (nameMsg) { setError(nameEl, nameErrEl, nameMsg); valid = false; }

  // Validate phone
  const phoneMsg = validatePhone(phoneEl?.value || '');
  if (phoneMsg) { setError(phoneEl, phoneErrEl, phoneMsg); valid = false; }

  // Validate cart
  const cart = window.getCart();
  if (!cart.length) {
    window.showToast?.('Your cart is empty! Add some items first.', 'error');
    valid = false;
  }

  // Validate address (only if not using live location)
  if (locationPayload.mode !== 'live') {
    const addrMsg = validateAddress(addressEl?.value || '', locationPayload.mode);
    if (addrMsg) { setError(addressEl, addressErrEl, addrMsg); valid = false; }
  }

  if (!valid) {
    // Scroll to first error
    document.querySelector('.form-input.error, .form-textarea.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.showToast?.('Please fill in all required fields.', 'error');
    return;
  }

  // Build form data
  const formData = {
    name:     nameEl.value.trim(),
    phone:    phoneEl.value.trim(),
    email:    emailEl?.value?.trim() || '',
    address:  addressEl?.value?.trim() || '',
    landmark: landmarkEl?.value?.trim() || '',
    notes:    notesEl?.value?.trim() || '',
  };

  // Build message
  const message = buildWhatsAppMessage(formData, locationPayload);
  const waNumber = R.whatsapp;
  const waUrl    = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  // Submit button feedback
  const submitBtn = document.getElementById('place-order-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Opening WhatsApp…';
  }

  // Open WhatsApp
  window.location.href = waUrl;

  // Reset after delay (in case user comes back)
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '🟢 Place Order on WhatsApp';
    }
    // Redirect to success page
    window.location.href = 'order-success.html';
  }, 1500);
}

/* ============================================================
   CART PAGE: RENDER CART TABLE
   ============================================================ */
function renderCartPage() {
  const itemsContainer = document.getElementById('cart-page-items');
  const emptyState     = document.getElementById('cart-page-empty');
  const summaryEl      = document.getElementById('cart-page-summary');
  if (!itemsContainer) return;

  const cart = window.getCart();
  const R    = window.RESTAURANT_CONFIG;

  if (!cart.length) {
    itemsContainer.classList.add('hidden');
    emptyState?.classList.remove('hidden');
    summaryEl?.classList.add('hidden');
    return;
  }

  emptyState?.classList.add('hidden');
  summaryEl?.classList.remove('hidden');
  itemsContainer.classList.remove('hidden');

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-page-item">
      <img class="cart-page-item__img" src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'">
      <div class="cart-page-item__details">
        <div class="cart-page-item__name">${item.name}</div>
        <div class="cart-page-item__desc">${item.category}</div>
        <div class="cart-page-item__footer">
          <div class="qty-control" role="group" aria-label="Quantity of ${item.name}">
            <button class="qty-btn" onclick="cartUpdateQty('${item.id}',-1)" aria-label="Decrease quantity">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="cartUpdateQty('${item.id}',1)" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-page-item__price">${R.currency}${item.price * item.qty}<small style="font-size:0.6em;color:var(--color-text-muted);margin-left:4px">(${R.currency}${item.price} each)</small></div>
          <button class="btn btn--ghost btn--sm" onclick="cartRemoveItem('${item.id}')" aria-label="Remove ${item.name}">✕ Remove</button>
        </div>
      </div>
    </div>`).join('');

  // Summary
  if (summaryEl) {
    const subtotal = window.getCartTotal();
    const delivery = subtotal >= R.min_free_delivery ? 0 : R.delivery_charge;
    const total    = subtotal + delivery;

    summaryEl.innerHTML = `
      <div class="checkout-block">
        <h2 class="checkout-block__title"><span class="block-num">📋</span>Order Summary</h2>
        <div class="cart-summary-row"><span>Subtotal</span><span>${R.currency}${subtotal}</span></div>
        <div class="cart-summary-row${delivery === 0 ? ' discount-row' : ''}"><span>Delivery Charge</span><span>${delivery === 0 ? 'FREE 🎉' : R.currency + delivery}</span></div>
        ${subtotal < R.min_free_delivery ? `<div class="cart-summary-row"><small style="color:var(--color-warning)">Add ${R.currency}${R.min_free_delivery - subtotal} more for free delivery</small></div>` : ''}
        <div class="cart-summary-row cart-summary-row--total" style="margin-top:var(--space-3)"><span>Total</span><span>${R.currency}${total}</span></div>
        <div style="margin-top:var(--space-5);display:flex;flex-direction:column;gap:var(--space-3)">
          <a href="checkout.html" class="btn btn--gold" style="justify-content:center">Proceed to Checkout →</a>
          <a href="menu.html" class="btn btn--ghost" style="justify-content:center">Add More Items</a>
          <button onclick="cartClear()" class="btn btn--dark btn--sm" style="justify-content:center">Clear Cart</button>
        </div>
      </div>`;
  }
}

// Override updateCartUI to re-render cart page
const _cartPageOrigUpdate = window.updateCartUI;
window.updateCartUI = function() {
  _cartPageOrigUpdate?.();
  renderCartPage();
  renderOrderSummary();
};

/* ============================================================
   INIT CHECKOUT PAGE
   ============================================================ */
function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  attachRealTimeValidation();
  renderOrderSummary();

  form.addEventListener('submit', validateAndSubmit);
}

/* ============================================================
   INIT CART PAGE
   ============================================================ */
function initCartPage() {
  renderCartPage();
}

document.addEventListener('DOMContentLoaded', () => {
  initCheckoutPage();
  initCartPage();
});
