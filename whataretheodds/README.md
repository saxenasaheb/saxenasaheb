# What Are The Odds?

Describe the wild thing that just happened to you. The engine calculates the odds and tells you exactly how impressed to be.

A single-page toy powered by Claude. Felt-green odds board, amber counter, one big button.

## Stack

- Next.js 15 (App Router), plain CSS, no UI library
- One edge API route (`/api/odds`) that calls the Anthropic API server-side
- The API key never touches the browser

## Deploy to Vercel (5 minutes)

1. Push this folder to a new GitHub repo:

   ```bash
   cd whataretheodds
   git init && git add -A && git commit -m "v1"
   gh repo create whataretheodds --public --source=. --push
   ```

   (or create the repo on github.com and `git remote add origin ... && git push`)

2. Go to vercel.com → Add New Project → import the repo. No build config needed.

3. In the Vercel project settings → Environment Variables, add:

   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```

   Get a key at console.anthropic.com.

4. Deploy. Point your domain at it when ready.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your real key
npm run dev
```

## Cost note

Each query is one Claude Sonnet call (~800 output tokens max). At hobby traffic this is pennies. If it goes viral, add rate limiting (Vercel WAF rules or Upstash Ratelimit) before your bill does the counting-up animation.
