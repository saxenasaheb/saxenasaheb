"""A4 — Download MCA Karnataka company master data and filter to plausible
funded startups (Active, Private, registered >= 2015, paid-up capital > 0).

The MCA reports portal (reports.mca.gov.in) is form-driven and its export URL
has changed format before. Set MCA_KARNATAKA_URL to a working direct download
or a local file (file:///abs/path/karnataka.xlsx) when the default breaks. The
data.gov.in Karnataka catalog is the documented fallback mirror.
"""
from __future__ import annotations

import os

import pandas as pd

from common import RAW_DIR, get_logger, session

LOG = get_logger("a4")
OUT = RAW_DIR / "mca_karnataka_active.csv"
SRC_XLSX = RAW_DIR / "mca_karnataka_raw.xlsx"

DEFAULT_URL = "https://reports.mca.gov.in/MinistryV2/master+details.html"
MIN_REG_YEAR = 2015


def _download() -> None:
    url = os.environ.get("MCA_KARNATAKA_URL", DEFAULT_URL)
    if url.startswith("file://"):
        src = url[len("file://") :]
        LOG.info("Using local MCA file %s", src)
        SRC_XLSX.write_bytes(open(src, "rb").read())
        return
    if SRC_XLSX.exists():
        LOG.info("Reusing cached %s (delete to re-download)", SRC_XLSX.name)
        return
    LOG.info("Downloading MCA Karnataka data from %s", url)
    resp = session().get(url, timeout=180, stream=True)
    resp.raise_for_status()
    ctype = resp.headers.get("content-type", "")
    if "html" in ctype and not url.endswith((".xlsx", ".xls", ".csv")):
        raise RuntimeError(
            f"Got HTML, not a spreadsheet, from {url} (content-type={ctype}). "
            "The MCA portal export URL likely changed — set MCA_KARNATAKA_URL to a "
            "direct .xlsx link, the data.gov.in mirror, or a local file:// path."
        )
    SRC_XLSX.write_bytes(resp.content)
    LOG.info("Saved %s (%.1f MB)", SRC_XLSX.name, len(resp.content) / 1e6)


def _col(df: pd.DataFrame, *candidates: str) -> str | None:
    norm = {c.lower().strip(): c for c in df.columns}
    for cand in candidates:
        for key, original in norm.items():
            if cand in key:
                return original
    return None


def run() -> int:
    _download()
    reader = pd.read_csv if SRC_XLSX.suffix == ".csv" else pd.read_excel
    df = reader(SRC_XLSX, dtype=str)
    df.columns = [str(c).strip() for c in df.columns]
    LOG.info("Loaded %d raw rows, columns: %s", len(df), list(df.columns))

    status_c = _col(df, "company status", "status")
    class_c = _col(df, "company class", "class")
    regdate_c = _col(df, "date of registration", "registration", "incorporation")
    paidup_c = _col(df, "paid up capital", "paidup", "paid-up")
    cin_c = _col(df, "cin", "corporate identification")
    name_c = _col(df, "company name", "name")
    addr_c = _col(df, "registered office address", "address")

    mask = pd.Series(True, index=df.index)
    if status_c:
        mask &= df[status_c].fillna("").str.contains("active", case=False)
    if class_c:
        mask &= df[class_c].fillna("").str.contains("private", case=False)
    if regdate_c:
        years = pd.to_datetime(df[regdate_c], errors="coerce", dayfirst=True).dt.year
        mask &= years >= MIN_REG_YEAR
    if paidup_c:
        paid = pd.to_numeric(
            df[paidup_c].astype(str).str.replace(r"[^0-9.]", "", regex=True),
            errors="coerce",
        )
        mask &= paid.fillna(0) > 0

    out = df[mask].copy()
    rename = {}
    if cin_c:
        rename[cin_c] = "cin"
    if name_c:
        rename[name_c] = "legal_name"
    if addr_c:
        rename[addr_c] = "office_address_raw"
    if regdate_c:
        rename[regdate_c] = "date_of_registration"
    out = out.rename(columns=rename)
    out.to_csv(OUT, index=False)
    LOG.info("Wrote %d filtered rows -> %s", len(out), OUT)
    if len(out):
        sample_cols = [c for c in ("cin", "legal_name", "office_address_raw") if c in out.columns]
        LOG.info("Sample:\n%s", out[sample_cols].head(5).to_string(index=False))
    return len(out)
