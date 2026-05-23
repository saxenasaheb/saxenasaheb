# Claude Code Brief — Bangalore Startup Map

## What we're building

A web-based map of Bangalore showing every startup that has (1) raised at least
one disclosed funding round and (2) has a physical office in Bangalore. Each
startup is a circular logo pin at its actual office location, clustered tightly
the way a real city looks (Indiranagar, Koramangala, HSR, Whitefield, etc.
should be visually dense).

Reference visual: the YC SF map — logos as circular markers floating over a
clean map tile, no info windows on hover, click to expand a side panel.

This is a public site. Goal: become the canonical visualization of Bangalore's
startup ecosystem.

## Two-track build

**Track A — Data pipeline** (gets the rows) then **Track B — Map UI** (renders
them). Track A is the harder problem. Don't start B until A has produced at
least 200 real company rows with geocoded addresses.

## Track A: Data pipeline

Inputs: `PIPELINE.md` (sources, schema), `bangalore_startups_master.xlsx`
(schema + seed rows + sources + localities sheets).

Stages:
- **A1** Scrape Inc42 Funding Galore (Jan 2020-present) → `data/raw/inc42_funded.csv`
- **A2** Scrape YC Bangalore directory (Algolia JSON endpoint) → `data/raw/yc_bangalore.csv`
- **A3** Scrape Inc42 Unicorn + IPO trackers → `data/raw/inc42_unicorns.csv`, `inc42_ipo.csv`
- **A4** Download MCA Karnataka master data, filter Active/Private/reg>=2015 → `data/raw/mca_karnataka_active.csv`
- **A5** Fuzzy-match funded list ↔ MCA (rapidfuzz; high>92 / medium 80-92 / none) → `data/processed/matched.csv`
- **A6** Geocode addresses (Mapbox) + locality + confidence → `data/processed/geocoded.csv`
- **A7** Logo enrichment (favicon → monogram fallback) → `public/logos/{id}.png`
- **A8** Merge into master, export `data/companies.json`

Orchestration: single `pipeline.py --stage all|a1|a2|…`, each stage idempotent,
SQLite (`data/pipeline.db`) for resumable state.

Open questions to flag (don't decide silently):
1. Geographic cutoff — *default: all of Bangalore Urban district.*
2. Bootstrapped cos (Zerodha, Zoho) — *default: include, `stage="Bootstrapped"`, UI toggle.*
3. Foreign-incorporated (Atlan, Postman) — *default: `data/manual_overrides.yaml`.*
4. Dead/acquired — *default: hide if Closed, show if Acquired.*

## Track B: Map UI

Stack: Next.js 15 (App Router), Tailwind v4, Mapbox GL JS, TypeScript, Vercel.

Design: custom Mapbox style on `light-v11` (everything muted to pale gray/blue;
logos are the only color). Circular white pins, 1px gray border, logo inset,
40px default / 48px hover, shadow only on hover. Native clustering below zoom
13. Inter for UI, Fraunces for display, saffron accent. Mobile: full-screen map,
bottom sheet on tap.

Pages: `/` (full-bleed map, floating logo + search/filter pill, click→side
panel, `/?co=razorpay` deep-link), `/list` (filterable table), `/submit`
(founder self-submission → Airtable/Sheets/Postgres, manual approval), `/about`
(methodology + Inner Circle credit + CTA).

Filters: sector chips, stage, locality, last-funded window.

Data: `data/companies.json` (3-5MB) as a geojson Mapbox source, pre-rendered at
build time.

What NOT to do: no hover tooltips (click-to-expand only), minimal animation, no
dark mode v1, no login, no heatmaps/data-viz widgets — the map IS the viz.

## Things to ask before starting
1. Domain — firstdollar.money subdomain or a new domain?
2. `/submit` backend — Airtable / Google Sheets / Postgres? (lean Airtable)
3. Mapbox token — public scoped (client) + server (geocoding).
4. Inner Circle branding — footer only or co-branded header?

## Success criteria for v1
- 500+ real Bangalore startups on the map
- 80%+ of pins at street-level accuracy
- Side panel < 200ms after click
- Good mobile experience
- Founder self-submit in under 60 seconds
