/* Kassa — cart summary, pickup time, mock payment, confirmation */

function pickupTimes() {
  // next slots in 15-min steps, starting +20 min
  const out = [];
  const now = new Date();
  now.setMinutes(now.getMinutes() + 20);
  const round = 15 - (now.getMinutes() % 15);
  now.setMinutes(now.getMinutes() + round);
  for (let i = 0; i < 6; i++) {
    const t = new Date(now.getTime() + i * 15 * 60000);
    out.push(t.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }));
  }
  return out;
}

function renderCheckout() {
  const root = document.getElementById("checkout");
  const cart = DG.getCart();
  const ids = Object.keys(cart);

  if (!ids.length) {
    root.innerHTML = `
      <div class="notice">
        <div class="icon">🛒</div>
        <h2>Varukorgen är tom</h2>
        <p class="muted" style="margin:8px 0 20px;">Lägg till något gott från menyn.</p>
        <a href="bestall.html" class="btn btn-primary">Till menyn</a>
      </div>`;
    return;
  }

  const subtotal = DG.cartTotal();
  const disc = DG.tiers[DG.user.tier].discount;
  const discKr = Math.round((subtotal * disc) / 100);
  const total = subtotal - discKr;
  const earned = discKr; // points earned = discount value

  root.innerHTML = `
    <div class="card">
      ${ids
        .map((id) => {
          const it = DG.findItem(id);
          return `<div class="row">
            <div class="row-main">
              <div class="row-title">${it.emoji} ${it.name}</div>
              <div class="row-sub">${cart[id]} × ${DG.fmt(it.price)}</div>
            </div>
            <div class="price">${DG.fmt(it.price * cart[id])}</div>
          </div>`;
        })
        .join("")}
    </div>

    <div class="card">
      <div class="row"><div class="row-main">Delsumma</div><div>${DG.fmt(subtotal)}</div></div>
      <div class="row"><div class="row-main">${DG.tiers[DG.user.tier].name}-rabatt (${disc}%)</div><div style="color:var(--neon-jade-soft)">−${DG.fmt(discKr)}</div></div>
      <div class="row"><div class="row-main" style="font-weight:700;font-size:1.1rem;">Att betala</div><div class="price" style="font-size:1.2rem;">${DG.fmt(total)}</div></div>
      <p class="row-sub" style="padding-top:10px;">Du tjänar <strong style="color:var(--neon-jade-soft)">${earned} poäng</strong> på detta köp.</p>
    </div>

    <h2 class="menu-cat-title">Hämtningstid</h2>
    <div class="card">
      <div class="pill-group" id="times">
        ${pickupTimes().map((t, i) => `<div class="pill${i === 0 ? " selected" : ""}" data-time="${t}">${t}</div>`).join("")}
      </div>
    </div>

    <h2 class="menu-cat-title">Betalning</h2>
    <div class="card">
      <div class="field">
        <label>Kortnummer</label>
        <input inputmode="numeric" placeholder="0000 0000 0000 0000" />
      </div>
      <div class="field-row">
        <div class="field"><label>Giltigt t.o.m.</label><input placeholder="MM/ÅÅ" /></div>
        <div class="field"><label>CVC</label><input inputmode="numeric" placeholder="123" /></div>
      </div>
      <p class="row-sub">Betalning är en demo, ingen riktig betalning sker.</p>
    </div>

    <button class="btn btn-primary" id="payBtn" style="margin-top:8px;">Betala ${DG.fmt(total)}</button>
    <a href="bestall.html" class="btn btn-secondary" style="margin-top:12px;">Tillbaka till menyn</a>
  `;

  root.querySelector("#times").addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    root.querySelectorAll("#times .pill").forEach((p) => p.classList.remove("selected"));
    pill.classList.add("selected");
  });

  root.querySelector("#payBtn").addEventListener("click", () => {
    const time = root.querySelector("#times .pill.selected").dataset.time;
    DG.setCart({});
    root.innerHTML = `
      <div class="notice">
        <div class="icon">✅</div>
        <h2>Tack för din beställning!</h2>
        <p class="muted" style="margin:10px 0 4px;">Din order är skickad till köket.</p>
        <p style="color:var(--neon-jade-soft);font-weight:600;">Hämtning kl ${time}</p>
        <p class="muted" style="margin:10px 0 22px;">+${earned} poäng läggs till efter hämtning.</p>
        <a href="index.html" class="btn btn-primary">Till startsidan</a>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderCheckout);
