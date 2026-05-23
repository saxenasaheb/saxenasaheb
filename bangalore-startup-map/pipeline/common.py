"""Shared helpers for the pipeline: paths, cached HTTP, SQLite state, name
normalization, and the canonical column schema."""
from __future__ import annotations

import hashlib
import logging
import os
import re
import sqlite3
import time
from pathlib import Path

import requests

try:
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).resolve().parents[1] / ".env.local")
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
CACHE_DIR = DATA_DIR / "cache"
LOGO_DIR = ROOT / "public" / "logos"
DB_PATH = DATA_DIR / "pipeline.db"
MASTER_XLSX = DATA_DIR / "bangalore_startups_master.xlsx"
COMPANIES_JSON = DATA_DIR / "companies.json"

for _d in (RAW_DIR, PROCESSED_DIR, CACHE_DIR, LOGO_DIR):
    _d.mkdir(parents=True, exist_ok=True)

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)
REQUEST_SLEEP_S = 2.0

# Canonical master-spreadsheet column order (see PIPELINE.md "Schema").
SCHEMA_COLUMNS = [
    "company_id",
    "company_name",
    "legal_name",
    "cin",
    "website",
    "logo_url",
    "description",
    "founded_year",
    "sector",
    "sub_sector",
    "stage",
    "total_funding_usd",
    "latest_round_amount_usd",
    "latest_round_date",
    "latest_round_type",
    "key_investors",
    "office_address_raw",
    "office_locality",
    "office_lat",
    "office_lng",
    "address_source",
    "address_confidence",
    "founders",
    "employee_count_range",
    "linkedin_url",
    "twitter_url",
    "last_verified_date",
    "source_urls",
    "notes",
]

logging.basicConfig(
    level=os.environ.get("PIPELINE_LOG", "INFO"),
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    datefmt="%H:%M:%S",
)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)


_LOG = get_logger("common")


def get_db() -> sqlite3.Connection:
    """Return a connection to the resumable state DB, creating tables if needed."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS stage_runs (
            stage TEXT PRIMARY KEY,
            status TEXT,
            rows INTEGER,
            updated_at TEXT
        );
        CREATE TABLE IF NOT EXISTS http_cache (
            url TEXT PRIMARY KEY,
            status INTEGER,
            fetched_at TEXT
        );
        """
    )
    return conn


def mark_stage(stage: str, status: str, rows: int = 0) -> None:
    conn = get_db()
    conn.execute(
        "INSERT INTO stage_runs(stage, status, rows, updated_at) VALUES(?,?,?,datetime('now')) "
        "ON CONFLICT(stage) DO UPDATE SET status=excluded.status, rows=excluded.rows, "
        "updated_at=excluded.updated_at",
        (stage, status, rows),
    )
    conn.commit()
    conn.close()


_SESSION: requests.Session | None = None


def session() -> requests.Session:
    global _SESSION
    if _SESSION is None:
        _SESSION = requests.Session()
        _SESSION.headers.update(
            {
                "User-Agent": USER_AGENT,
                "Accept-Language": "en-US,en;q=0.9",
                "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
            }
        )
    return _SESSION


def _cache_path(url: str) -> Path:
    return CACHE_DIR / (hashlib.sha256(url.encode()).hexdigest() + ".cache")


def cached_get(url: str, *, force: bool = False, **kwargs) -> str:
    """GET a URL, caching the body on disk. Sleeps REQUEST_SLEEP_S only on a
    real network hit so re-runs of a stage are fast and polite."""
    cp = _cache_path(url)
    if cp.exists() and not force:
        return cp.read_text(encoding="utf-8", errors="replace")
    _LOG.info("GET %s", url)
    resp = session().get(url, timeout=45, **kwargs)
    resp.raise_for_status()
    cp.write_text(resp.text, encoding="utf-8", errors="replace")
    time.sleep(REQUEST_SLEEP_S)
    return resp.text


_NAME_NOISE = [
    "private limited",
    "pvt ltd",
    "pvt. ltd.",
    "pvt limited",
    "limited liability partnership",
    "llp",
    "limited",
    " ltd",
    "technologies",
    "technology",
    "tech",
    "solutions",
    "software",
    "systems",
    "labs",
    "ventures",
    "india",
    "internet",
    "online",
    "services",
    "global",
]


def normalize_name(name: str) -> str:
    """Lowercase, strip corporate suffixes/noise and punctuation, for fuzzy
    matching funded-list names against MCA legal names."""
    if not name:
        return ""
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9& ]+", " ", s)
    for token in _NAME_NOISE:
        s = re.sub(rf"\b{re.escape(token.strip())}\b", " ", s)
    return re.sub(r"\s+", " ", s).strip()


BLR_TERMS = ("bangalore", "bengaluru", "bangaluru")


def is_bangalore(text: str | None) -> bool:
    if not text:
        return False
    t = text.lower()
    return any(term in t for term in BLR_TERMS)
