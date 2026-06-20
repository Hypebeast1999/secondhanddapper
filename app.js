const grid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

let cart = [];
let activeCategory = "all";

function fmt(n) {
  return "$" + n.toLocaleString();
}

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function renderProducts(category = activeCategory, query = searchInput.value) {
  activeCategory = category;

  if (category === "reviews") {
    let reviews = REVIEWS;
    const q = query.trim().toLowerCase();
    if (q) {
      reviews = reviews.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.item.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q)
      );
    }
    grid.innerHTML = reviews.map(r => `
      <div class="card review-card">
        <div class="card-body">
          <span class="review-stars">${stars(r.rating)}</span>
          <h3 class="card-title">${r.name}</h3>
          <p class="card-sub">Bought: ${r.item}</p>
          <p class="review-text">${r.text}</p>
        </div>
      </div>
    `).join("") || `<p style="padding:24px;color:var(--muted)">No reviews found.</p>`;
    return;
  }

  let items = category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  const q = query.trim().toLowerCase();
  if (q) {
    items = items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.sub.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    );
  }
  grid.innerHTML = items.map(p => `
    <div class="card">
      <div class="card-image">${p.emoji}</div>
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-sub">${p.sub}</p>
        <div class="card-footer">
          <div class="price-block">
            <span class="price-label">Lowest Ask</span>
            <span class="card-price">${fmt(p.price)}</span>
          </div>
          <button class="add-btn" data-id="${p.id}">Buy</button>
        </div>
      </div>
    </div>
  `).join("") || `<p style="padding:24px;color:var(--muted)">No results found.</p>`;
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="color:var(--muted)">Your bag is empty.</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span>${item.emoji} ${item.title}</span>
        <span>${fmt(item.price)} <button data-id="${item.id}" class="remove-btn">&times;</button></span>
      </div>
    `).join("");
  }
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  cartTotalEl.textContent = fmt(total);
  cartCountEl.textContent = cart.length;
}

grid.addEventListener("click", e => {
  if (e.target.classList.contains("add-btn")) {
    const id = e.target.dataset.id;
    const product = PRODUCTS.find(p => p.id === id);
    cart.push(product);
    renderCart();
    cartPanel.classList.add("open");
    overlay.classList.add("open");
  }
});

cartItemsEl.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) cart.splice(idx, 1);
    renderCart();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

searchInput.addEventListener("input", () => renderProducts());

document.getElementById("cartToggle").addEventListener("click", () => {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
});
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
}

renderProducts("all");
renderCart();

// --- Checkout ---
const checkoutModal = document.getElementById("checkoutModal");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeCheckoutBtn = document.getElementById("closeCheckout");
const payTabs = document.querySelectorAll(".pay-tab");
const payForm = document.getElementById("payForm");
const paySubmitBtn = document.getElementById("paySubmitBtn");
const modalTotalEl = document.getElementById("modalTotal");
const paySuccess = document.getElementById("paySuccess");
const successDetail = document.getElementById("successDetail");
const closeSuccessBtn = document.getElementById("closeSuccess");

const PAY_LABELS = { card: "Pay with Card", cashapp: "Pay with Cash App", paypal: "Pay with PayPal" };
let activeMethod = "card";

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  modalTotalEl.textContent = cartTotalEl.textContent;
  checkoutModal.classList.add("open");
  paySuccess.classList.add("hidden");
  payForm.classList.remove("hidden");
});

closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
closeSuccessBtn.addEventListener("click", () => {
  closeCheckoutModal();
  cart = [];
  renderCart();
  closeCart();
});

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
}

payTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    payTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeMethod = tab.dataset.method;
    document.querySelectorAll(".pay-fields").forEach(f => {
      f.classList.toggle("hidden", f.dataset.methodFields !== activeMethod);
    });
    paySubmitBtn.textContent = PAY_LABELS[activeMethod];
  });
});

document.getElementById("cardNumber").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/[^\d]/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
});
document.getElementById("cardExpiry").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/[^\d]/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");
});

payForm.addEventListener("submit", e => {
  e.preventDefault();
  const total = cartTotalEl.textContent;
  let detail = "";
  if (activeMethod === "card") {
    const last4 = document.getElementById("cardNumber").value.replace(/\s/g, "").slice(-4);
    detail = `Charged ${total} to your Visa card ending in ${last4 || "0000"}.`;
  } else if (activeMethod === "cashapp") {
    const tag = document.getElementById("cashtag").value || "$you";
    detail = `Charged ${total} via Cash App from ${tag}.`;
  } else {
    const email = document.getElementById("paypalEmail").value || "your PayPal account";
    detail = `Charged ${total} via PayPal (${email}).`;
  }
  successDetail.textContent = detail;
  payForm.classList.add("hidden");
  paySuccess.classList.remove("hidden");
});
