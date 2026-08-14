/* Djursholmsgrillen — shared app JS */

// ---- SVG icons (stroke-based, crisp) ----
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
  order: '<svg viewBox="0 0 24 24"><path d="M4 9h16"/><path d="M4 13h16"/><path d="M5 9a7 7 0 0 1 14 0"/><path d="M5 13c0 3 3 5 7 5s7-2 7-5"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
};

const NAV_ITEMS = [
  { href: "index.html", icon: ICONS.home, label: "Hem" },
  { href: "bestall.html", icon: ICONS.order, label: "Beställ" },
  { href: "mitt-kort.html", icon: ICONS.card, label: "Mitt kort" },
  { href: "tjana-poang.html", icon: ICONS.star, label: "Tjäna poäng" },
];

function renderNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = NAV_ITEMS.map((it) => {
    const active = it.href === current ? " active" : "";
    return `<a class="${active.trim()}" href="${it.href}">
      ${it.icon}<span>${it.label}</span>
    </a>`;
  }).join("");
  document.body.appendChild(nav);
}

// ---- Countdown to opening: 15 Aug 2026, 12:00 (Stockholm) ----
function startCountdown(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const target = new Date("2026-08-15T12:00:00+02:00").getTime();

  function tick() {
    let diff = Math.max(0, target - Date.now());
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

// ---- Scroll reveal ----
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
}

// ---- Falling sakura petals ----
function initPetals(id, count) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    const size = 8 + Math.random() * 8;
    p.style.left = Math.random() * 100 + "%";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = 7 + Math.random() * 8 + "s";
    p.style.animationDelay = -Math.random() * 12 + "s";
    p.style.opacity = 0.5 + Math.random() * 0.4;
    wrap.appendChild(p);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  startCountdown("countdown");
  initReveal();
  initPetals("petals", 14);
});
