/* Beställ — menu render + cart */

function renderMenu() {
  const root = document.getElementById("menu");
  const cart = DG.getCart();

  root.innerHTML = DG.menu
    .map(
      (cat) => `
      <h2 class="menu-cat-title">${cat.category}</h2>
      <div class="card">
        ${cat.items
          .map((it) => {
            const qty = cart[it.id] || 0;
            const control = qty
              ? `<div class="stepper" data-id="${it.id}">
                   <button data-act="dec">−</button>
                   <span class="qty">${qty}</span>
                   <button data-act="inc">+</button>
                 </div>`
              : `<button class="add-btn" data-add="${it.id}">+</button>`;
            return `
            <div class="menu-item">
              <div class="thumb">${it.emoji}</div>
              <div class="info">
                <h3>${it.name} ${it.premium ? '<span class="tag-premium">Premium</span>' : ""}</h3>
                <p>${it.desc}</p>
              </div>
              <div style="text-align:right;">
                <div class="price">${DG.fmt(it.price)}</div>
                <div style="margin-top:8px;display:flex;justify-content:flex-end;">${control}</div>
              </div>
            </div>`;
          })
          .join("")}
      </div>`
    )
    .join("");
}

function updateCartBar() {
  const bar = document.getElementById("cartBar");
  const count = DG.cartCount();
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartSum").textContent = DG.fmt(DG.cartTotal());
  bar.classList.toggle("hidden", count === 0);
}

function changeQty(id, delta) {
  const cart = DG.getCart();
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  DG.setCart(cart);
  renderMenu();
  updateCartBar();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  updateCartBar();

  document.getElementById("menu").addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) return changeQty(add.dataset.add, 1);
    const stepBtn = e.target.closest(".stepper button");
    if (stepBtn) {
      const id = stepBtn.closest(".stepper").dataset.id;
      changeQty(id, stepBtn.dataset.act === "inc" ? 1 : -1);
    }
  });
});
