# Sue-Ellen Pereira — Advanced MSK Physiotherapist

Private practice website for Sue-Ellen Pereira, built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives)
- **Fonts:** Cormorant Garamond (display), Inter (body), Caveat (script accent)
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Booking:** Acuity Scheduling inline embed
- **Email:** Resend (contact form)
- **Analytics:** Vercel Analytics + Plausible-ready
- **Deployment:** Vercel

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/saxenasaheb/saxenasaheb.git
cd saxenasaheb
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL, e.g. `https://sueellenpereira.co.uk` |
| `NEXT_PUBLIC_ACUITY_OWNER_ID` | Yes (for booking) | Acuity Scheduling Owner ID — see below |
| `RESEND_API_KEY` | Yes (for contact form) | API key from [resend.com](https://resend.com) |

### 3. Run locally

```bash
npm run dev
```

---

## Updating content

**All editable content lives in one file:**

```
src/lib/site-config.ts
```

This includes:
- Practitioner name, bio, credentials, contact details, opening hours
- Services (title, duration, price, description, what-to-expect)
- Testimonials (3 hardcoded placeholders — replace before launch)
- Cancellation policy
- Navigation links
- Registration numbers (HCPC, CSP, ICO)
- Membership organisations

Search for `PLACEHOLDER` in that file to find items that need confirming with the client before launch.

---

## Acuity Scheduling setup

1. Log in to [Acuity Scheduling](https://acuityscheduling.com)
2. Go to **Business Settings → Scheduling Page**
3. Copy your **Owner ID** (numeric, e.g. `12345678`)
4. Add it to `.env.local` as `NEXT_PUBLIC_ACUITY_OWNER_ID=12345678`

The booking page (`/book`) shows an inline iframe embed. The Acuity `embed.js` script is lazy-loaded and does not block first paint.

Reference: [Acuity embed documentation](https://help.acuityscheduling.com/hc/en-us/articles/16670165497485)

---

## Contact form

The contact form at `/contact` uses a Next.js Server Action (`src/app/actions/contact.ts`).

- If `RESEND_API_KEY` is set: emails are sent via [Resend](https://resend.com)
- If not set: submissions are logged to the server console (development only)

Before launch:
1. Set up a domain in Resend and verify DNS
2. Update the `from` address in `contact.ts` to match your verified domain
3. Add `RESEND_API_KEY` to production environment variables in Vercel

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect the repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (Settings → Environment Variables)
4. Deploy — Vercel detects Next.js automatically

---

## Before launch checklist

- [ ] Replace all `PLACEHOLDER` content in `src/lib/site-config.ts`
- [ ] Confirm and update all service prices with client
- [ ] Replace Unsplash placeholder images with real photography
- [ ] Add real HCPC, CSP, HEE, NHS logos to `public/logos/`
- [ ] Update logo placeholders in `Memberships.tsx` and `about/page.tsx`
- [ ] Replace placeholder testimonials with real patient quotes (with consent)
- [ ] Set `NEXT_PUBLIC_ACUITY_OWNER_ID` in Vercel environment variables
- [ ] Set `RESEND_API_KEY` in Vercel and verify sending domain
- [ ] Update `from` email address in `src/app/actions/contact.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Update Google Maps embed URL in `site-config.ts`
- [ ] Review and confirm Privacy Policy with a solicitor/DPO
- [ ] Review and confirm Terms & Conditions with professional indemnity insurer
- [ ] Add ICO, HCPC, CSP registration numbers
- [ ] Add `public/og-default.jpg` for social sharing (1200×630px)
- [ ] Add `public/favicon.ico` (branded)
- [ ] Enable Plausible Analytics (uncomment in `layout.tsx`, set domain)
- [ ] Run Lighthouse audit and fix any issues

---

## File structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, Header, Footer, CookieBanner
│   ├── page.tsx                Homepage (composes all section components)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── book/
│   │   ├── page.tsx
│   │   └── AcuityEmbed.tsx     Acuity inline iframe embed
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactForm.tsx     Client-side form → server action
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── actions/contact.ts      Server action: Resend email
├── components/
│   ├── sections/               Homepage sections
│   └── site/                   Layout + design primitives
│       ├── ArchedImage.tsx
│       ├── CurvedDivider.tsx
│       └── EyebrowHeading.tsx
└── lib/
    ├── site-config.ts          ALL editable content
    ├── seo.ts                  Metadata helpers + JSON-LD
    └── utils.ts                cn() utility
```

---

## Journal route

The `/journal` route is intentionally not built. The App Router structure leaves room for it — add `src/app/journal/page.tsx` when the client is ready to add a blog.
