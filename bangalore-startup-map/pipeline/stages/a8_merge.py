"""A8 — Merge enriched rows + manual overrides into the master spreadsheet and
export companies.json (only map-ready rows: those with a lat/lng) for the UI.

Dedupe on CIN when present, else on normalized name. Manual overrides win on
conflicting fields. Applies the brief's open-question defaults:
  - status == "Closed"  -> excluded from companies.json (kept in xlsx)
  - status == "Acquired"-> kept and shown
  - bootstrapped cos kept with stage="Bootstrapped" (UI toggles them)
"""
from __future__ import annotations

import hashlib
import json
import uuid

import pandas as pd
import yaml

from common import (
    COMPANIES_JSON,
    DATA_DIR,
    MASTER_XLSX,
    PROCESSED_DIR,
    SCHEMA_COLUMNS,
    get_logger,
    normalize_name,
)

LOG = get_logger("a8")
IN = PROCESSED_DIR / "with_logos.csv"
OVERRIDES = DATA_DIR / "manual_overrides.yaml"


def _blank_row() -> dict:
    return {c: None for c in SCHEMA_COLUMNS}


def _key(row: dict) -> str:
    cin = row.get("cin")
    if cin and str(cin).strip() and str(cin) != "nan":
        return f"cin:{str(cin).strip().upper()}"
    return f"name:{normalize_name(str(row.get('company_name', '')))}"


def _coerce(row: dict) -> dict:
    out = _blank_row()
    for k, v in row.items():
        if k in out and v is not None and str(v) != "nan":
            out[k] = v
    if not out.get("company_id"):
        out["company_id"] = hashlib.md5(_key(row).encode()).hexdigest()[:12]
    return out


def _load_overrides() -> list[dict]:
    if not OVERRIDES.exists():
        return []
    data = yaml.safe_load(OVERRIDES.read_text()) or {}
    rows = data.get("companies") or []
    return [r for r in rows if r and r.get("company_name")]


def run() -> int:
    merged: dict[str, dict] = {}

    if MASTER_XLSX.exists():
        existing = pd.read_excel(MASTER_XLSX, dtype=str).to_dict("records")
        for r in existing:
            merged[_key(r)] = _coerce(r)
        LOG.info("Loaded %d existing master rows", len(merged))

    if IN.exists():
        for r in pd.read_csv(IN).to_dict("records"):
            k = _key(r)
            base = merged.get(k, {})
            base.update({kk: vv for kk, vv in _coerce(r).items() if vv is not None})
            base["company_id"] = base.get("company_id") or _coerce(r)["company_id"]
            merged[k] = base
    else:
        LOG.warning("%s not found — run A5/A6/A7 first for real data", IN.name)

    for ov in _load_overrides():  # manual overrides take precedence
        k = _key(ov)
        base = merged.get(k, _blank_row())
        base.update({kk: vv for kk, vv in _coerce(ov).items() if vv is not None})
        base["address_source"] = base.get("address_source") or "manual"
        merged[k] = base

    df = pd.DataFrame(list(merged.values()), columns=SCHEMA_COLUMNS)
    df["last_verified_date"] = df["last_verified_date"].fillna(pd.Timestamp.utcnow().date().isoformat())
    df.to_excel(MASTER_XLSX, index=False)
    LOG.info("Wrote master spreadsheet: %d rows -> %s", len(df), MASTER_XLSX)

    # companies.json: only rows the map can actually plot, excluding Closed.
    status = df.get("notes", pd.Series("", index=df.index)).astype(str).str.lower()
    ui = df[df["office_lat"].notna() & df["office_lng"].notna()].copy()
    ui = ui[~status.loc[ui.index].str.contains("closed", na=False)]
    records = json.loads(ui.to_json(orient="records"))
    COMPANIES_JSON.write_text(json.dumps(records, ensure_ascii=False, indent=2))
    LOG.info("Wrote %d map-ready companies -> %s", len(records), COMPANIES_JSON)
    if len(records) < 200:
        LOG.warning(
            "Only %d geocoded rows — brief says hold Track B (UI) until >=200.",
            len(records),
        )
    return len(df)
