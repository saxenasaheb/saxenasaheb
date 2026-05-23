"""A3 — Scrape Inc42 Unicorn Tracker and IPO Tracker tables, keep Bangalore rows.

Both pages render HTML tables. We let pandas.read_html find them, then keep any
table that looks company-shaped and filter to Bangalore-tagged rows. Falls back
to a BeautifulSoup table walk if pandas can't locate a table.
"""
from __future__ import annotations

import io

import pandas as pd
from bs4 import BeautifulSoup

from common import RAW_DIR, cached_get, get_logger, is_bangalore

LOG = get_logger("a3")

TRACKERS = {
    "inc42_unicorns.csv": "https://inc42.com/features/indian-unicorn-tracker-funding-investors-revenue-and-more/",
    "inc42_ipo.csv": "https://inc42.com/features/indian-startup-ipo-tracker-2026/",
}


def _tables(html: str) -> list[pd.DataFrame]:
    try:
        tables = pd.read_html(io.StringIO(html))
        if tables:
            return tables
    except ValueError:
        pass
    soup = BeautifulSoup(html, "lxml")
    out = []
    for t in soup.find_all("table"):
        try:
            out.extend(pd.read_html(io.StringIO(str(t))))
        except ValueError:
            continue
    return out


def _filter_blr(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [str(c).strip() for c in df.columns]
    loc_cols = [c for c in df.columns if any(k in c.lower() for k in ("city", "location", "hq", "headquarter"))]
    if loc_cols:
        mask = pd.Series(False, index=df.index)
        for c in loc_cols:
            mask |= df[c].astype(str).apply(is_bangalore)
        return df[mask]
    # No location column: keep any row mentioning Bangalore anywhere.
    mask = df.astype(str).apply(lambda row: is_bangalore(" ".join(row)), axis=1)
    return df[mask]


def run() -> int:
    total = 0
    for out_name, url in TRACKERS.items():
        try:
            html = cached_get(url)
        except Exception as e:
            LOG.warning("Skipping %s: %s", url, e)
            continue
        frames = [_filter_blr(t) for t in _tables(html) if t.shape[1] >= 3]
        frames = [f for f in frames if len(f)]
        if not frames:
            LOG.warning("No Bangalore rows parsed from %s", url)
            continue
        df = pd.concat(frames, ignore_index=True)
        df["source_url"] = url
        df.to_csv(RAW_DIR / out_name, index=False)
        LOG.info("Wrote %d rows -> %s", len(df), out_name)
        total += len(df)
    return total
