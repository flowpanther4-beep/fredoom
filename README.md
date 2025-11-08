
# Brand Space™ (MVP) — Next.js + TypeScript + Tailwind

Inspired by The Million Dollar Homepage, modernized: reserve blocks on a 1000×1000 virtual wall, searchable & accessible.

## 🚀 Quick start

```bash
pnpm i   # or npm i / yarn
pnpm dev # localhost:3000
```

Deploy on Vercel: import this repo, set **Build Command** `next build`, **Output** `.next`.

## 🧱 Structure

- `app/` — App Router pages and API routes
- `components/` — UI components
- `lib/` — types, geometry (anti-overlap), utils, and in-memory seed `data.ts`
- `app/api/*` — mock endpoints

## 🖼 Wall & Interaction

- 1000×1000 (virtual) grid, units = 10px.
- Pan/Zoom (wheel, drag; pinch simulated via controls). Buttons ＋ / － / Center.
- Toggle “Show availability” for green/red overlay.
- Click a block → modal with details.
- Directory/search filters; click item focuses block (opens modal).

## 🅰️ Accessibility

- ARIA roles/labels for buttons and modal.
- Visible focus via `.focus-outline`.
- High-contrast retro banner (yellow), classic web fonts (Verdana/Arial).

## 💸 Pricing (mock)

`POST /api/quote {x,y,w,h}` → `{price_cents}` with zone multipliers:
- Top ×1.4, Center ×1.2, Rest ×1.0

Base formula: `base=100` cents per grid unit (10×10).

## 🚫 Anti-overlap (AABB)

- Util in `lib/geometry.ts` (`isOverlapping(a,b)`)
- Used in seed placement and `/api/availability`.

## 🔌 Where to plug real services

- **Stripe Checkout**: replace logic in `app/api/checkout/route.ts` and handle webhooks in `app/api/stripe-webhook/route.ts` (verify signatures; update DB status).
- **Supabase**: replace in-memory `lib/data.ts` with DB tables for `blocks` (id, x, y, w, h, ...). Add RLS for moderation.
- Types: see `lib/types.ts` (`Block`, `BlockDraft`, `QuoteResponse`).
- For OG tags of public block page `/b/[id]`, add a new route (left as exercise) reading from DB.

## 🎨 Branding

- Banner (yellow) and retro menu in `components/TopBanner.tsx`
- Palette and availability messages controlled in `lib/data.ts`.
- Tailwind theme extension in `tailwind.config.js`.

## 🔧 Settings to tweak

- Size presets / pricing: `lib/data.ts` & `app/api/quote/route.ts`.
- Messages for empty spots: `lib/data.ts` (`slogans`).
- Zoom limits: `components/WallCanvas.tsx` (`clamp(…, 0.2, 5)`).

## 📦 Notes

- In-memory data resets on serverless cold start (OK for demo).
- No heavy libs; no maps/WebGL.
- Ready for Vercel/Netlify.

© 2025 Brand Space – All Rights Reserved.
