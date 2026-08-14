/* ============================================================
   Djursholmsgrillen — shared mock data + helpers
   PLACEHOLDER DATA — safe to edit. Replace with Supabase later.
   ============================================================ */

const DG = {
  // ---- Menu (placeholder — replace with the real menu later) ----
  menu: [
    {
      category: "Placeholder",
      items: [
        { id: "ph1", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
        { id: "ph2", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
        { id: "ph3", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
        { id: "ph4", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
      ],
    },
    {
      category: "Placeholder",
      items: [
        { id: "ph5", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
        { id: "ph6", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
        { id: "ph7", name: "Placeholder", desc: "Placeholder", price: 0, emoji: "" },
      ],
    },
  ],

  // ---- Loyalty tiers ----
  tiers: {
    guld: { name: "Guld", discount: 5, threshold: 0 },
    platinum: { name: "Platinum", discount: 10, threshold: 5000 },
    black: { name: "Black", discount: 15, threshold: 10000 },
  },

  // ---- Signed-in user / family (placeholder — comes from Supabase later) ----
  user: {
    name: "Placeholder",
    tier: "guld",
    points: 0,                 // 1 point = 1 kr
    spentThisYear: 0,          // rolling 12-month family total (kr)
    familyBalance: 0,          // pre-loaded shared balance (kr)
    family: [
      { name: "Placeholder", role: "Placeholder", last: "Placeholder", birthday: "Placeholder" },
      { name: "Placeholder", role: "Placeholder", last: "Placeholder", birthday: "Placeholder" },
      { name: "Placeholder", role: "Placeholder", last: "Placeholder", birthday: "Placeholder" },
    ],
    history: [
      { who: "Placeholder", what: "Placeholder", when: "Placeholder", amount: 0 },
      { who: "Placeholder", what: "Placeholder", when: "Placeholder", amount: 0 },
      { who: "Placeholder", what: "Placeholder", when: "Placeholder", amount: 0 },
    ],
  },

  // ---- Earn-points methods ----
  earn: [
    { id: "google", label: "Google-recension", points: 10, cadence: "Engång" },
    { id: "instagram", label: "Instagram-inlägg / tagg", points: 5, cadence: "1×/månad" },
    { id: "tiktok", label: "TikTok-inlägg / tagg", points: 5, cadence: "1×/månad" },
    { id: "snapchat", label: "Snapchat-snap / tagg", points: 5, cadence: "1×/månad" },
    { id: "facebook", label: "Facebook, lokal grupp", points: 5, cadence: "1×/månad" },
    { id: "referral", label: "Värva en ny medlem", points: 10, cadence: "Obegränsat" },
  ],

  // ---- Monthly challenges ----
  challenges: [
    { id: "duett", title: "Duett-utmaningen", desc: "Filma en duett/reaktion med vår klipp och lägg upp på TikTok, Instagram eller Snapchat.", points: 15 },
    { id: "njutning", title: '"Bästa njutningen"', desc: "Filma din reaktion på första tuggan och lägg upp.", points: 15 },
  ],

  // ---- Helpers ----
  fmt(kr) { return kr ? kr.toLocaleString("sv-SE") + " kr" : "Placeholder"; },

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
