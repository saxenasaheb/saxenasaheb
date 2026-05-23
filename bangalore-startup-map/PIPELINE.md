# Bangalore Startup Map — Data Pipeline Spec

## Goal

Build an in-house Excel/CSV dataset of every Bangalore startup that has:

1. Raised at least a disclosed funding round (any size, pre-seed+)
2. A physical Bangalore office address

This is the source-of-truth dataset that powers the map.

## Sources (ranked by quality × accessibility)

### Tier A — Free, structured, scrapable

**1. MCA Company Master Data (data.gov.in)**

- URL: <https://karnataka.data.gov.in/catalog/company-master-data>
- Also: reports.mca.gov.in/MinistryV2/master+details.html (Karnataka XLSX, ~12MB)
- Fields: CIN, Name, Status, Class, Authorized Capital, Paid-up Capital, Date of Registration, RoC, Principal Business Activity, **Registered Office Address**, Sub Category
- Coverage: Every Pvt Ltd registered in Karnataka. ~hundreds of thousands of rows.
- Why critical: This is the ONLY free source with registered office addresses.
- Caveat: Registered office ≠ actual office. ~30% of startups list CA's office or founder home address.
- Filter logic: Status = "Active", Class = "Private", Registration date >= 2015, Paid-up Capital > 0 (proxy for "has raised something")

**2. Inc42 Funding Galore (weekly funding tracker)**

- URL: <https://inc42.com/tag/funding-galore/>
- Format: Weekly articles, each listing 10-30 funded startups with name, amount, round, sector, city
- Coverage: Goes back to ~2017. ~400 articles total. ~5000-8000 funding events.
- Scraping: Article HTML is structured (h2 per company, paragraph for details). Manageable.

**3. YourStory Daily Roundups**

- URL pattern: yourstory.com/{year}/{month}/startup-news-and-updates-daily-roundup-{date}
- Format: Daily articles with funding announcements buried in paragraphs
- Coverage: Higher noise, but catches deals Inc42 misses (especially pre-seed)
- Note: Returns 403 to programmatic fetchers — needs headers spoof or browser automation

**4. Inc42 Indian Unicorn Tracker + IPO Tracker**

- URLs: inc42.com/features/indian-unicorn-tracker-funding-investors-revenue-and-more/
- inc42.com/features/indian-startup-ipo-tracker-2026/
- 129 unicorns total, ~70+ Bangalore. Top of the pyramid.

### Tier B — Free, semi-structured

**5. Crunchbase (free tier)**

- 5 searches/day on free tier, but each company page is public
- Has HQ city but rarely street address
- Logo URLs available
- Use case: Logo + funding history enrichment, not primary discovery

**6. YC Company Directory**

- ycombinator.com/companies?location=India&location=Bangalore
- ~150-200 Bangalore-based YC cos
- Has logo, batch, description, website. No address.
- Use case: High-quality seed list for the map

**7. LinkedIn Company Pages**

- Has HQ address (often best source for actual office location)
- ToS prohibits scraping. Skip programmatically, use as manual verification only.

### Tier C — Paid (defer for v1, useful for v2)

**8. Tracxn** — best single source, ~₹50k-2L/year
**9. Inc42 Plus Datalabs** — ~₹25k/year, includes funding DB exports
**10. Growth List / similar B2B databases** — ₹15-30k for 500-company exports

## Schema (master spreadsheet)

```
company_id            (uuid, primary key)
company_name          (canonical name)
legal_name            (from MCA, e.g. "Foo Technologies Pvt Ltd")
cin                   (Corporate Identification Number, MCA)
website
logo_url
description           (one-liner)
founded_year
sector                (Fintech / SaaS / AI / Consumer / etc — controlled vocab)
sub_sector
stage                 (Pre-Seed / Seed / Series A / Series B+ / Unicorn)
total_funding_usd
latest_round_amount_usd
latest_round_date
latest_round_type
key_investors         (comma-separated)
office_address_raw    (as scraped/filed)
office_locality       (Indiranagar / Koramangala / HSR / Whitefield / etc)
office_lat
office_lng
address_source        (MCA / LinkedIn / self-submitted / manual)
address_confidence    (high / medium / low)
founders              (comma-separated)
employee_count_range  (1-10 / 11-50 / 51-200 / 200+)
linkedin_url
twitter_url
last_verified_date
source_urls           (pipe-separated)
notes
```

## Pipeline stages

### Stage 1: Build the funded-company list

Goal: ~3000-5000 unique Bangalore startups with at least one disclosed round

Steps:

1. Scrape Inc42 Funding Galore weekly articles (2020-present) → company name + round info
2. Scrape YourStory daily roundups (2022-present) → supplement
3. Pull YC Bangalore directory → ~200 cos
4. Pull Inc42 Unicorn/IPO/Soonicorn trackers
5. Dedupe on canonical name (lowercase, strip "Pvt Ltd", etc.)

Output: `funded_companies.csv` with name, latest_round_info, sector, sources

### Stage 2: Match to MCA registered companies

Goal: Get legal name, CIN, registered office address for each

Steps:

1. Download Karnataka Company Master Data from data.gov.in (one file, free)
2. For each funded company name, fuzzy-match against MCA data
   - Match on: name similarity (rapidfuzz), location = Bangalore, founded year ±2
3. Manual review for the top 500 (highest funding) to confirm matches
4. For unmatched companies, flag for manual lookup

Output: `companies_with_addresses.csv`

### Stage 3: Geocode + locality enrichment

Goal: Lat/lng + neighborhood for every address

Steps:

1. Run all addresses through Google Geocoding API (free tier: 40k calls/month)
   - Fallback: Mapbox Geocoding (100k/month free)
2. Reverse-geocode lat/lng → neighborhood (Indiranagar, Koramangala, etc.)
3. Flag low-confidence geocodes for manual review

Output: `geocoded.csv`

### Stage 4: Manual cleanup + verification

Goal: Confirm address actually reflects where team works

Steps:

1. Top 500 companies by funding: manual check via LinkedIn + Google Maps
2. Address-mismatch heuristic: if registered office = a known CA firm address (BTM Layout, JP Nagar are red flags), flag
3. Build a self-submission form for founders to update their pin

Output: `clean_dataset.csv` — the live source of truth

### Stage 5: Logo enrichment

Goal: Every company has a square logo at 200x200

Steps:

1. ~~Try Clearbit Logo API~~ **(DEPRECATED — HubSpot shut down logo.clearbit.com; host no longer resolves)**
2. Google Favicon API at 256px: `https://www.google.com/s2/favicons?domain={domain}&sz=256`
3. Fallback: Scrape company website favicon at 2x resolution
4. Default: generated monogram (first letter + brand color)

Output: `logos/{company_id}.png`

## Cadence + maintenance

- Weekly cron: ingest latest Inc42 + YourStory funding articles, add new entries
- Monthly: re-pull MCA Karnataka data, catch newly-incorporated entities
- Quarterly: manual audit of top 500 addresses
- Continuous: founder self-submission form for corrections

## Open questions to resolve before building

1. **Definition of "Bangalore office"**: BBMP city limits? Or all of Bangalore Urban + Rural district? (Whitefield/Electronic City are technically outside BBMP core)
2. **Funded but acquired/shutdown**: include or exclude? (e.g. Mimlee — your own dormant co)
3. **Foreign-incorporated cos with Bangalore offices**: e.g. Delaware C-corp with India subsidiary — MCA won't have them
4. **Solo founders / unincorporated**: skip for v1
