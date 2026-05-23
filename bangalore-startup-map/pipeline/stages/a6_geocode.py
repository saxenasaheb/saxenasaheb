"""A6 — Geocode office addresses with Mapbox and derive the Bangalore locality.

Needs MAPBOX_TOKEN (server scope). Forward-geocoding returns enough context to
read out the neighbourhood/locality, so a separate reverse-geocode call isn't
needed. Confidence:
    high   : Mapbox 'address'-level match
    medium : locality/place/neighbourhood-level match
    low    : anything coarser (or city-only)

Results are cached in the SQLite DB so re-runs don't re-bill the API.
"""
from __future__ import annotations

import json
import os

import pandas as pd

from common import PROCESSED_DIR, get_db, get_logger, session

LOG = get_logger("a6")
IN = PROCESSED_DIR / "matched.csv"
OUT = PROCESSED_DIR / "geocoded.csv"
GEOCODE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/{q}.json"


def _cache_setup() -> None:
    get_db().executescript(
        "CREATE TABLE IF NOT EXISTS geocode_cache ("
        "address TEXT PRIMARY KEY, lat REAL, lng REAL, locality TEXT, confidence TEXT);"
    )


def _cached(address: str):
    conn = get_db()
    row = conn.execute(
        "SELECT lat,lng,locality,confidence FROM geocode_cache WHERE address=?", (address,)
    ).fetchone()
    conn.close()
    return row


def _store(address, lat, lng, locality, conf) -> None:
    conn = get_db()
    conn.execute(
        "INSERT OR REPLACE INTO geocode_cache VALUES(?,?,?,?,?)",
        (address, lat, lng, locality, conf),
    )
    conn.commit()
    conn.close()


def _geocode(address: str, token: str):
    if cached := _cached(address):
        return cached["lat"], cached["lng"], cached["locality"], cached["confidence"]
    q = requests_quote(address)
    r = session().get(
        GEOCODE_URL.format(q=q),
        params={
            "access_token": token,
            "country": "IN",
            "proximity": "77.5946,12.9716",  # bias toward Bangalore
            "limit": 1,
            "types": "address,poi,locality,neighborhood,place",
        },
        timeout=30,
    )
    r.raise_for_status()
    feats = r.json().get("features", [])
    if not feats:
        _store(address, None, None, None, "low")
        return None, None, None, "low"
    f = feats[0]
    lng, lat = f["center"]
    ptypes = f.get("place_type", [])
    conf = "high" if "address" in ptypes else "medium" if {"locality", "neighborhood", "poi", "place"} & set(ptypes) else "low"
    locality = None
    for ctx in f.get("context", []):
        if ctx.get("id", "").startswith(("neighborhood", "locality")):
            locality = ctx.get("text")
            break
    locality = locality or (f.get("text") if "locality" in ptypes or "neighborhood" in ptypes else None)
    _store(address, lat, lng, locality, conf)
    return lat, lng, locality, conf


def requests_quote(s: str) -> str:
    from urllib.parse import quote

    return quote(s.replace(";", " ").strip())


def run() -> int:
    token = os.environ.get("MAPBOX_TOKEN")
    if not token:
        raise RuntimeError("MAPBOX_TOKEN not set — required for A6 geocoding.")
    _cache_setup()
    df = pd.read_csv(IN)
    df = df[df.get("office_address_raw").notna()] if "office_address_raw" in df.columns else df
    lats, lngs, locs, confs = [], [], [], []
    for addr in df["office_address_raw"].astype(str):
        try:
            lat, lng, loc, conf = _geocode(addr, token)
        except Exception as e:
            LOG.warning("Geocode failed for %r: %s", addr[:60], e)
            lat = lng = loc = None
            conf = "low"
        lats.append(lat); lngs.append(lng); locs.append(loc); confs.append(conf)
    df["office_lat"], df["office_lng"] = lats, lngs
    df["office_locality"], df["address_confidence"] = locs, confs
    df.to_csv(OUT, index=False)
    geocoded = df["office_lat"].notna().sum()
    LOG.info("Geocoded %d/%d rows -> %s", geocoded, len(df), OUT)
    LOG.info("Confidence: %s", df["address_confidence"].value_counts().to_dict())
    return int(geocoded)
