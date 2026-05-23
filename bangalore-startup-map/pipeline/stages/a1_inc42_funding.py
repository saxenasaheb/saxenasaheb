"""A1 — Scrape Inc42 'Funding Galore' weekly roundups and extract Bangalore
funded companies.

Each roundup article lists companies; within an article a company is typically
an <h2>/<h3> heading followed by a paragraph carrying amount / round / investors
/ city. Inc42 markup drifts over time, so parsing is intentionally defensive:
if structure changes, adjust _parse_article rather than the crawl logic.

If Inc42 starts returning 403/429 to requests, pivot to Playwright browser
automation here instead of escalating header spoofing.
"""
from __future__ import annotations

import re

from bs4 import BeautifulSoup

from common import RAW_DIR, cached_get, get_logger, is_bangalore

LOG = get_logger("a1")
OUT = RAW_DIR / "inc42_funded.csv"
TAG_URL = "https://inc42.com/tag/funding-galore/"
MAX_PAGES = 60

AMOUNT_RE = re.compile(r"\$?\s?([\d,.]+)\s?(million|mn|bn|billion|crore|cr|lakh)", re.I)
ROUND_RE = re.compile(
    r"\b(pre-seed|seed|pre-series\s?[a-z]|series\s?[a-z]\+?|bridge|debt|angel|growth)\b",
    re.I,
)


def _to_usd(value: str, unit: str) -> float | None:
    try:
        n = float(value.replace(",", ""))
    except ValueError:
        return None
    unit = unit.lower()
    if unit in ("million", "mn"):
        return n * 1e6
    if unit in ("bn", "billion"):
        return n * 1e9
    if unit in ("crore", "cr"):
        return n * 1e7 / 83.0
    if unit == "lakh":
        return n * 1e5 / 83.0
    return None


def _article_links(html: str) -> list[str]:
    soup = BeautifulSoup(html, "lxml")
    links = set()
    for a in soup.select("a[href]"):
        href = a["href"]
        if "/buzz/" in href or "funding-galore" in href or "weekly-funding" in href:
            if href.startswith("http") and "/tag/" not in href:
                links.add(href.split("?")[0])
    return sorted(links)


def _parse_article(html: str, url: str) -> list[dict]:
    soup = BeautifulSoup(html, "lxml")
    rows = []
    for heading in soup.select("article h2, article h3, .single-post h2, .single-post h3"):
        name = heading.get_text(strip=True)
        if not name or len(name) > 80 or name.lower().startswith(("read", "also")):
            continue
        body = []
        for sib in heading.find_all_next(limit=4):
            if sib.name in ("h2", "h3"):
                break
            if sib.name == "p":
                body.append(sib.get_text(" ", strip=True))
        blob = " ".join(body)
        if not is_bangalore(blob):
            continue
        amount_usd = None
        if m := AMOUNT_RE.search(blob):
            amount_usd = _to_usd(m.group(1), m.group(2))
        round_type = (rm.group(1) if (rm := ROUND_RE.search(blob)) else "")
        rows.append(
            {
                "company_name": name,
                "latest_round_amount_usd": amount_usd,
                "latest_round_type": round_type.title(),
                "city": "Bangalore",
                "source_url": url,
                "raw_blurb": blob[:500],
            }
        )
    return rows


def run() -> int:
    import pandas as pd

    seen, all_rows = set(), []
    for page in range(1, MAX_PAGES + 1):
        page_url = TAG_URL if page == 1 else f"{TAG_URL}page/{page}/"
        try:
            html = cached_get(page_url)
        except Exception as e:
            LOG.warning("Stopping pagination at page %d: %s", page, e)
            break
        links = [l for l in _article_links(html) if l not in seen]
        if not links and page > 1:
            LOG.info("No new article links on page %d; stopping.", page)
            break
        for link in links:
            seen.add(link)
            try:
                all_rows.extend(_parse_article(cached_get(link), link))
            except Exception as e:
                LOG.warning("Failed article %s: %s", link, e)

    df = pd.DataFrame(all_rows).drop_duplicates(subset=["company_name"])
    df.to_csv(OUT, index=False)
    LOG.info("Wrote %d Bangalore funded rows -> %s", len(df), OUT)
    return len(df)
