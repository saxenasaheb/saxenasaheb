# Anuj's 30-Day Builder Bootcamp

A personal site built for Anuj Saxena by Bhaiya Saumya. 30 days, 4 projects, one builder in the making.

Built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Getting It Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel (Your Live URL)

1. **Push this folder to GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Create a new repo (e.g. `anuj-bootcamp`)
   - Follow GitHub's instructions to push this folder

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up / log in with GitHub
   - Click **"Add New Project"**
   - Import your `anuj-bootcamp` repo
   - Leave all settings as default
   - Click **"Deploy"**

3. **Your site is live.** Share the URL.

Every time you push new code to GitHub, Vercel auto-deploys. That's it.

---

## What's Inside

```
app/
  page.tsx      ← The whole site: all sections + interactivity
  layout.tsx    ← HTML shell + metadata
  globals.css   ← Fonts, grain overlay, custom classes

tailwind.config.js   ← Colors, font families, animations
next.config.js       ← Next.js settings
```

## Saving Progress

Your project selections and shipped weeks save automatically to `localStorage` in your browser under:
- `anuj-selected` — which project you picked per week
- `anuj-completed` — which weeks you've marked shipped

---

*Built with love. Ship ugly things. You'll figure it out.*
