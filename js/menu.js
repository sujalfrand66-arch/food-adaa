/* ============================================================
   BISHNOI FOOD ADDA — menu.js
   Menu Data, Rendering, Filter, Search
   ============================================================ */

'use strict';

/* ============================================================
   MENU DATA
   ============================================================ */
const menuItems = [
  /* ---- STARTERS ---- */
  { id:'bfa001', name:'Dahi Bhalle', category:'Starters', price:89, description:'Soft lentil dumplings dunked in creamy chilled curd with sweet tamarind chutney.', image:'https://images.unsplash.com/photo-1630452520776-c3c4ae88a29e?w=600&q=80', veg:true, popular:true },
  { id:'bfa002', name:'Aloo Tikki Chaat', category:'Starters', price:79, description:'Crispy potato patties with spiced chole, chutneys & fresh sev.', image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', veg:true, popular:true },
  { id:'bfa003', name:'Paneer Tikka (Half)', category:'Starters', price:149, description:'Smoky tandoor-charred paneer cubes marinated in bold spices & hung curd.', image:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', veg:true, popular:false },
  { id:'bfa004', name:'Samosa Platter (4 pcs)', category:'Starters', price:69, description:'Flaky golden pastry stuffed with spiced potato & peas. Served with green chutney.', image:'https://images.unsplash.com/photo-1601050690993-ae6e8e45b8b6?w=600&q=80', veg:true, popular:false },
  { id:'bfa005', name:'Chicken Seekh Kebab', category:'Starters', price:189, description:'Minced chicken blended with ginger, green chilli & aromatic spices, grilled on skewers.', image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', veg:false, popular:true },

  /* ---- PIZZA ---- */
  { id:'bfa010', name:'Paneer Tandoori Pizza', category:'Pizza', price:249, description:'Smoky paneer tikka, onion rings & green pepper on a thin tandoori-spiced crust.', image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', veg:true, popular:true },
  { id:'bfa011', name:'Masala Veggie Pizza', category:'Pizza', price:219, description:'Bell peppers, mushrooms & sweet corn with our signature spiced tomato base.', image:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80', veg:true, popular:false },
  { id:'bfa012', name:'Chicken Tikka Pizza', category:'Pizza', price:279, description:'Juicy chicken tikka, red onion & capsicum on a creamy makhani sauce base.', image:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80', veg:false, popular:true },
  { id:'bfa013', name:'Cheese Burst Corn Pizza', category:'Pizza', price:239, description:'Stretchy cheese-stuffed crust topped with sweet corn, jalapeños & fresh herbs.', image:'https://images.unsplash.com/photo-1559978126-0171f5bc4b3a?w=600&q=80', veg:true, popular:false },

  /* ---- BURGERS ---- */
  { id:'bfa020', name:'Aloo Tikki Burger', category:'Burgers', price:99, description:'Spiced potato tikki, crispy lettuce & our house green chutney aioli in a toasted bun.', image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', veg:true, popular:true },
  { id:'bfa021', name:'Paneer Patty Burger', category:'Burgers', price:129, description:'Grilled paneer pattie, caramelised onions, pickled jalapeños & cheddar.', image:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80', veg:true, popular:false },
  { id:'bfa022', name:'Crispy Chicken Burger', category:'Burgers', price:149, description:'Buttermilk fried chicken, coleslaw, sriracha mayo & crunchy gherkins.', image:'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80', veg:false, popular:true },
  { id:'bfa023', name:'Double Dhamaka Burger', category:'Burgers', price:179, oldPrice:219, description:'Double chicken pattie, double cheese, lettuce, tomato — double the craving.', image:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', veg:false, popular:true },

  /* ---- CHINESE ---- */
  { id:'bfa030', name:'Veg Hakka Noodles', category:'Chinese', price:119, description:'Wok-tossed noodles with mixed vegetables in a smoky indo-Chinese sauce.', image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80', veg:true, popular:false },
  { id:'bfa031', name:'Chilli Paneer (Dry)', category:'Chinese', price:159, description:'Crispy paneer tossed with capsicum & onion in a fiery soy-chilli glaze.', image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', veg:true, popular:true },
  { id:'bfa032', name:'Chicken Manchurian', category:'Chinese', price:179, description:'Golden fried chicken balls in a tangy manchurian gravy with spring onion.', image:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', veg:false, popular:true },
  { id:'bfa033', name:'Fried Rice (Veg)', category:'Chinese', price:109, description:'Aromatic long-grain rice stir-fried with veggies, egg-free, in soy-sesame sauce.', image:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', veg:true, popular:false },

  /* ---- INDIAN MAIN COURSE ---- */
  { id:'bfa040', name:'Dal Makhani', category:'Indian', price:159, description:'Slow-cooked black lentils in a rich tomato-cream gravy. The soul of desi comfort.', image:'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80', veg:true, popular:true },
  { id:'bfa041', name:'Paneer Butter Masala', category:'Indian', price:179, description:'Velvety makhani gravy with soft paneer cubes. Mildly spiced, deeply flavourful.', image:'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80', veg:true, popular:true },
  { id:'bfa042', name:'Chicken Rara', category:'Indian', price:219, description:'Minced & chunky chicken slow-cooked together with whole spices in a rustic gravy.', image:'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80', veg:false, popular:true },
  { id:'bfa043', name:'Kadhai Vegetables', category:'Indian', price:149, description:'Mixed seasonal vegetables cooked in a robust tomato-onion kadhai masala.', image:'https://images.unsplash.com/photo-1645696301019-35adcc18d0b3?w=600&q=80', veg:true, popular:false },
  { id:'bfa044', name:'Mutton Keema', category:'Indian', price:249, description:'Minced mutton slow-simmered with ginger, garlic, fresh tomatoes & whole garam masala.', image:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80', veg:false, popular:false },
  { id:'bfa045', name:'Butter Naan', category:'Indian', price:30, description:'Fluffy tandoor-baked flatbread finished with a generous brush of white butter.', image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', veg:true, popular:false },
  { id:'bfa046', name:'Steamed Basmati Rice', category:'Indian', price:49, description:'Fragrant long-grain basmati rice, perfectly steamed.', image:'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&q=80', veg:true, popular:false },

  /* ---- COMBOS ---- */
  { id:'bfa050', name:'Family Feast Combo', category:'Combos', price:549, oldPrice:699, description:'Dal Makhani + Paneer Butter Masala + 4 Butter Naan + Rice + Gulab Jamun.', image:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', veg:true, popular:true },
  { id:'bfa051', name:'Chicken Lover Combo', category:'Combos', price:399, oldPrice:489, description:'Chicken Tikka + Chicken Rara + 2 Naan + Rice + Raita.', image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', veg:false, popular:true },
  { id:'bfa052', name:'Snack Platter Combo', category:'Combos', price:279, oldPrice:349, description:'Samosa × 2 + Aloo Tikki × 2 + Dahi Bhalle + 2 Cold Drinks.', image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', veg:true, popular:false },
  { id:'bfa053', name:'Date Night Combo', category:'Combos', price:449, oldPrice:559, description:'Paneer Tikka + Kadhai Vegetables + 2 Garlic Naan + Kulfi Falooda × 2.', image:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', veg:true, popular:false },

  /* ---- BEVERAGES ---- */
  { id:'bfa060', name:'Mango Lassi', category:'Beverages', price:79, description:'Thick chilled lassi blended with ripe Alphonso mango pulp. Pure summer bliss.', image:'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=600&q=80', veg:true, popular:true },
  { id:'bfa061', name:'Rose Sherbat', category:'Beverages', price:59, description:'Chilled rose-flavoured drink with basil seeds and a hint of lemon.', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', veg:true, popular:false },
  { id:'bfa062', name:'Cold Coffee', category:'Beverages', price:89, description:'Rich blended cold coffee with vanilla ice cream & topped with chocolate drizzle.', image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', veg:true, popular:true },
  { id:'bfa063', name:'Masala Chai', category:'Beverages', price:29, description:'Strong aromatic chai brewed with ginger, cardamom & fresh milk.', image:'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80', veg:true, popular:true },
  { id:'bfa064', name:'Fresh Lime Soda', category:'Beverages', price:49, description:'Sweet or salted — freshly squeezed lime with sparkling soda water.', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', veg:true, popular:false },

  /* ---- DESSERTS ---- */
  { id:'bfa070', name:'Gulab Jamun (2 pcs)', category:'Desserts', price:59, description:'Melt-in-your-mouth golden milk solid dumplings soaked in rose-cardamom syrup.', image:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80', veg:true, popular:true },
  { id:'bfa071', name:'Kulfi Falooda', category:'Desserts', price:89, description:'Chilled rose falooda with pistachio kulfi, basil seeds & vermicelli.', image:'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=600&q=80', veg:true, popular:true },
  { id:'bfa072', name:'Ras Malai', category:'Desserts', price:79, description:'Soft chenna dumplings soaked in saffron-scented chilled milk rabdi.', image:'https://images.unsplash.com/photo-1601050690997-ae6e8e45b8b6?w=600&q=80', veg:true, popular:false },
  { id:'bfa073', name:'Chocolate Brownie + Ice Cream', category:'Desserts', price:119, description:'Warm fudge brownie with a scoop of vanilla bean ice cream & caramel drizzle.', image:'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80', veg:true, popular:false },
];

/* ============================================================
   CATEGORIES
   ============================================================ */
const categories = [
  { id:'all',      label:'All',         emoji:'🍽️' },
  { id:'popular',  label:'Popular',     emoji:'⭐' },
  { id:'Starters', label:'Starters',    emoji:'🥗' },
  { id:'Pizza',    label:'Pizza',       emoji:'🍕' },
  { id:'Burgers',  label:'Burgers',     emoji:'🍔' },
  { id:'Chinese',  label:'Chinese',     emoji:'🥢' },
  { id:'Indian',   label:'Indian',      emoji:'🍛' },
  { id:'Combos',   label:'Combos',      emoji:'🎁' },
  { id:'Beverages',label:'Beverages',   emoji:'🥤' },
  { id:'Desserts', label:'Desserts',    emoji:'🍮' },
];

window.menuItems  = menuItems;
window.categories = categories;

/* ============================================================
   FILTER + SEARCH STATE
   ============================================================ */
let activeCategory = 'all';
let searchQuery    = '';

function getFilteredItems() {
  return menuItems.filter(item => {
    const matchCat =
      activeCategory === 'all' ? true :
      activeCategory === 'popular' ? item.popular :
      item.category === activeCategory;

    const q = searchQuery.toLowerCase();
    const matchSearch = q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return matchCat && matchSearch;
  });
}

/* ============================================================
   RENDER CATEGORY CHIPS
   ============================================================ */
function renderCategories(containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = categories.map(cat => `
    <button class="cat-chip ${cat.id === activeCategory ? 'active' : ''}"
            data-cat="${cat.id}"
            role="radio"
            aria-checked="${cat.id === activeCategory}"
            tabindex="${cat.id === activeCategory ? '0' : '-1'}">
      <span class="cat-chip__emoji" aria-hidden="true">${cat.emoji}</span>
      ${cat.label}
    </button>`).join('');

  containerEl.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.cat;
      searchQuery = '';
      // update search input too
      const searchInput = document.getElementById('menu-search');
      if (searchInput) searchInput.value = '';
      renderCategories(containerEl);
      renderMenu(document.getElementById('menu-grid'));
      updateResultCount();
      chip.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    });

    // Keyboard: Space/Enter to select
    chip.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); chip.click(); }
    });
  });
}

/* ============================================================
   FOOD CARD HTML
   ============================================================ */
function buildFoodCard(item) {
  const R    = window.RESTAURANT_CONFIG;
  const cart = window.getCart();
  const inCart = cart.find(i => i.id === item.id);
  const qty  = inCart ? inCart.qty : 0;

  const badges = [
    item.veg
      ? `<span class="badge badge--veg"><span class="veg-dot" aria-hidden="true"></span>Veg</span>`
      : `<span class="badge badge--nonveg"><span class="veg-dot" aria-hidden="true"></span>Non-Veg</span>`,
    item.popular ? `<span class="badge badge--popular">⭐ Popular</span>` : '',
  ].filter(Boolean).join('');

  const priceHTML = item.oldPrice
    ? `${R.currency}${item.price} <span class="food-card__price-old">${R.currency}${item.oldPrice}</span>`
    : `${R.currency}${item.price}`;

  const ctaHTML = qty > 0
    ? `<div class="qty-control" role="group" aria-label="Quantity of ${item.name}">
        <button class="qty-btn" onclick="cartUpdateQty('${item.id}',-1)" aria-label="Remove one ${item.name}">−</button>
        <span class="qty-display" aria-live="polite">${qty}</span>
        <button class="qty-btn" onclick="cartUpdateQty('${item.id}',1)" aria-label="Add one more ${item.name}">+</button>
       </div>`
    : `<button class="add-btn" onclick="cartAddItem(window.menuItems.find(m=>m.id==='${item.id}'))" aria-label="Add ${item.name} to cart">
        + Add
       </button>`;

  return `
  <article class="food-card" id="card-${item.id}" aria-label="${item.name}">
    <div class="food-card__img-wrapper">
      <img class="food-card__img" src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'">
      <div class="food-card__badges">${badges}</div>
    </div>
    <div class="food-card__body">
      <h3 class="food-card__name">${item.name}</h3>
      <p class="food-card__desc">${item.description}</p>
      <div class="food-card__footer">
        <span class="food-card__price">${priceHTML}</span>
        ${ctaHTML}
      </div>
    </div>
  </article>`;
}

/* ============================================================
   RENDER MENU GRID
   ============================================================ */
function renderMenu(gridEl) {
  if (!gridEl) return;

  const filtered = getFilteredItems();

  if (!filtered.length) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__title">No dishes found</div>
        <div class="empty-state__sub">Try a different search or browse another category</div>
        <button class="btn btn--ghost mt-4" onclick="clearSearch()">Clear Search</button>
      </div>`;
    return;
  }

  gridEl.innerHTML = filtered.map(buildFoodCard).join('');
}

/* ============================================================
   SKELETON LOADERS
   ============================================================ */
function renderSkeletons(gridEl, count = 8) {
  if (!gridEl) return;
  gridEl.innerHTML = Array.from({ length: count }, () => `
    <div class="food-card skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line skeleton-line--medium" style="height:18px"></div>
        <div class="skeleton skeleton-line skeleton-line--long" style="height:12px"></div>
        <div class="skeleton skeleton-line skeleton-line--short" style="height:12px"></div>
      </div>
    </div>`).join('');
}

/* ============================================================
   RESULT COUNT
   ============================================================ */
function updateResultCount() {
  const el = document.getElementById('menu-result-count');
  if (!el) return;
  const count = getFilteredItems().length;
  el.innerHTML = `Showing <span>${count}</span> ${count === 1 ? 'dish' : 'dishes'}`;
}

/* ============================================================
   SEARCH
   ============================================================ */
function initMenuSearch() {
  const input = document.getElementById('menu-search');
  const catSlider = document.getElementById('cat-slider');
  const gridEl = document.getElementById('menu-grid');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = input.value.trim();
      if (searchQuery) activeCategory = 'all';
      renderCategories(catSlider);
      renderMenu(gridEl);
      updateResultCount();
    }, 250);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.value = ''; searchQuery = ''; renderMenu(gridEl); updateResultCount(); }
  });
}

window.clearSearch = function() {
  const input = document.getElementById('menu-search');
  if (input) input.value = '';
  searchQuery = '';
  renderMenu(document.getElementById('menu-grid'));
  updateResultCount();
};

/* ============================================================
   SCROLL TO CATEGORY SECTION (Homepage use)
   ============================================================ */
window.scrollToCategory = function(catId) {
  activeCategory = catId;
  const catSlider = document.getElementById('cat-slider');
  const gridEl = document.getElementById('menu-grid');
  renderCategories(catSlider);
  renderMenu(gridEl);
  updateResultCount();
  gridEl?.scrollIntoView({ behavior: 'smooth' });
};

/* ============================================================
   INIT MENU PAGE
   ============================================================ */
function initMenuPage() {
  const catSlider = document.getElementById('cat-slider');
  const gridEl    = document.getElementById('menu-grid');

  if (!gridEl) return;

  // Skeletons first
  renderSkeletons(gridEl, 8);

  // Simulate loading (instant in static site)
  setTimeout(() => {
    renderCategories(catSlider);
    initCategorySlider(catSlider);
    renderMenu(gridEl);
    initMenuSearch();
    updateResultCount();
    // Update cart UI so add buttons reflect existing cart
    window.updateCartUI?.();
  }, 300);
}

/* Override updateCartUI to also re-render menu grid (for qty updates) */
const _origUpdateCartUI = window.updateCartUI;
window.updateCartUI = function() {
  _origUpdateCartUI?.();
  // Re-render food cards to reflect qty changes without full page reload
  const gridEl = document.getElementById('menu-grid');
  if (gridEl && gridEl.children.length && !gridEl.querySelector('.skeleton-card')) {
    renderMenu(gridEl);
  }
};

/* ============================================================
   HOMEPAGE: SIGNATURE DISHES SLIDER
   ============================================================ */
function initSignatureDishSlider() {
  const slider = document.getElementById('dish-slider');
  if (!slider) return;

  const featured = menuItems.filter(i => i.popular).slice(0, 6);
  const R = window.RESTAURANT_CONFIG;

  slider.innerHTML = featured.map(item => `
    <div class="dish-slide" tabindex="0" role="group" aria-label="${item.name}">
      <img class="dish-slide__img" src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'">
      <div class="dish-slide__info">
        <div class="dish-slide__name">${item.name}</div>
        <div class="dish-slide__price">${R.currency}${item.price}</div>
        <div class="dish-slide__add">
          <button class="add-btn btn--sm" onclick="cartAddItem(window.menuItems.find(m=>m.id==='${item.id}'))" aria-label="Add ${item.name} to cart">+ Add to Cart</button>
        </div>
      </div>
    </div>`).join('');

  const prevBtn = document.getElementById('dish-slider-prev');
  const nextBtn = document.getElementById('dish-slider-next');
  initSliderWithArrows(slider, prevBtn, nextBtn);
}

/* ============================================================
   HOMEPAGE: POPULAR DISHES GRID
   ============================================================ */
function initPopularDishesGrid() {
  const gridEl = document.getElementById('popular-grid');
  if (!gridEl) return;
  const popular = menuItems.filter(i => i.popular).slice(0, 4);
  gridEl.innerHTML = popular.map(buildFoodCard).join('');
}

/* ============================================================
   DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initMenuPage();
  initSignatureDishSlider();
  initPopularDishesGrid();
});
