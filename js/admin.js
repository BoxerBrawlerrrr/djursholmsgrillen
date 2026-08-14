/* Admin — claim approval queue, orders, menu, members */

const MOCK_ORDERS = [
  { id: "#1042", who: "Philip", items: "Wagyu-burgare, Tryffelpommes", time: "Hämtning 12:40", total: 258, status: "Nytt" },
  { id: "#1041", who: "Anna", items: "Kycklingburgare, Läsk", time: "Hämtning 12:25", total: 158, status: "Tillagas" },
  { id: "#1040", who: "Erik", items: "2× Djursholmaren", time: "Hämtning 12:15", total: 258, status: "Klar" },
];

function renderAdmin() {
  const root = document.getElementById("admin");
  const claims = DG.getState("claims", []);
  const pending = claims.filter((c) => c.status === "väntar");

  root.innerHTML = `
    <!-- tabs summary -->
    <div class="stat-grid" style="margin-bottom:16px;">
      <div class="stat"><div class="stat-num">${pending.length}</div><div class="stat-label">Väntande claims</div></div>
      <div class="stat"><div class="stat-num">${MOCK_ORDERS.length}</div><div class="stat-label">Aktiva ordrar</div></div>
      <div class="stat"><div class="stat-num">${DG.user.family.length}</div><div class="stat-label">Medlemmar</div></div>
    </div>

    <!-- claim queue -->
    <h2 class="menu-cat-title">Claim-kö</h2>
    <div class="card" id="claimQueue">
      ${
        pending.length
          ? pending
              .map(
                (c, i) => `<div class="row">
                  <div class="row-main">
                    <div class="row-title">${c.label}</div>
                    <div class="row-sub">${c.when}</div>
                  </div>
                  <div class="btn-row">
                    <button class="btn btn-primary btn-sm" data-approve="${claims.indexOf(c)}">Godkänn</button>
                    <button class="btn btn-secondary btn-sm" data-reject="${claims.indexOf(c)}">Neka</button>
                  </div>
                </div>`
              )
              .join("")
          : '<p class="muted">Inga väntande claims. Skicka en från /claima för att testa.</p>'
      }
    </div>

    <!-- orders -->
    <h2 class="menu-cat-title">Ordrar</h2>
    <div class="card">
      ${MOCK_ORDERS.map(
        (o) => `<div class="row">
          <div class="row-main">
            <div class="row-title">${o.id} · ${o.who}</div>
            <div class="row-sub">${o.items} · ${o.time}</div>
          </div>
          <div style="text-align:right;">
            <div class="price">${DG.fmt(o.total)}</div>
            <span class="badge ${o.status === "Klar" ? "done" : "pending"}" style="margin-top:4px;">${o.status}</span>
          </div>
        </div>`
      ).join("")}
    </div>

    <!-- menu management -->
    <h2 class="menu-cat-title">Meny</h2>
    <div class="card">
      ${DG.menu
        .flatMap((cat) => cat.items)
        .slice(0, 6)
        .map(
          (it) => `<div class="row">
            <div class="row-main"><div class="row-title">${it.emoji} ${it.name}</div></div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="price">${DG.fmt(it.price)}</span>
              <button class="btn btn-secondary btn-sm" onclick="alert('Redigera pris (demo)')">Ändra</button>
            </div>
          </div>`
        )
        .join("")}
      <p class="row-sub" style="padding-top:12px;">Visar 6 av alla rätter.</p>
    </div>

    <!-- members -->
    <h2 class="menu-cat-title">Medlemmar</h2>
    <div class="card">
      ${DG.user.family
        .map(
          (m) => `<div class="row">
            <div class="row-main"><div class="row-title">${m.name}</div><div class="row-sub">${m.role} · ${DG.tiers[DG.user.tier].name}</div></div>
            <button class="btn btn-secondary btn-sm" onclick="alert('Justera poäng (demo)')">Poäng</button>
          </div>`
        )
        .join("")}
    </div>
  `;

  root.querySelector("#claimQueue").addEventListener("click", (e) => {
    const ap = e.target.closest("[data-approve]");
    const rj = e.target.closest("[data-reject]");
    if (!ap && !rj) return;
    const list = DG.getState("claims", []);
    const idx = Number((ap || rj).dataset.approve ?? (ap || rj).dataset.reject);
    list[idx].status = ap ? "godkänd" : "nekad";
    DG.setState("claims", list);
    renderAdmin();
  });
}

document.addEventListener("DOMContentLoaded", renderAdmin);
