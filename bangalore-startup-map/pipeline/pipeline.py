#!/usr/bin/env python3
"""Bangalore Startup Map — data pipeline orchestrator.

Usage:
    python pipeline.py --stage all
    python pipeline.py --stage a4
    python pipeline.py --stage a1 a2 a5
    python pipeline.py --list

Each stage is idempotent and caches network responses, so re-runs are cheap and
a failed run can be resumed by re-invoking the same stage.
"""
from __future__ import annotations

import argparse
import sys

from common import get_logger, mark_stage
from stages import (
    a1_inc42_funding,
    a2_yc_directory,
    a3_inc42_trackers,
    a4_mca_karnataka,
    a5_match,
    a6_geocode,
    a7_logos,
    a8_merge,
)

LOG = get_logger("pipeline")

# Ordered so `--stage all` runs A4 (the address backbone) and the discovery
# scrapers before matching/enrichment/merge.
STAGES = {
    "a4": ("Download MCA Karnataka master data", a4_mca_karnataka.run),
    "a1": ("Scrape Inc42 Funding Galore", a1_inc42_funding.run),
    "a2": ("Scrape YC Bangalore directory", a2_yc_directory.run),
    "a3": ("Scrape Inc42 unicorn + IPO trackers", a3_inc42_trackers.run),
    "a5": ("Match funded list <-> MCA", a5_match.run),
    "a6": ("Geocode addresses", a6_geocode.run),
    "a7": ("Logo enrichment", a7_logos.run),
    "a8": ("Merge into master + export companies.json", a8_merge.run),
}
ALL_ORDER = ["a4", "a1", "a2", "a3", "a5", "a6", "a7", "a8"]


def run_stage(key: str) -> None:
    desc, fn = STAGES[key]
    LOG.info("=== %s: %s ===", key.upper(), desc)
    mark_stage(key, "running")
    try:
        rows = fn() or 0
    except Exception:
        mark_stage(key, "failed")
        LOG.exception("Stage %s failed", key.upper())
        raise
    mark_stage(key, "done", rows)
    LOG.info("=== %s done (%s rows) ===", key.upper(), rows)


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="Bangalore Startup Map pipeline")
    p.add_argument(
        "--stage",
        nargs="+",
        default=["all"],
        help="Stage(s) to run: all | " + " | ".join(ALL_ORDER),
    )
    p.add_argument("--list", action="store_true", help="List stages and exit")
    args = p.parse_args(argv)

    if args.list:
        for k in ALL_ORDER:
            print(f"  {k}  {STAGES[k][0]}")
        return 0

    requested = ALL_ORDER if args.stage == ["all"] else [s.lower() for s in args.stage]
    unknown = [s for s in requested if s not in STAGES]
    if unknown:
        p.error(f"unknown stage(s): {', '.join(unknown)}")

    for key in requested:
        run_stage(key)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
