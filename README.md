# Aulon Detailing — Website

Premium car detailing website for **Aulon Detailing** (Melrose Park, IL).
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma + SQLite · Zod · Resend/SMTP.

---

## Quick start

```bash
npm install
cp .env.example .env      # then edit values (see below)
npm run db:push           # create the SQLite database
npm run db:seed           # add example bookings for admin testing
npm run dev               # http://localhost:3000
```

Admin panel: **http://localhost:3000/admin** — login with `ADMIN_USER` / `ADMIN_PASSWORD` from `.env`.

---

## ✏️ Editing the site (for the owner — no coding needed)

**Everything editable lives in the `/content` folder.** Open the file, change the text/number, save — the site updates.

| What you want to change | File |
|---|---|
| Phone, email, address, hours, service area, social links | `content/site.ts` |
| **Prices**, package names, what's included | `content/services.ts` |
| Gallery photos & captions | `content/gallery.ts` |
| Customer reviews | `content/testimonials.ts` |
| FAQ questions & answers | `content/faq.ts` |

Search the project for **`TODO(owner)`** — each one marks a placeholder you should confirm
(prices, phone number, email, the About story, etc.).

### Adding real photos
1. Put photos in `public/gallery/` (JPG or WebP, around 1600px wide is ideal).
2. In `content/gallery.ts`, change the entry's `src: null` to `src: "/gallery/your-photo.jpg"`.
3. Update the `alt` text to describe the photo (helps Google find you).

### Changing the logo
Replace `public/logo/aulon.svg` with a new file of the same name.

---

## Environment variables

Copy `.env.example` → `.env` and fill in:

| Variable | What it is |
|---|---|
| `DATABASE_URL` | `file:./dev.db` for local SQLite. Postgres URL in production (see below). |
| `NEXT_PUBLIC_SITE_URL` | The real domain, e.g. `https://aulondetailing.com` |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Login for `/admin`. **Use a strong password in production.** |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) — easiest way to send booking emails |
| `SMTP_*` | Alternative to Resend: any SMTP provider (Gmail app password, etc.) |
| `EMAIL_FROM` | Sender address (must be verified with Resend/your SMTP) |
| `OWNER_EMAIL` | Where new-booking notifications are sent |

If no email provider is configured, bookings still save — emails are skipped and logged.

---

## Booking system

- Multi-step form at `/book`: service → vehicle → date/time → details.
- Business hours 8 AM–6 PM, **Sundays blocked** (both client- and server-side).
- Saves to DB with status `pending`; emails the owner + a confirmation to the customer.
- Duplicate protection: same email + date + service is accepted silently but not re-saved.
- Admin at `/admin` (HTTP Basic Auth): view bookings, change status (pending → confirmed → completed / cancelled).

## Security

- Strict security headers (CSP, HSTS, X-Frame-Options DENY, nosniff, referrer policy) in `next.config.mjs`.
- All inputs validated server-side with Zod (`lib/validation.ts`).
- Rate limiting: 5 requests/min per IP on booking & contact (in-memory sliding window).
- Honeypot field + minimum-fill-time (3s) bot rejection on all forms.
- `/admin` behind Basic Auth (middleware) + `noindex` headers; server actions re-verify auth.

## SEO

- Per-page metadata targeting local keywords (Melrose Park / Chicago West suburbs).
- JSON-LD: `AutoDetailing` LocalBusiness with geo + offer catalog, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` and `robots.txt` generated from `app/sitemap.ts` / `app/robots.ts`.
- Branded black/gold OG + Twitter images generated at `app/opengraph-image.tsx`.
- Semantic HTML, single `h1` per page, descriptive alt text, `next/font` (Poppins, subsetted), `next/image` everywhere.

---

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. **Database**: SQLite doesn't persist on Vercel. Create a Postgres DB (Vercel Postgres / Neon / Supabase), then:
   - in `prisma/schema.prisma` change `provider = "sqlite"` → `provider = "postgresql"`
   - set `DATABASE_URL` in Vercel env vars to the Postgres connection string
   - run `npx prisma db push` once against the production DB
3. Set all other env vars from `.env.example` in Vercel → Project → Settings → Environment Variables.
4. Deploy. The build runs `prisma generate` automatically.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run db:push` | Sync the Prisma schema to the database |
| `npm run db:seed` | Seed example bookings |
| `npm run db:studio` | Visual database browser |
