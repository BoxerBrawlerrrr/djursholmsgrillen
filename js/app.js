/* Djursholmsgrillen — shared app JS */

// ---- Bottom navigation (rendered on every page) ----
const NAV_ITEMS = [
  { href: "index.html", icon: "⌂", label: "Hem" },        // house
  { href: "bestall.html", icon: "\u{1F354}", label: "Beställ" }, // burger
  { href: "mitt-kort.html", icon: "◈", label: "Mitt kort" },
  { href: "tjana-poang.html", icon: "★", label: "Tjäna poäng" },
];

function renderNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = NAV_ITEMS.map((it) => {
    const active = it.href === current ? " active" : "";
    return `<a class="${active.trim()}" href="${it.href}">
      <span class="icon">${it.icon}</span>
      <span>${it.label}</span>
    </a>`;
  }).join("");
  document.body.appendChild(nav);
}

// ---- Countdown to opening: 15 Aug 2026, 12:00 ----
function startCountdown(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const target = new Date("2026-08-15T12:00:00+02:00").getTime();

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const day = Math.floor(diff / 86400000); diff -= day * 86400000;
    const hr = Math.floor(diff / 3600000); diff -= hr * 3600000;
    const min = Math.floor(diff / 60000); diff -= min * 60000;
    const sec = Math.floor(diff / 1000);

    const units = [
      { num: day, label: "Dagar" },
      { num: hr, label: "Timmar" },
      { num: min, label: "Min" },
      { num: sec, label: "Sek" },
    ];
    el.innerHTML = units
      .map(
        (u) => `<div class="unit">
          <div class="num">${String(u.num).padStart(2, "0")}</div>
          <div class="label">${u.label}</div>
        </div>`
      )
      .join("");
  }
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  startCountdown("countdown");
});
