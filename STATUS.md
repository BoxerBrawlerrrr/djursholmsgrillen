# Djursholmsgrillen — Status & Roadmap

_Last updated: 14 aug 2026_

---

## ✅ Done

- **Project scaffold** — folder structure, mobile-first setup, shared CSS and JS.
- **Home page** — hero, live countdown to opening (15 aug 2026), two CTAs (Beställ / Skaffa ditt kort), about section, founders (Jon & Mikael).
- **Bottom navigation** — Hem, Beställ, Mitt kort, Tjäna poäng — on every page, active-state highlighting.
- **Base design system** — charcoal + gold premium palette, buttons, cards, typography, spacing.
- **Stub pages** — Beställ, Mitt kort, Tjäna poäng (so nav works end-to-end).
- **Repo hygiene** — `.gitignore`, committed and pushed to GitHub.
- **Collaboration** — James invited as collaborator, setup guide written.

---

## ⬜ Not done yet

Everything below is UI-first: build the screens with fake data, wire the backend later.

- **`/bestall`** — real menu (categories, prices, descriptions), cart, pickup-time picker, checkout UI.
- **`/mitt-kort`** — tier display (Guld/Platinum/Black), points balance, progress bar to next tier, family overview.
- **`/familj`** — link up to 5 members, shared balance, family purchase history, birthday fields.
- **`/tjan-poang`** — checklist of earn methods, monthly reset states, progress bar.
- **`/claima`** — paste link / upload screenshot, admin approval queue.
- **`/utmaningar`** — two monthly challenges with done/not-done states.
- **`/boka`** — booking form (date, time, guests, name, phone).
- **`/admin`** — staff panel: approve claims, manage orders, manage menu, adjust points.

### Backend (after UI is solid)
- **Supabase** — auth, database schema, real-time updates.
- **Payments** — checkout UI behind an abstraction layer (no hardcoded provider).
- **Yabie POS** — pending a call with Yabie to confirm API scope.
- **Apple / Google Wallet** — branded tier cards.
- **Push notifications** — web push.

---

## 🎯 What makes it 11/10 — inspired by Joe & The Juice

Their site works because it's **bold, minimal, and photo-driven**, with the loyalty app pushed hard. Here's how we take that further.

### 1. Real photography, full-bleed
The single biggest upgrade. Right now the hero is a gradient. Swap in a full-screen, edge-to-edge shot of a burger or the interior (you have a photo shoot 13 juli). Big image, few words, one button. Let the food sell itself.

### 2. Bigger, bolder typography
Joe & The Juice uses huge condensed headlines. Go larger and tighter on the hero wordmark. Fewer words, more confidence. "Riktig mat. Riktigt grannskap." — short, punchy Swedish lines.

### 3. Push the loyalty app front and center
Their strongest move: "Earn points, skip the line, get free sh*t." We do the same, in our voice — a bold band on the home page selling the card: _"Samla poäng. Hoppa kön. Ät bättre."_ Make Mitt kort feel like the reason to open the app.

### 4. The Black card as a status object
Their brand is aspirational. Lean into the tier cards as things people _want to flash_ — especially Black. Design them like real premium cards (metal texture, embossed feel, subtle animation on tilt). This is your teen/status hook.

### 5. Motion & polish
Subtle scroll-reveal on sections, a count-up on points, smooth page transitions, haptic-feeling button presses. Small touches that make it feel like a real app, not a website.

### 6. Store presence / opening moment
Joe & The Juice has "find your nearest store." We have one location — so make it an event. A live map pin, opening-day hero, the "first 50 guests" reward front and center as launch approaches.

### 7. Confident, playful copy
Their tone is cheeky and human. Ours is premium-but-warm, family-first. Write every string like a person, not a form. "Ej gjord denna månad" → something with more personality.

### 8. Consistency system
Lock design tokens (color, spacing, radius, type scale) into one place so every new page looks intentional and identical. This is what separates 7/10 from 11/10 as the app grows.

---

## Suggested build order

1. `/bestall` — menu + cart (the core, do this first)
2. Real photography into hero + menu
3. `/mitt-kort` with premium tier cards
4. `/tjan-poang` + `/claima`
5. `/familj`
6. `/boka`
7. `/admin`
8. Supabase backend
9. Wallet cards, push, Yabie
