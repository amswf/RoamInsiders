#!/usr/bin/env python3
"""Validate a TravelGoGuide post and its evidence bundle."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

LOCALES = {"zh-CN", "zh-TW", "en", "id", "th", "vi", "ms", "fil", "km", "lo", "my"}
CONTENT_TYPES = {"route", "deal", "coupon", "guide"}
CTA_PLATFORMS = {"trip", "traveloka", "custom"}
SOURCE_TYPES = {"official", "primary", "reputable-secondary", "commercial"}
CATEGORIES = {
    "safety", "entry", "transport", "hours", "price", "event", "weather",
    "seasonality", "geography", "culture", "other",
}
VOLATILITY_DAYS = {"critical": 3, "high": 7, "medium": 30, "low": 365}
PLACEHOLDERS = re.compile(r"\b(?:todo|tbd|lorem ipsum)\b|待核实|待补充|示例链接", re.I)
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
HYPE = re.compile(
    r"\b(?:ultimate|unmissable|must[- ]visit|hidden gem|best ever)\b|"
    r"必去|不容错过|终极攻略|隐藏宝藏|此生必去",
    re.I,
)


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def read_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"Cannot read JSON {path}: {exc}") from exc


def parse_time(value: object, field: str, report: Report) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        report.error(f"{field} must be an ISO-8601 timestamp")
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except ValueError:
        report.error(f"{field} is not a valid ISO-8601 timestamp: {value}")
        return None


def valid_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def require_text(obj: dict, field: str, where: str, report: Report) -> str:
    value = obj.get(field)
    if not isinstance(value, str) or not value.strip():
        report.error(f"{where}.{field} must be non-empty text")
        return ""
    return value.strip()


def validate_research(research: object, now: datetime, report: Report) -> tuple[str, dict[str, dict]]:
    if not isinstance(research, dict):
        report.error("research root must be an object")
        return "", {}

    if research.get("schemaVersion") != 1:
        report.error("research.schemaVersion must equal 1")
    slug = require_text(research, "slug", "research", report)
    if slug and not SLUG.fullmatch(slug):
        report.error("research.slug must use lowercase letters, digits, and hyphens")
    require_text(research, "destination", "research", report)
    require_text(research, "audience", "research", report)
    researched_at = parse_time(research.get("researchedAt"), "research.researchedAt", report)
    if researched_at and researched_at > now:
        report.error("research.researchedAt cannot be in the future")

    sources = research.get("sources")
    if not isinstance(sources, list) or len(sources) < 5:
        report.error("research.sources must contain at least 5 sources")
        sources = []

    source_map: dict[str, dict] = {}
    domains: set[str] = set()
    authoritative_count = 0
    for index, source in enumerate(sources):
        where = f"research.sources[{index}]"
        if not isinstance(source, dict):
            report.error(f"{where} must be an object")
            continue
        source_id = require_text(source, "id", where, report)
        require_text(source, "title", where, report)
        require_text(source, "publisher", where, report)
        source_type = require_text(source, "sourceType", where, report)
        url = source.get("url")
        parse_time(source.get("accessedAt"), f"{where}.accessedAt", report)
        if source_type not in SOURCE_TYPES:
            report.error(f"{where}.sourceType must be one of {sorted(SOURCE_TYPES)}")
        if source_type in {"official", "primary"}:
            authoritative_count += 1
        if not valid_url(url):
            report.error(f"{where}.url must be an http(s) URL")
        else:
            domains.add(urlparse(url).netloc.lower().removeprefix("www."))
        if source_id in source_map:
            report.error(f"duplicate source id: {source_id}")
        elif source_id:
            source_map[source_id] = source

    if authoritative_count < 3:
        report.error("research must include at least 3 official or primary sources")
    if len(domains) < 3:
        report.error("research sources must span at least 3 domains")

    topic = research.get("topicDecision")
    if not isinstance(topic, dict):
        report.error("research.topicDecision must be an object")
        topic = {}
    require_text(topic, "angle", "research.topicDecision", report)
    require_text(topic, "reason", "research.topicDecision", report)
    signals = topic.get("trendSignals")
    if not isinstance(signals, list) or len(signals) < 2:
        report.error("topicDecision.trendSignals must contain at least 2 signals")
        signals = []
    signal_domains: set[str] = set()
    for index, signal in enumerate(signals):
        where = f"research.topicDecision.trendSignals[{index}]"
        if not isinstance(signal, dict):
            report.error(f"{where} must be an object")
            continue
        require_text(signal, "description", where, report)
        checked = parse_time(signal.get("checkedAt"), f"{where}.checkedAt", report)
        if checked and (now - checked).total_seconds() > 30 * 86400:
            report.error(f"{where} is older than 30 days")
        ids = signal.get("sourceIds")
        if not isinstance(ids, list) or not ids:
            report.error(f"{where}.sourceIds must be a non-empty list")
            continue
        for source_id in ids:
            source = source_map.get(source_id)
            if not source:
                report.error(f"{where} references unknown source {source_id}")
                continue
            if valid_url(source.get("url")):
                signal_domains.add(urlparse(source["url"]).netloc.lower().removeprefix("www."))
    if len(signal_domains) < 2:
        report.error("trend signals must be supported by at least 2 distinct domains")

    claims = research.get("claims")
    if not isinstance(claims, list) or not claims:
        report.error("research.claims must be a non-empty list")
        claims = []
    claim_ids: set[str] = set()
    for index, claim in enumerate(claims):
        where = f"research.claims[{index}]"
        if not isinstance(claim, dict):
            report.error(f"{where} must be an object")
            continue
        claim_id = require_text(claim, "id", where, report)
        require_text(claim, "text", where, report)
        category = require_text(claim, "category", where, report)
        volatility = require_text(claim, "volatility", where, report)
        if claim_id in claim_ids:
            report.error(f"duplicate claim id: {claim_id}")
        claim_ids.add(claim_id)
        if category not in CATEGORIES:
            report.error(f"{where}.category must be one of {sorted(CATEGORIES)}")
        if volatility not in VOLATILITY_DAYS:
            report.error(f"{where}.volatility must be one of {sorted(VOLATILITY_DAYS)}")
        if category in {"safety", "entry"} and volatility != "critical":
            report.error(f"{where} safety/entry claims must be critical")
        if category in {"transport", "hours", "price", "event"} and volatility not in {"critical", "high"}:
            report.error(f"{where} operational claims must be high or critical")
        checked = parse_time(claim.get("checkedAt"), f"{where}.checkedAt", report)
        if checked and volatility in VOLATILITY_DAYS:
            age = (now - checked).total_seconds() / 86400
            if age < -0.01:
                report.error(f"{where}.checkedAt cannot be in the future")
            elif age > VOLATILITY_DAYS[volatility]:
                report.error(f"{where} is {age:.1f} days old; {volatility} limit is {VOLATILITY_DAYS[volatility]} days")
        ids = claim.get("sourceIds")
        if not isinstance(ids, list) or not ids:
            report.error(f"{where}.sourceIds must be a non-empty list")
            ids = []
        claim_sources = [source_map[source_id] for source_id in ids if source_id in source_map]
        for source_id in ids:
            if source_id not in source_map:
                report.error(f"{where} references unknown source {source_id}")
        if volatility == "critical" and not any(s.get("sourceType") == "official" for s in claim_sources):
            report.error(f"{where} critical claims require an official source")
        if volatility == "high" and not any(s.get("sourceType") in {"official", "primary"} for s in claim_sources):
            report.error(f"{where} high-volatility claims require an official or primary source")
        if claim.get("usedInPost") is not True:
            report.warn(f"{where} is not marked usedInPost=true")

    image = research.get("image")
    if not isinstance(image, dict):
        report.error("research.image must be an object")
    else:
        if not valid_url(image.get("landingPageUrl")):
            report.error("research.image.landingPageUrl must be an http(s) URL")
        require_text(image, "creator", "research.image", report)
        require_text(image, "usageBasis", "research.image", report)
    if not isinstance(research.get("conflicts"), list):
        report.error("research.conflicts must be a list")
    return slug, source_map


def validate_post(post: object, research_slug: str, research_sources: dict[str, dict], now: datetime, report: Report) -> None:
    if not isinstance(post, dict):
        report.error("post root must be an object")
        return
    unexpected = set(post) - LOCALES
    if unexpected:
        report.error(f"post contains unsupported locale keys: {sorted(unexpected)}")
    for required_locale in sorted(LOCALES):
        if required_locale not in post:
            report.error(f"post must include {required_locale}")

    canonical_sources = {
        str(source.get("url")): source for source in research_sources.values() if valid_url(source.get("url"))
    }
    statuses: set[str] = set()
    source_sets: list[set[str]] = []
    verified_values: set[str] = set()
    for locale, localized in post.items():
        where = f"post.{locale}"
        if locale not in LOCALES:
            continue
        if not isinstance(localized, dict):
            report.error(f"{where} must be an object")
            continue
        slug = require_text(localized, "slug", where, report)
        if slug != research_slug:
            report.error(f"{where}.slug must match research.slug ({research_slug})")
        for field in ("title", "excerpt", "content", "destination", "category", "imageAlt", "updatedAt"):
            require_text(localized, field, where, report)
        title = str(localized.get("title", "")).strip()
        excerpt = str(localized.get("excerpt", "")).strip()
        content = str(localized.get("content", ""))
        if PLACEHOLDERS.search(content) or PLACEHOLDERS.search(str(localized.get("title", ""))):
            report.error(f"{where} contains placeholder text")
        if "\n" in title or len(title) > 120:
            report.error(f"{where}.title must be one clear line no longer than 120 characters")
        if title and excerpt and title.casefold() == excerpt.casefold():
            report.error(f"{where}.excerpt must add useful information instead of repeating the title")
        if HYPE.search(title):
            report.warn(f"{where}.title may contain vague or unsupported hype; rewrite or verify it")
        sections = [block.strip() for block in re.split(r"\n\s*\n", content) if block.strip()]
        if len(sections) < 5:
            report.error(f"{where}.content must contain at least 5 readable sections")
        headings: list[str] = []
        for section_index, section in enumerate(sections):
            lines = [line.strip() for line in section.splitlines() if line.strip()]
            if len(lines) < 2 or "｜" not in lines[0]:
                report.error(
                    f"{where}.content section {section_index + 1} must start with a descriptive heading containing ｜"
                )
                continue
            headings.append(lines[0].casefold())
            body_length = len(re.sub(r"\s+", "", " ".join(lines[1:])))
            if body_length > 1400:
                report.warn(f"{where}.content section {section_index + 1} is dense; split or simplify it")
        if len(headings) != len(set(headings)):
            report.error(f"{where}.content contains repeated section headings")
        status = localized.get("status")
        if status not in {"draft", "published"}:
            report.error(f"{where}.status must be draft or published")
        else:
            statuses.add(status)
        if status == "published" and len(re.sub(r"\s+", "", content)) < 600:
            report.error(f"{where}.content must contain at least 600 non-whitespace characters when published")
        if localized.get("contentType") not in CONTENT_TYPES:
            report.error(f"{where}.contentType must be one of {sorted(CONTENT_TYPES)}")
        if localized.get("ctaPlatform") not in CTA_PLATFORMS:
            report.error(f"{where}.ctaPlatform must be one of {sorted(CTA_PLATFORMS)}")
        if localized.get("ctaUrl") and not valid_url(localized.get("ctaUrl")):
            report.error(f"{where}.ctaUrl must be empty or an http(s) URL")
        if not valid_url(localized.get("imageUrl")):
            report.error(f"{where}.imageUrl must be an http(s) URL")
        updated = localized.get("updatedAt")
        if isinstance(updated, str):
            try:
                datetime.strptime(updated, "%Y-%m-%d")
            except ValueError:
                report.error(f"{where}.updatedAt must use YYYY-MM-DD")
        verified = localized.get("verifiedAt")
        verified_at = parse_time(verified, f"{where}.verifiedAt", report)
        if verified_at and (now - verified_at).total_seconds() > 7 * 86400:
            report.error(f"{where}.verifiedAt is older than 7 days")
        if isinstance(verified, str):
            verified_values.add(verified)
        public_sources = localized.get("sources")
        if not isinstance(public_sources, list) or len(public_sources) < 3:
            report.error(f"{where}.sources must contain at least 3 sources")
            public_sources = []
        public_urls: set[str] = set()
        for index, source in enumerate(public_sources):
            source_where = f"{where}.sources[{index}]"
            if not isinstance(source, dict):
                report.error(f"{source_where} must be an object")
                continue
            require_text(source, "title", source_where, report)
            require_text(source, "publisher", source_where, report)
            require_text(source, "accessedAt", source_where, report)
            url = source.get("url")
            if not valid_url(url):
                report.error(f"{source_where}.url must be an http(s) URL")
            elif url not in canonical_sources:
                report.error(f"{source_where}.url is absent from research.sources")
            else:
                public_urls.add(url)
        source_sets.append(public_urls)

    if len(statuses) > 1:
        report.error("all locale variants must use the same publication status")
    if len(verified_values) > 1:
        report.error("all locale variants must use the same verifiedAt timestamp")
    if source_sets and any(urls != source_sets[0] for urls in source_sets[1:]):
        report.error("all locale variants must expose the same source URLs")


def validate(post_path: Path, research_path: Path, now: datetime | None = None) -> Report:
    report = Report()
    now = now or datetime.now(timezone.utc)
    try:
        research = read_json(research_path)
        post = read_json(post_path)
    except ValueError as exc:
        report.error(str(exc))
        return report
    slug, sources = validate_research(research, now, report)
    validate_post(post, slug, sources, now, report)
    if slug and post_path.stem != slug:
        report.warn(f"post filename {post_path.name} does not match slug; installer will rename it")
    if slug and research_path.stem != slug:
        report.warn(f"research filename {research_path.name} does not match slug; installer will rename it")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--post", required=True, type=Path)
    parser.add_argument("--research", required=True, type=Path)
    parser.add_argument("--now", help="ISO-8601 validation time for deterministic tests")
    args = parser.parse_args()
    report = Report()
    now = parse_time(args.now, "--now", report) if args.now else datetime.now(timezone.utc)
    if report.errors or now is None:
        for message in report.errors:
            print(f"ERROR: {message}")
        return 1
    report = validate(args.post, args.research, now)
    for message in report.warnings:
        print(f"WARNING: {message}")
    for message in report.errors:
        print(f"ERROR: {message}")
    if report.errors:
        print(f"FAILED: {len(report.errors)} error(s), {len(report.warnings)} warning(s)")
        return 1
    print(f"VALID: 0 errors, {len(report.warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
