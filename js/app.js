/* ============================================================
   BISHNOI FOOD ADDA — app.js
   Global Configuration, Navigation, UI Utilities
   ============================================================ */

'use strict';

/* ============================================================
   RESTAURANT CONFIG — Single Source of Truth
   ============================================================ */
const RESTAURANT_CONFIG = {
  name:        'Bishnoi Food Adda',
  tagline:     'Desi Flavours. Freshly Made. Made to Crave.',
  whatsapp:    '917000000000',          // ← change to real number: 91XXXXXXXXXX
  phone:       '+91 70000 00000',        // ← change to real phone
  address:     'Near Main Chowk, Suratgarh, Rajasthan — 335804',
  email:       'bishnoifoodadda@gmail.com',
  instagram:   'https://instagram.com/bishnoifoodadda',
  google_maps: 'https://maps.google.com/?q=Bishnoi+Food+Adda+Suratgarh',
  currency:    '₹',
  delivery_charge: 30,
  min_free_delivery: 400,
};

window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;

/* ============================================================ ANNOUNCEMENT BAR ============================================================ */
function initAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  if (!bar) return;
  const dismissed = sessionStorage.getItem('bfa_announcement_dismissed');
  if (dismissed) { bar.classList.add('hidden'); return; }
  document.body.classList.add('has-announcement');
  bar.querySelector('.announcement-bar__close')?.addEventListener('click', () => {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announcement');
    sessionStorage.setItem('bfa_announcement_dismissed', '1');
  });
}

/* ============================================================ NAVBAR SCROLL ============================================================ */
function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================ NAV OVERLAY ============================================================ */
function initNavOverlay() {
  const trigger  = document.querySelector('.menu-trigger');
  const overlay  = document.getElementById('nav-overlay');
  const closeBtn = overlay?.querySelector('.nav-overlay__close');
  if (!trigger || !overlay) return;

  const open = () => {
    overlay.classList.add('open');
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('a')?.focus();
  };
  const close = () => {
    overlay.classList.remove('open');
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    trigger.focus();
  };

  trigger.addEventListener('click', () => overlay.classList.contains('open') ? close() : open());
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
  overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
}

/* ============================================================ ACTIVE NAV ============================================================ */
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-href]').forEach(el => {
    if (el.getAttribute('data-nav-href') === path || (path === '' && el.getAttribute('data-nav-href') === 'index.html')) {
      el.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================ CART DRAWER ============================================================ */
function initCartDrawer() {
  const overlay  = document.getElementById('cart-overlay');
  const drawer   = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('cart-drawer-close');
  if (!drawer) return;

  window.openCartDrawer = () => {
    overlay?.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
    closeBtn?.focus();
  };
  window.closeCartDrawer = () => {
    overlay?.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-cart').forEach(btn => btn.addEventListener('click', window.openCartDrawer));
  overlay?.addEventListener('click', window.closeCartDrawer);
  closeBtn?.addEventListener('click', window.closeCartDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) window.closeCartDrawer(); });
}

/* ============================================================ CATEGORY SLIDER ============================================================ */
function initCategorySlider(sliderEl) {
  if (!sliderEl) return;
  let isDown = false, startX, scrollLeft;

  sliderEl.addEventListener('mousedown', e => {
    isDown = true;
    sliderEl.classList.add('grabbing');
    startX = e.pageX - sliderEl.offsetLeft;
    scrollLeft = sliderEl.scrollLeft;
    e.preventDefault();
  });
  sliderEl.addEventListener('mouseleave', () => { isDown = false; sliderEl.classList.remove('grabbing'); });
  sliderEl.addEventListener('mouseup', () => { isDown = false; sliderEl.classList.remove('grabbing'); });
  sliderEl.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    sliderEl.scrollLeft = scrollLeft - (e.pageX - sliderEl.offsetLeft - startX) * 1.5;
  });
  sliderEl.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    sliderEl.scrollLeft += e.deltaY * 0.8;
  }, { passive: false });

  sliderEl.addEventListener('keydown', e => {
    const chips = [...sliderEl.querySelectorAll('.cat-chip')];
    const idx = chips.indexOf(document.activeElement);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' && idx < chips.length - 1) {
      e.preventDefault();
      chips[idx + 1].focus();
      chips[idx + 1].scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      chips[idx - 1].focus();
      chips[idx - 1].scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  });
}
window.initCategorySlider = initCategorySlider;

/* ============================================================ GENERIC SLIDER WITH ARROWS ============================================================ */
function initSliderWithArrows(sliderEl, prevBtn, nextBtn) {
  if (!sliderEl) return;
  const scroll = (dir) => sliderEl.scrollBy({ left: dir * sliderEl.clientWidth * 0.8, behavior: 'smooth' });

  prevBtn?.addEventListener('click', () => scroll(-1));
  nextBtn?.addEventListener('click', () => scroll(1));

  let isDown = false, startX, scrollLeft;
  sliderEl.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - sliderEl.offsetLeft; scrollLeft = sliderEl.scrollLeft; e.preventDefault(); });
  sliderEl.addEventListener('mouseleave', () => { isDown = false; });
  sliderEl.addEventListener('mouseup', () => { isDown = false; });
  sliderEl.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    sliderEl.scrollLeft = scrollLeft - (e.pageX - sliderEl.offsetLeft - startX) * 1.5;
  });

  const update = () => {
    if (prevBtn) prevBtn.disabled = sliderEl.scrollLeft <= 0;
    if (nextBtn) nextBtn.disabled = sliderEl.scrollLeft >= sliderEl.scrollWidth - sliderEl.clientWidth - 2;
  };
  sliderEl.addEventListener('scroll', update, { passive: true });
  update();
}
window.initSliderWithArrows = initSliderWithArrows;

/* ============================================================ REVEAL ANIMATIONS ============================================================ */
function initRevealAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================ TOAST ============================================================ */
function initToastContainer() {
  if (document.getElementById('toast-container')) return;
  const el = document.createElement('div');
  el.id = 'toast-container';
  el.className = 'toast-container';
  el.setAttribute('aria-live', 'polite');
  document.body.appendChild(el);
}

window.showToast = function(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: '✅', error: '❌', info: '🍽️' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `<span class="toast__icon">${icons[type] || '🔔'}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('visible')));
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
};

/* ============================================================ MOBILE CART BAR ============================================================ */
function initMobileCartBar() {
  const bar = document.getElementById('mobile-cart-bar');
  if (!bar) return;
  bar.addEventListener('click', () => window.openCartDrawer?.());
  window.updateMobileCartBar = () => {
    const cart = getCart();
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const total = getCartTotal();
    const countEl = bar.querySelector('.mobile-cart-bar__count');
    const totalEl = bar.querySelector('.mobile-cart-bar__total');
    if (countEl) countEl.textContent = count;
    if (totalEl) totalEl.textContent = RESTAURANT_CONFIG.currency + total;
    bar.classList.toggle('visible', count > 0);
  };
}

/* ============================================================ CART HELPERS ============================================================ */
const CART_KEY = 'bishnoi_food_adda_cart';

function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function getCartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

window.getCart    = getCart;
window.saveCart   = saveCart;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;

/* ============================================================ UPDATE CART UI ============================================================ */
window.updateCartUI = function() {
  const count = getCartCount();
  const total = getCartTotal();
  document.querySelectorAll('.cart-count').forEach(el => { el.textContent = count || '0'; el.setAttribute('data-count', count); });
  document.querySelectorAll('.cart-amount').forEach(el => { el.textContent = count > 0 ? RESTAURANT_CONFIG.currency + total : ''; });
  window.updateMobileCartBar?.();
  const drawer = document.getElementById('cart-drawer');
  if (drawer?.classList.contains('open')) renderCartDrawer();
};

/* ============================================================ RENDER CART DRAWER ============================================================ */
function renderCartDrawer() {
  const body   = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;

  const cart = getCart();
  const R    = RESTAURANT_CONFIG;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <div class="cart-empty__title">Your cart is empty</div>
        <div class="cart-empty__sub">Discover something delicious on our menu</div>
        <a href="menu.html" class="btn btn--gold mt-4" onclick="window.closeCartDrawer?.()">Explore Menu →</a>
      </div>`;
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (footer) footer.classList.remove('hidden');
  const subtotal = getCartTotal();
  const delivery = subtotal >= R.min_free_delivery ? 0 : R.delivery_charge;
  const total    = subtotal + delivery;

  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item__img" src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=150&q=80'">
      <div class="cart-item__details">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">${R.currency}${item.price * item.qty}</div>
        <div class="cart-item__controls">
          <button class="qty-btn" onclick="cartUpdateQty('${item.id}',-1)" aria-label="Decrease quantity of ${item.name}">−</button>
          <span class="qty-display" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button class="qty-btn" onclick="cartUpdateQty('${item.id}',1)" aria-label="Increase quantity of ${item.name}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" onclick="cartRemoveItem('${item.id}')" aria-label="Remove ${item.name} from cart">×</button>
    </div>`).join('');

  if (footer) footer.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span>${R.currency}${subtotal}</span></div>
    <div class="cart-summary-row${delivery === 0 ? ' discount-row' : ''}"><span>Delivery</span><span>${delivery === 0 ? 'FREE 🎉' : R.currency + delivery}</span></div>
    ${subtotal < R.min_free_delivery ? `<div class="cart-summary-row"><small style="color:var(--color-warning)">Add ${R.currency}${R.min_free_delivery - subtotal} more for free delivery</small></div>` : ''}
    <div class="cart-summary-row cart-summary-row--total"><span>Total</span><span>${R.currency}${total}</span></div>
    <a href="checkout.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:var(--space-2)" onclick="window.closeCartDrawer?.()">Checkout →</a>`;
}

/* ============================================================ CART ACTIONS ============================================================ */
window.cartAddItem = function(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) { existing.qty += 1; } else { cart.push({ ...item, qty: 1 }); }
  saveCart(cart);
  window.updateCartUI();
  window.showToast(`${item.name} added!`, 'success');
};

window.cartUpdateQty = function(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  window.updateCartUI();
};

window.cartRemoveItem = function(id) {
  saveCart(getCart().filter(i => i.id !== id));
  window.updateCartUI();
  window.showToast('Item removed', 'info');
};

window.cartClear = function() { saveCart([]); window.updateCartUI(); };

/* ============================================================ INIT ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initNavbar();
  initNavOverlay();
  setActiveNavLink();
  initCartDrawer();
  initRevealAnimations();
  initToastContainer();
  initMobileCartBar();
  window.updateCartUI();
});
