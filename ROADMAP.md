# Djursholmsgrillen — Roadmap

_What to build, and when. Ordered so every phase ships something usable._

---

## ✅ Phase 0 — Foundation & look _(done)_
- Scaffold, design system, premium home page, countdown, nav, motion.
- The visual bar is set. Every new page must match it.

---

## Phase 1 — Core screens, front-end only _(now → next 2 weeks)_
Build the real screens with **fake/hardcoded data**. No backend yet. Goal: the whole app is clickable and looks finished.

1. **`/bestall`** — menu by category, item cards, add-to-cart, cart drawer, pickup-time picker, checkout screen (UI only). _This is the core — do it first._
2. **`/mitt-kort`** — tier card up top, points balance, progress bar to next tier, family list.
3. **`/tjan-poang`** — earn checklist, monthly states, progress bar.
4. **`/claima`** — paste link / upload screenshot form.
5. **`/familj`** — member list, shared balance, history.
6. **`/boka`** — booking form.
7. **`/utmaningar`** — two monthly challenges.

**Milestone:** a full clickable demo you can show Jon & Mikael on a phone.

---

## Phase 2 — Photography & polish _(right after the 13 juli shoot)_
- Drop real food + interior shots into hero and menu (the hero already has an image slot ready — one CSS line).
- Founder photos replace initials.
- Final copy pass in Jon & Mikael's voice.

**Milestone:** looks like a real, shipping product.

---

## Phase 3 — Backend: Supabase _(after screens are locked)_
- Create Supabase project: auth (phone/email), database schema (users, families, orders, points, tiers, claims).
- Wire real login and account creation.
- Replace fake data with live data.
- Admin approval queue for `/claima` writes to the DB.

**Milestone:** real accounts, real points, real orders stored.

---

## Phase 4 — Payments & POS _(needs external steps)_
- **Payments:** build checkout against the client's processor, behind an abstraction layer (no hardcoded provider).
- **Yabie:** call Yabie to confirm API scope, then push app orders into the POS as normal bongs, sync tier discount + points automatically.

**Milestone:** a paid order in the app shows up at the register.

---

## Phase 5 — Native feel _(pre-launch)_
- Apple / Google Wallet tier cards (gold / platinum / black), auto-updating.
- Web push: order ready, tier upgrade, monthly reset, birthday offers.
- `/admin` panel fully wired: claims, orders, menu, points.

**Milestone:** cards in the phone wallet, notifications firing.

---

## Phase 6 — Launch _(→ 15 aug 2026)_
- Full test pass on real devices.
- Opening-day mechanics: first 50 / first 100 guest rewards.
- Influencer pre-event (14 aug) ready.

---

## Two decisions that unblock later phases
- **Supabase** — I can set up the project whenever you're ready (Phase 3). Say the word.
- **Yabie** — someone needs to call Yabie to confirm API access. Do this early; it gates Phase 4.

---

## The rule that keeps it 10/10
Build every new page against the design system already in `css/styles.css`. Same tokens, same type, same spacing. Consistency is what separates a good app from a great one.
