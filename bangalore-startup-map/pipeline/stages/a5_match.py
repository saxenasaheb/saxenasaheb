"""A5 — Fuzzy-match the funded-company list (A1+A2+A3) against MCA legal names
(A4) to attach CIN + registered office address.

Buckets by rapidfuzz token_set_ratio on normalized names:
    high   : >= 92   (auto-accept)
    medium : 80-92   (needs manual review — written with needs_review=True)
    none   : < 80    (no MCA address; carried forward for manual lookup)

Set A5_SAMPLE=N to match only the first N funded rows — use this to eyeball
match quality before committing to the full run (brief step 4).
"""
from __future__ import annotations

import os

import pandas as pd
from rapidfuzz import fuzz, process

from common import PROCESSED_DIR, RAW_DIR, get_logger, normalize_name

LOG = get_logger("a5")
OUT = PROCESSED_DIR / "matched.csv"

HIGH, MEDIUM = 92, 80
FUNDED_FILES = ["inc42_funded.csv", "yc_bangalore.csv", "inc42_unicorns.csv", "inc42_ipo.csv"]
MCA_FILE = "mca_karnataka_active.csv"


def _load_funded() -> pd.DataFrame:
    frames = []
    for f in FUNDED_FILES:
        p = RAW_DIR / f
        if p.exists():
            d = pd.read_csv(p)
            d["source_file"] = f
            frames.append(d)
    if not frames:
        raise FileNotFoundError("No funded-list CSVs found; run A1/A2/A3 first.")
    df = pd.concat(frames, ignore_index=True)
    name_col = next((c for c in ("company_name", "name", "Company") if c in df.columns), None)
    df["company_name"] = df[name_col].astype(str).str.strip()
    df["_norm"] = df["company_name"].map(normalize_name)
    df = df[df["_norm"].str.len() > 1]
    return df.drop_duplicates(subset=["_norm"]).reset_index(drop=True)


def run() -> int:
    funded = _load_funded()
    mca = pd.read_csv(RAW_DIR / MCA_FILE, dtype=str)
    if "legal_name" not in mca.columns:
        raise KeyError("MCA file missing 'legal_name'; re-run A4.")
    mca["_norm"] = mca["legal_name"].astype(str).map(normalize_name)
    mca = mca[mca["_norm"].str.len() > 1].reset_index(drop=True)

    sample = int(os.environ.get("A5_SAMPLE", "0"))
    if sample:
        funded = funded.head(sample)
        LOG.info("A5_SAMPLE=%d — matching a sample only", sample)

    choices = mca["_norm"].tolist()
    rows = []
    for rec in funded.to_dict("records"):
        match = process.extractOne(rec["_norm"], choices, scorer=fuzz.token_set_ratio)
        score = match[1] if match else 0
        bucket = "high" if score >= HIGH else "medium" if score >= MEDIUM else "none"
        out = {
            "company_name": rec["company_name"],
            "match_score": round(score, 1),
            "match_confidence": bucket,
            "needs_review": bucket == "medium",
            "source_file": rec.get("source_file"),
            "website": rec.get("website"),
            "logo_url": rec.get("logo_url"),
            "description": rec.get("description"),
            "sector": rec.get("sector"),
            "latest_round_amount_usd": rec.get("latest_round_amount_usd"),
            "latest_round_type": rec.get("latest_round_type"),
        }
        if bucket != "none":
            m = mca.iloc[match[2]]
            out.update(
                {
                    "cin": m.get("cin"),
                    "legal_name": m.get("legal_name"),
                    "office_address_raw": m.get("office_address_raw"),
                    "address_source": "MCA",
                }
            )
        rows.append(out)

    df = pd.DataFrame(rows)
    df.to_csv(OUT, index=False)
    counts = df["match_confidence"].value_counts().to_dict()
    LOG.info("Match buckets: %s", counts)
    LOG.info(
        "Rates — high %.0f%% / medium %.0f%% / none %.0f%% of %d funded cos",
        100 * counts.get("high", 0) / len(df),
        100 * counts.get("medium", 0) / len(df),
        100 * counts.get("none", 0) / len(df),
        len(df),
    )
    LOG.info(
        "Review the MEDIUM bucket by hand:\n%s",
        df[df["match_confidence"] == "medium"][
            ["company_name", "legal_name", "match_score"]
        ].head(15).to_string(index=False),
    )
    return len(df)
