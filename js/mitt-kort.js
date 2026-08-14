/* Mitt kort — tier card, points, progress, family */

function renderCard() {
  const root = document.getElementById("card");
  const u = DG.user;
  const tier = DG.tiers[u.tier];
  const next = DG.nextTier();
  const nextTier = next ? DG.tiers[next] : null;

  let progressHtml = "";
  if (nextTier) {
    const pct = Math.min(100, Math.round((u.spentThisYear / nextTier.threshold) * 100));
    const left = nextTier.threshold - u.spentThisYear;
    progressHtml = `
      <div class="card">
        <div class="progress-label">
          <span>Mot ${nextTier.name}</span>
          <span>Placeholder</span>
        </div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <p class="row-sub" style="padding-top:10px;">Placeholder</p>
      </div>`;
  } else {
    progressHtml = `<div class="card"><p>Du är på högsta nivån, <strong style="color:var(--neon-pink-soft)">Black</strong>. 15% rabatt på allt.</p></div>`;
  }

  root.innerHTML = `
    <!-- tier card -->
    <div class="tier-card ${u.tier}" style="min-width:0;width:100%;height:190px;margin-bottom:18px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div class="tier-brand">Djursholmsgrillen</div>
        <div class="chip"></div>
      </div>
      <div>
        <div class="tier-name">${tier.name}</div>
        <div class="tier-disc">${u.name} · ${tier.discount}% rabatt</div>
      </div>
    </div>

    <!-- points -->
    <div class="card" style="text-align:center;">
      <p class="row-sub">Poängsaldo</p>
      <div class="points-big">Placeholder</div>
      <p class="muted" style="margin-top:6px;">Placeholder</p>
    </div>

    ${progressHtml}

    <!-- wallet -->
    <div class="btn-row" style="margin:6px 0 4px;">
      <button class="btn btn-secondary" onclick="alert('Apple Wallet kommer snart')">Lägg till i Apple Wallet</button>
    </div>
    <div class="btn-row">
      <button class="btn btn-secondary" onclick="alert('Google Wallet kommer snart')">Lägg till i Google Wallet</button>
    </div>

    <!-- family -->
    <h2 class="menu-cat-title" style="margin-top:30px;">Familjen</h2>
    <div class="card">
      ${u.family
        .map(
          (m) => `<div class="row">
            <div class="row-main">
              <div class="row-title">${m.name} <span class="row-sub">· ${m.role}</span></div>
              <div class="row-sub">Senast: ${m.last}</div>
            </div>
          </div>`
        )
        .join("")}
      <div style="padding-top:14px;">
        <a href="familj.html" class="btn btn-ghost btn-sm" style="width:100%;">Hantera familj →</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderCard);
