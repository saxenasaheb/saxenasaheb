"""A2 — Pull YC companies and filter to Bangalore.

The public ycombinator.com/companies directory is backed by an Algolia index.
We query that index directly (far more reliable than scraping the React app).
Algolia's public search keys rotate; if this 401s/403s, grab the current
x-algolia-api-key and app id from the directory's network tab and set
YC_ALGOLIA_API_KEY / YC_ALGOLIA_APP_ID in .env.local.
"""
from __future__ import annotations

import json
import os

import pandas as pd
import requests

from common import RAW_DIR, get_logger, is_bangalore, session

LOG = get_logger("a2")
OUT = RAW_DIR / "yc_bangalore.csv"

APP_ID = os.environ.get("YC_ALGOLIA_APP_ID", "45BWZJ1SGC")
API_KEY = os.environ.get(
    "YC_ALGOLIA_API_KEY",
    "Zjk5ZmFiNmRkZGI4MzE5NzM4ZTU5NjQ5OTViNGZkMmM",  # last-known public search key
)
INDEX = os.environ.get("YC_ALGOLIA_INDEX", "YCCompany_production")


def run() -> int:
    url = f"https://{APP_ID.lower()}-dsn.algolia.net/1/indexes/{INDEX}/query"
    headers = {
        "X-Algolia-Application-Id": APP_ID,
        "X-Algolia-API-Key": API_KEY,
        "Content-Type": "application/json",
    }
    rows, page, n_pages = [], 0, 1
    while page < n_pages:
        body = json.dumps(
            {
                "query": "",
                "hitsPerPage": 1000,
                "page": page,
                "facetFilters": [["regions:India"]],
            }
        )
        try:
            r = session().post(url, headers=headers, data=body, timeout=45)
            r.raise_for_status()
        except requests.HTTPError as e:
            raise RuntimeError(
                f"YC Algolia query failed ({e}). Refresh YC_ALGOLIA_API_KEY/APP_ID "
                "from the ycombinator.com/companies network tab."
            ) from e
        data = r.json()
        n_pages = data.get("nbPages", 1)
        for hit in data.get("hits", []):
            locations = " ".join(
                str(hit.get(k, "")) for k in ("all_locations", "locations", "city")
            )
            if not (is_bangalore(locations) or is_bangalore(str(hit.get("long_description", "")))):
                continue
            rows.append(
                {
                    "company_name": hit.get("name"),
                    "batch": hit.get("batch"),
                    "website": hit.get("website"),
                    "description": hit.get("one_liner") or hit.get("tagline"),
                    "logo_url": hit.get("small_logo_thumb_url") or hit.get("logo_url"),
                    "sector": (hit.get("industries") or [None])[0],
                    "city": "Bangalore",
                    "source_url": f"https://www.ycombinator.com/companies/{hit.get('slug', '')}",
                }
            )
        page += 1

    df = pd.DataFrame(rows).drop_duplicates(subset=["company_name"])
    df.to_csv(OUT, index=False)
    LOG.info("Wrote %d YC Bangalore rows -> %s", len(df), OUT)
    return len(df)
