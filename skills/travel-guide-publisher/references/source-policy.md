# Travel fact and source policy

## Source hierarchy

Use the source closest to the fact.

1. `official`: government, embassy/consulate, immigration authority, tourism authority, public-health authority, airport, public transit operator, attraction, park, museum, or event organizer.
2. `primary`: a business's own current booking page, tariff, timetable, terms, press release, or verified venue page.
3. `reputable-secondary`: established reporting or specialist reference material with a visible author, publication date, and correction standards.
4. `commercial`: booking platforms, market reports, deal pages, creator posts, and aggregators. Use these for demand signals or discovery, not as the sole authority for entry, safety, public transport, or public-site rules.

Search snippets, AI summaries, copied listicles, anonymous posts, and undated social posts are discovery leads, not evidence.

## Freshness by claim type

Measure age from the claim's `checkedAt` timestamp.

| Volatility | Typical facts | Maximum age | Required source |
| --- | --- | ---: | --- |
| critical | entry/visa rules, official safety or health restrictions, emergency closures | 3 days | official |
| high | opening hours, fares, schedules, event dates, active deals, current prices | 7 days | official or primary |
| medium | seasonal access, route availability, neighborhood logistics | 30 days | official/primary preferred; reputable secondary allowed with corroboration |
| low | geography, enduring history, established cultural context | 365 days | one authoritative source |

Use the stricter class when uncertain. Recheck a fact on publication day even if a cached page still falls inside the age window.

## Corroboration rules

- Support each material claim with at least one source.
- Support safety-sensitive or consequential recommendations with two sources when possible, including one official source.
- Support a “popular,” “trending,” or “surging” premise with at least two signals from different domains. A single tourism-board campaign is not independent demand evidence.
- Do not treat multiple pages that repeat the same press release or dataset as independent confirmation.
- Record conflicts. Prefer authority first, then recency, then specificity. Omit unresolved operational details.

## Writing truthfully

- Never imply personal travel, booking, testing, or inspection unless the user supplied that firsthand evidence.
- Describe recommendations as editorial judgments: “适合…”, “可以考虑…”, or “based on these constraints…”.
- Attribute claims whose interpretation matters.
- Give a verified-on date next to prices, deals, schedules, and entry rules.
- State the traveler nationality/residency assumptions behind entry guidance. Link to the official checker and tell readers to verify their own eligibility.
- Use climate normals for seasonal descriptions and current forecasts only for near-term travel.
- Avoid false precision. Use ranges only when the endpoints are supported and comparable.
- For affiliate links, keep editorial selection independent and retain the site's disclosure.

## Images

- Use owned, licensed, public-domain, Creative Commons-compatible, or approved stock assets.
- Record the image landing-page URL, creator/owner, and license or usage basis in `research.json`.
- Write literal alt text. Do not identify a place more specifically than the source supports.

## Failure behavior

If evidence is missing, say “not verified” in the internal report and omit the claim. Do not fill gaps from memory. If a core claim fails, do not publish the article.
