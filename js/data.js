/* ============================================================
   Djursholmsgrillen — shared mock data + helpers
   PLACEHOLDER DATA — safe to edit. Replace with Supabase later.
   ============================================================ */

const DG = {
  // ---- Menu ----
  menu: [
    {
      category: "Burgare",
      items: [
        { id: "wagyu", name: "Wagyu-burgare", desc: "Japansk wagyu, tryffelmajo, picklad lök", price: 189, emoji: "🍔", premium: true },
        { id: "djursholmaren", name: "Djursholmaren", desc: "Dubbel cheeseburgare, husets dressing", price: 129, emoji: "🍔" },
        { id: "bacon", name: "Baconburgare", desc: "Krispig bacon, cheddar, BBQ", price: 139, emoji: "🥓" },
        { id: "kyckling", name: "Kycklingburgare", desc: "Friterad kyckling, sriracha-aioli", price: 129, emoji: "🍗" },
        { id: "halloumi", name: "Halloumiburgare", desc: "Grillad halloumi, örtmajo (veg)", price: 125, emoji: "🧀" },
        { id: "barn", name: "Barnburgare", desc: "Liten burgare med pommes", price: 79, emoji: "🧒" },
      ],
    },
    {
      category: "Tillbehör",
      items: [
        { id: "tryffelpommes", name: "Tryffelpommes", desc: "Handskurna, tryffel & parmesan", price: 69, emoji: "🍟", premium: true },
        { id: "pommes", name: "Pommes", desc: "Klassiska, flingsalt", price: 49, emoji: "🍟" },
        { id: "sotpotatis", name: "Sötpotatispommes", desc: "Med chipotlemajo", price: 59, emoji: "🍠" },
        { id: "lokringar", name: "Lökringar", desc: "Frasiga, husets", price: 55, emoji: "🧅" },
        { id: "coleslaw", name: "Coleslaw", desc: "Krämig, syrlig", price: 39, emoji: "🥗" },
      ],
    },
    {
      category: "Dryck",
      items: [
        { id: "milkshake", name: "Milkshake", desc: "Vanilj, choklad eller jordgubb", price: 59, emoji: "🥤", premium: true },
        { id: "lemonad", name: "Hemlagad lemonad", desc: "Pressad citron, mynta", price: 39, emoji: "🍋" },
        { id: "lask", name: "Läsk", desc: "Utvalda sorter", price: 29, emoji: "🥤" },
        { id: "vatten", name: "Kolsyrat vatten", desc: "Med lime", price: 25, emoji: "💧" },
      ],
    },
    {
      category: "Efterrätt",
      items: [
        { id: "kladdkaka", name: "Kladdkaka", desc: "Varm, med vaniljglass", price: 65, emoji: "🍫", premium: true },
        { id: "softglass", name: "Softglass", desc: "Med strössel", price: 39, emoji: "🍦" },
      ],
    },
  ],

  // ---- Loyalty tiers ----
  tiers: {
    guld: { name: "Guld", discount: 5, threshold: 0 },
    platinum: { name: "Platinum", discount: 10, threshold: 5000 },
    black: { name: "Black", discount: 15, threshold: 10000 },
  },

  // ---- Mock signed-in user / family ----
  user: {
    name: "Philip",
    tier: "guld",
    points: 240,               // 1 point = 1 kr
    spentThisYear: 3200,       // rolling 12-month family total (kr)
    familyBalance: 500,        // pre-loaded shared balance (kr)
    family: [
      { name: "Philip", role: "Vuxen", last: "Wagyu-burgare · 189 kr", birthday: "1990-04-12" },
      { name: "Anna", role: "Vuxen", last: "Kycklingburgare · 129 kr", birthday: "1992-09-03" },
      { name: "Liam", role: "Barn", last: "Barnburgare · 79 kr", birthday: "2015-06-21" },
    ],
    history: [
      { who: "Philip", what: "Wagyu-burgare, Tryffelpommes", when: "Idag 12:40", amount: 258 },
      { who: "Anna", what: "Kycklingburgare, Läsk", when: "Igår 18:10", amount: 158 },
      { who: "Liam", what: "Barnburgare, Softglass", when: "3 apr 17:25", amount: 118 },
    ],
  },

  // ---- Earn-points methods ----
  earn: [
    { id: "google", label: "Google-recension", points: 10, cadence: "Engång" },
    { id: "instagram", label: "Instagram-inlägg / tagg", points: 5, cadence: "1×/månad" },
    { id: "tiktok", label: "TikTok-inlägg / tagg", points: 5, cadence: "1×/månad" },
    { id: "snapchat", label: "Snapchat-snap / tagg", points: 5, cadence: "1×/månad" },
    { id: "facebook", label: "Facebook — lokal grupp", points: 5, cadence: "1×/månad" },
    { id: "referral", label: "Värva en ny medlem", points: 10, cadence: "Obegränsat" },
  ],

  // ---- Monthly challenges ----
  challenges: [
    { id: "duett", title: "Duett-utmaningen", desc: "Filma en duett/reaktion med vår klipp och lägg upp på TikTok, Instagram eller Snapchat.", points: 15 },
    { id: "njutning", title: '"Bästa njutningen"', desc: "Filma din reaktion på första tuggan och lägg upp.", points: 15 },
  ],

  // ---- Helpers ----
  fmt(kr) { return kr.toLocaleString("sv-SE") + " kr"; },

  currentTier() {
    const s = this.user.spentThisYear;
    if (s >= this.tiers.black.threshold) return "black";
    if (s >= this.tiers.platinum.threshold) return "platinum";
    return "guld";
  },
  nextTier() {
    const t = this.currentTier();
    if (t === "guld") return "platinum";
    if (t === "platinum") return "black";
    return null;
  },

  // ---- localStorage-backed state ----
  getCart() { try { return JSON.parse(localStorage.getItem("dg_cart") || "{}"); } catch { return {}; } },
  setCart(c) { localStorage.setItem("dg_cart", JSON.stringify(c)); },
  cartCount() { return Object.values(this.getCart()).reduce((a, b) => a + b, 0); },
  findItem(id) {
    for (const cat of this.menu) { const it = cat.items.find((x) => x.id === id); if (it) return it; }
    return null;
  },
  cartTotal() {
    const cart = this.getCart(); let sum = 0;
    for (const [id, qty] of Object.entries(cart)) { const it = this.findItem(id); if (it) sum += it.price * qty; }
    return sum;
  },

  getState(key, fallback) { try { return JSON.parse(localStorage.getItem("dg_" + key)) ?? fallback; } catch { return fallback; } },
  setState(key, val) { localStorage.setItem("dg_" + key, JSON.stringify(val)); },
};
