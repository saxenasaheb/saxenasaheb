# Bangalore Startup Map

A public web map of Bangalore startups that have (1) raised at least one
disclosed funding round and (2) have a physical Bangalore office. Each company
is a circular logo pin at its office, clustered the way the city actually looks.

Two tracks: **A — data pipeline** (build the dataset) and **B — map UI** (render
it). Track B intentionally does not start until the pipeline produces 200+ real
geocoded rows. See `bangalore-startup-map/CLAUDE_CODE_BRIEF.md`-equivalent specs:
this README + `PIPELINE.md`.

## Status

- [x] Repo scaffold + full Track A pipeline code (all 8 stages, idempotent, resumable)
- [ ] Track A executed (blocked: needs an env with open egress — see below)
- [ ] Track B (UI) — held until pipeline yields >=200 geocoded rows

> **Heads up — this was scaffolded in a network-restricted cloud sandbox.** The
> code is written and committed, but every data-source host (reports.mca.gov.in,
> inc42.com, data.gov.in, api.mapbox.com) is blocked by the container's egress
> policy, so the pipeline has **not been run** here. Run it where outbound
> network is open (your laptop, or a web env created with a permissive network
> policy). Only `pip`/`npm`/`git` are reachable in this sandbox.

## Track A — running the pipeline

```bash
cd bangalore-startup-map/pipeline
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.local.example ../.env.local   # then fill in MAPBOX_TOKEN etc.

python pipeline.py --list          # show stages
python pipeline.py --stage a4      # MCA download first (the address backbone)
A5_SAMPLE=50 python pipeline.py --stage a5   # eyeball match quality on 50 first
python pipeline.py --stage all     # full run
```

Stages (run order for `all`): **a4** MCA download → **a1** Inc42 funding →
**a2** YC directory → **a3** Inc42 trackers → **a5** match → **a6** geocode →
**a7** logos → **a8** merge + export `data/companies.json`.

State lives in `data/pipeline.db`; HTTP responses are cached under `data/cache/`,
so re-runs are fast and resume cleanly after a failure.

### Known fragile points (watch these on the first real run)
- **A4 (MCA):** the reports.mca.gov.in export URL format has changed before. If
  it returns HTML instead of a spreadsheet, set `MCA_KARNATAKA_URL` to a direct
  `.xlsx`, the data.gov.in mirror, or a local `file://` path.
- **A1 (Inc42):** if it starts returning 403/429, pivot to Playwright browser
  automation rather than escalating header spoofing.
- **A2 (YC):** Algolia public keys rotate — refresh `YC_ALGOLIA_*` from the
  ycombinator.com/companies network tab if it 401s.
- **A5 (matching):** the real risk. `"Razorpay" -> "Razorpay Software Pvt Ltd"`
  is easy; `"Cred" -> "Dreamplug Technologies Pvt Ltd"` is not. **Review the
  medium-confidence bucket (80-92) by hand** before trusting a full run.
- **A7 (logos):** Clearbit's logo API is dead (HubSpot shut it down). Chain is
  now Google favicon → optional Brandfetch → generated monogram.

## TODO — product decisions (do NOT decide these silently)

### Upfront build decisions (need answers before Track B)
1. **Domain** — subdomain of firstdollar.money, or a new domain
   (bangaloremap.in / builtinblr.com / …)?
2. **`/submit` backend** — Airtable, Google Sheets, or Postgres on Vercel?
   (leaning Airtable for v1 — easiest to moderate)
3. **Mapbox token** — need both a public scoped client token
   (`NEXT_PUBLIC_MAPBOX_TOKEN`) and a server token (`MAPBOX_TOKEN`) for geocoding.
4. **Inner Circle branding** — footer mention only, or co-branded header?

### Open data/scoping questions (defaults applied in code, flagged here)
5. **Geographic cutoff** — *default: all of Bangalore Urban district* (incl.
   Whitefield, Electronic City, Sarjapur, Hebbal).
6. **Bootstrapped notables** (Zerodha, Zoho) — *default: include with
   `stage="Bootstrapped"`, UI toggles them.*
7. **Foreign-incorporated cos** (Atlan, Postman) — *default: hand-maintained in
   `data/manual_overrides.yaml` (~30 cos).*
8. **Dead/acquired** — *default: hide if `Closed`, show if `Acquired`.*

## Track B — map UI (not yet built)

Next.js 15 (App Router) + Tailwind v4 + Mapbox GL JS + TypeScript, deployed on
Vercel. Pages: `/` (map), `/list`, `/submit`, `/about`. See the brief for design
direction (muted `light-v11` style, circular logo pins, native clustering below
zoom 13, click-to-expand side panel, no hover tooltips). **Build after A8 emits
`data/companies.json` with 200+ rows.**
