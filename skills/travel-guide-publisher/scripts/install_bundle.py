#!/usr/bin/env python3
"""Validate and install a TravelGoGuide content bundle into a repository."""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path

from validate_bundle import read_json, validate


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", required=True, type=Path)
    parser.add_argument("--post", required=True, type=Path)
    parser.add_argument("--research", required=True, type=Path)
    parser.add_argument("--replace", action="store_true", help="Replace an existing bundle with the same slug")
    args = parser.parse_args()

    repo = args.repo.resolve()
    marker_paths = [repo / "content" / "posts", repo / "lib" / "static-content.ts", repo / ".github" / "workflows"]
    missing = [str(path) for path in marker_paths if not path.exists()]
    if missing:
        print(f"ERROR: repository markers missing: {', '.join(missing)}")
        return 1

    report = validate(args.post, args.research)
    for message in report.warnings:
        print(f"WARNING: {message}")
    for message in report.errors:
        print(f"ERROR: {message}")
    if report.errors:
        print("ERROR: bundle not installed because validation failed")
        return 1

    research = read_json(args.research)
    slug = research["slug"]
    post_target = repo / "content" / "posts" / f"{slug}.json"
    research_target = repo / "content" / "research" / f"{slug}.json"
    existing = [path for path in (post_target, research_target) if path.exists()]
    if existing and not args.replace:
        print("ERROR: target exists; pass --replace only for an intentional update:")
        for path in existing:
            print(f"  {path}")
        return 1

    research_target.parent.mkdir(parents=True, exist_ok=True)
    post_target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(args.post, post_target)
    shutil.copyfile(args.research, research_target)

    # Ensure installed JSON is canonical and ends with a newline.
    for path in (post_target, research_target):
        data = json.loads(path.read_text(encoding="utf-8"))
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"INSTALLED: {post_target}")
    print(f"INSTALLED: {research_target}")
    print("NEXT: run npm run lint && npm run build, then review the exact git diff")
    return 0


if __name__ == "__main__":
    sys.exit(main())
