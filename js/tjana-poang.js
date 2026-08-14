/* Tjäna poäng — earn checklist with monthly states */

function monthKey() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1);
}

function renderEarn() {
  const root = document.getElementById("earn");
  const done = DG.getState("earn_" + monthKey(), {}); // {id: true}
  const next = DG.nextTier();
  const nextTier = next ? DG.tiers[next] : null;

  let progressHtml = "";
  if (nextTier) {
    const pct = Math.min(100, Math.round((DG.user.spentThisYear / nextTier.threshold) * 100));
    const leftKr = nextTier.threshold - DG.user.spentThisYear;
    progressHtml = `
      <div class="card">
        <div class="progress-label"><span>Mot ${nextTier.name}</span><span>${pct}%</span></div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <p class="row-sub" style="padding-top:10px;">${DG.fmt(leftKr)} kvar till ${nextTier.name}.</p>
      </div>`;
  }

  root.innerHTML = `
    ${progressHtml}
    <h2 class="menu-cat-title">Sätt att tjäna</h2>
    <div class="card" id="earnList">
      ${DG.earn
        .map((m) => {
          const isDone = !!done[m.id];
          const oneTime = m.cadence === "Engång";
          const state = isDone ? (oneTime ? "Klar" : "Klar denna månad") : m.cadence === "Obegränsat" ? "Obegränsat" : "Ej gjord denna månad";
          return `<div class="check-row">
            <div class="checkbox ${isDone ? "done" : ""}" data-id="${m.id}">✓</div>
            <div class="check-main">
              <div class="row-title">${m.label}</div>
              <div class="row-sub">${state}</div>
            </div>
            <div class="pts">+${m.points} p</div>
          </div>`;
        })
        .join("")}
    </div>
    <a href="claima.html" class="btn btn-primary">Claima poäng (länk / skärmdump)</a>
    <a href="utmaningar.html" class="btn btn-ghost" style="margin-top:12px;">Månadens utmaningar →</a>
  `;

  root.querySelector("#earnList").addEventListener("click", (e) => {
    const box = e.target.closest(".checkbox");
    if (!box) return;
    const store = DG.getState("earn_" + monthKey(), {});
    store[box.dataset.id] = !store[box.dataset.id];
    DG.setState("earn_" + monthKey(), store);
    renderEarn();
  });
}

document.addEventListener("DOMContentLoaded", renderEarn);
