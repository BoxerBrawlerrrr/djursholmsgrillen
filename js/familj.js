/* Familj — members, shared balance, history */

function renderFamily() {
  const root = document.getElementById("family");
  const u = DG.user;
  const extraBalance = DG.getState("topup", 0);
  const balance = u.familyBalance + extraBalance;

  root.innerHTML = `
    <!-- shared balance -->
    <div class="card" style="text-align:center;">
      <p class="row-sub">Förladdat familjesaldo</p>
      <div class="points-big" style="color:var(--neon-pink-soft);text-shadow:var(--glow-pink);">${DG.fmt(balance)}</div>
      <p class="muted" style="margin:6px 0 16px;">Alla i familjen kan betala mot saldot i kassan.</p>
      <div class="btn-row">
        <button class="btn btn-primary btn-sm" data-top="100" style="flex:1">+100 kr</button>
        <button class="btn btn-primary btn-sm" data-top="200" style="flex:1">+200 kr</button>
        <button class="btn btn-primary btn-sm" data-top="500" style="flex:1">+500 kr</button>
      </div>
    </div>

    <!-- year total -->
    <div class="stat-grid" style="margin-bottom:14px;">
      <div class="stat"><div class="stat-num">${DG.fmt(u.spentThisYear)}</div><div class="stat-label">Senaste 12 mån</div></div>
      <div class="stat"><div class="stat-num">${u.family.length}/5</div><div class="stat-label">Medlemmar</div></div>
      <div class="stat"><div class="stat-num">${u.points}</div><div class="stat-label">Poäng</div></div>
    </div>

    <!-- members -->
    <h2 class="menu-cat-title">Medlemmar</h2>
    <div class="card">
      ${u.family
        .map(
          (m) => `<div class="row">
            <div class="row-main">
              <div class="row-title">${m.name} <span class="row-sub">· ${m.role}</span></div>
              <div class="row-sub">Födelsedag: ${m.birthday}</div>
            </div>
          </div>`
        )
        .join("")}
      <div style="padding-top:14px;">
        <button class="btn btn-ghost btn-sm" id="addMember" style="width:100%;">+ Lägg till medlem</button>
      </div>
    </div>

    <!-- history -->
    <h2 class="menu-cat-title">Familjens historik</h2>
    <div class="card">
      ${u.history
        .map(
          (h) => `<div class="row">
            <div class="row-main">
              <div class="row-title">${h.who}</div>
              <div class="row-sub">${h.what} · ${h.when}</div>
            </div>
            <div class="price">${DG.fmt(h.amount)}</div>
          </div>`
        )
        .join("")}
    </div>
  `;

  root.querySelectorAll("[data-top]").forEach((b) =>
    b.addEventListener("click", () => {
      DG.setState("topup", DG.getState("topup", 0) + Number(b.dataset.top));
      renderFamily();
    })
  );
  root.querySelector("#addMember").addEventListener("click", () => {
    const phone = prompt("Telefonnummer till personen du vill lägga till:");
    if (phone) alert("Inbjudan skickad till " + phone + " (demo).");
  });
}

document.addEventListener("DOMContentLoaded", renderFamily);
