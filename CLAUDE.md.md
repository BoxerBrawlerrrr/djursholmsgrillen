# Djursholmsgrillen — Web App

## What We're Building
A web app for Djursholmsgrillen, a premium burger/grill restaurant opening in
Djursholm on 15 August 2026. This is not just a marketing site — it's a functional
app where users can order food, manage their loyalty card, handle a pre-loaded
family account, book tables, and earn/claim points. Think of it like a restaurant
version of the SAS EuroBonus app.

## Brand & Tone
- Premium but not pretentious. Warm, local, family-first.
- Swedish audience — all copy in Swedish unless specified otherwise.
- Founders: Jon and Mikael.
- POS system: Yabie (supports Swish, card, Klarna, and online ordering via QR).

## Target Audience
- Families in Djursholm, Danderyd, Stocksund, Mörby
- Kids and teenagers (key for loyalty "status" and point challenges)
- Parents managing family accounts and pre-loaded balances

---

## Tech Stack (Suggested — up for discussion)
- **Frontend:** HTML, CSS, vanilla JavaScript (mobile-first, no heavy frameworks)
- **Backend/Database:** Supabase — handles auth, database, real-time updates,
  and storage. Good fit for loyalty points, family accounts, order history.
- **Payments:** Card only for now. The client has their own payment processor —
  we build the checkout UI and integrate against whatever API they provide.
  Treat it as a generic card payment until they confirm the provider.
  Do not hardcode Stripe, Klarna, or Swish — keep the payment layer behind
  an abstraction so it's easy to swap in the real provider later.
- **POS integration:** Yabie API — needs to be verified directly with Yabie before
  building. Goal: orders placed in app go into Yabie as a normal order ("bong"),
  and purchases sync loyalty points in real time.
- **Wallet cards:** Apple Wallet / Google Wallet (PassKit / Google Pay Passes API)
  for the physical-feeling loyalty card in the phone's wallet app.
- **Push notifications:** Web push (PWA) or Wallet card update notifications.

---

## App Structure & Pages

### / — Home
- Hero with restaurant name, short tagline, countdown to opening (15 aug 2026)
- CTA: "Beställ" and "Skaffa ditt kort"
- Brief about the restaurant and founders (Jon & Mikael)

### /bestall — Order (Pre-order & Pick-up)
- Full menu with categories, prices, item descriptions
- Highlight premium items (e.g. Wagyu-burgare)
- Add to cart, select pick-up time, pay via card
- Order goes into Yabie POS as a normal bong
- Discount applied automatically based on loyalty tier (Guld 5%, Platinum 10%, Black 15%)
- Points earned and added to account after confirmed pick-up

### /boka — Table Booking
- Simple booking form: date, time, number of guests, name, phone number
- Confirmations and reminders sent automatically
- Used for families and larger groups, and for events like Friends & Family nights

### /mitt-kort — My Loyalty Card
- Shows current tier: Guld / Platinum / Black
- Current points balance and value (points = kr to spend next visit)
- Progress bar toward next tier (how much the family needs to spend to reach
  Platinum or Black within the 12-month rolling window)
- Link to add card to Apple/Google Wallet
- Family member overview: who's linked, each person's last purchase
- Tier rules:
  - Guld (5%): everyone, from day one
  - Platinum (10%): family has spent 5 000 kr in the past 12 months
  - Black (15%): family has spent 10 000 kr in the past 12 months
  - Tiers reset every 12 months (like EuroBonus)

### /familj — Family Account
- Link up to 5 family members (enter phone number of a parent to join an existing family)
- All purchases count toward the family's shared annual total
- Pre-loaded family balance: parents top up via card, any family member can pay
  against the shared balance at checkout
- Parents see full family history: who bought what, when, for how much
- Birthday field per family member — triggers automatic birthday offer

### /tjan-poang — Earn Points
- Dedicated tab, as prominent as "Order" and "My Card" — not buried in settings
- Checklist of all ways to earn:
  - Google review: 10 p (one-time)
  - Instagram post/tag: 5 p (once/month)
  - TikTok post/tag: 5 p (once/month)
  - Snapchat snap/tag: 5 p (once/month)
  - Facebook post in local group: 5 p (once/month)
  - Refer a new member: 10 p per referral (unlimited — triggers only when the new
    member registers AND completes first purchase)
- Each channel shows "Klar" or "Ej gjord denna månad" with a checkbox
- Progress bar: "X poäng kvar till Platinum"
- Push reminder if user hasn't claimed anything in a while

### /claima — Claim Points (Social Posts)
- User pastes a link or uploads a screenshot of their post as proof
- Goes into an admin approval queue
- One-click approval by restaurant staff
- Points added to account immediately on approval

### /utmaningar — Monthly Challenges
- Two recurring monthly challenges, reset on the 1st of each month:
  1. Duett-challenge: film a duet/reaction video with the restaurant's clip,
     post on TikTok/Instagram/Snapchat, claim with link or screenshot
  2. "Bästa njutningen"-challenge: film your reaction on first bite, post,
     claim the same way
- Each shows "Gjord" or "Ej gjord denna månad"
- Push notification on the 1st: "Ny månad, nya poäng — har du gjort din duett?"

### /admin — Admin Panel (restaurant staff only, not public)
- Approve/reject social post claims (one-click queue)
- View and manage orders
- Manage menu (add/remove items, update prices)
- View loyalty member list, tiers, points
- Manually adjust points if needed

---

## Points & Rewards Logic
- Every purchase earns points equal to the discount percentage applied:
  - 100 kr at Guld (5%) = 5 kr in points
  - 100 kr at Platinum (10%) = 10 kr in points
  - 100 kr at Black (15%) = 15 kr in points
- Points are spent on the next visit (1 point = 1 kr)
- At milestone points totals (e.g. 1 000 p), a free upgrade unlocks
  (e.g. standard burger → Wagyu-burger, on top of the ongoing discount)
- Referral points only trigger when: new person registers + completes first purchase

---

## Yabie POS Integration (Needs Verification with Yabie)
- Goal: app orders appear in the Yabie POS as normal orders
- Goal: loyalty tier discount applied automatically at checkout so staff don't
  have to manually adjust
- Goal: pre-loaded family account balance syncs with Yabie in real time
- Yabie already supports: Swish för Handel, Klarna, QR table ordering (Yabie Online)
- Next step before building: call Yabie sales/support to confirm API access and
  integration scope

---

## Wallet Card (Apple Wallet / Google Wallet)
- Registration: user scans a QR code at the register or at the table, fills in
  name + phone number, card is added to their phone Wallet within 30 seconds
- Card design: branded with Djursholmsgrillen logo and colour palette
  - Guld: gold card
  - Platinum: silver/platinum card
  - Black: black card (designed to feel prestigious — "the card to flash")
- Card updates automatically after each purchase (balance, points, tier) without
  user needing to open the app

---

## Notifications (Push / Wallet)
- New menu item or seasonal dish launched
- Monthly challenge reset (1st of each month)
- Unused points reminder (if user hasn't claimed a social action recently)
- Birthday offer for user or their registered children
- Order ready for pick-up
- Tier upgrade ("Du är nu Platinum!")

---

## Personal & Birthday Offers
- After X visits with the standard menu: "Dags att testa Wagyu-burgaren?"
- Automatic birthday offer for the user and any children registered in the family
  account (free item or discount code, triggered on birthday)

---

## Claude's Suggestions (Ideas — not in the original plan)
- PWA (Progressive Web App): make the site installable on the home screen so
  it behaves like a native app — no App Store needed, but still gets push notifications
  and offline support. Lower barrier to adoption.
- QR code at every table that deep-links to /bestall with the table number
  pre-filled — zero friction for table ordering.
- Order history page so users can reorder their usual in two taps.
- "Dela med familj"-flow — make it dead simple to send a family invite link
  via SMS so parents can get kids linked in under a minute.
- Admin analytics dashboard — track which dishes sell most, average order
  value per tier, points outstanding vs redeemed.

---

## What's Done So Far
- [x] Repo created on GitHub (djursholmsgrillen)
- [x] CLAUDE.md added

## What's Left To Do
- [ ] Project scaffolding (folder structure, HTML/CSS base)
- [ ] Supabase project setup (auth, database schema)
- [ ] Menu page + ordering flow
- [ ] Loyalty card UI (Mitt kort)
- [ ] Family account management
- [ ] Earn points / claim flow
- [ ] Monthly challenges page
- [ ] Admin panel
- [ ] Yabie API integration (pending call with Yabie)
- [ ] Apple/Google Wallet card generation
- [ ] Push notifications
- [ ] Testing before launch (15 aug 2026)

---

## Key Dates
- Photo shoot: 13 July 2026 (food, restaurant interior, founders Jon & Mikael)
- Pre-opening influencer event: Friday 14 August 2026
- Opening day: Saturday 15 August 2026
  - Guest 1-50: free Wagyu upgrade + mystery gift
  - Guest 51-100: mystery gift