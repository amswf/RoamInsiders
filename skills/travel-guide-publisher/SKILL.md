---
name: travel-guide-publisher
description: Research current travel trends, verify destination facts against dated sources, write multilingual TravelGoGuide articles, and publish validated content to travelgoguide.com through the RoamInsiders repository. Use for daily travel-topic research, destination selection, itinerary or booking-guide writing, fact checking, creating content/posts JSON, maintaining evidence bundles, or publishing and verifying TravelGoGuide content.
---

# Travel Guide Publisher

Produce useful travel content from evidence, not memory. Treat every travel fact as time-sensitive until proven otherwise.

## Start here

1. Locate the `RoamInsiders` repository. Confirm it contains `content/posts`, `lib/static-content.ts`, and the `travelgoguide.com` deployment workflow.
2. Read [references/source-policy.md](references/source-policy.md) before researching.
3. Read [references/travelgoguide-schema.md](references/travelgoguide-schema.md) before creating files or publishing.
4. Determine the requested mode:
   - `research`: return the ranked topic shortlist and evidence only.
   - `draft`: research, write, validate, and install a post with `status: draft`; do not push.
   - `publish`: complete the entire workflow, push the validated post, and verify the live page.
   - For a scheduled daily run, use `publish` unless the automation prompt explicitly requests drafts.

## Daily workflow

### 1. Check the existing content inventory

- Read recent files in `content/posts` and avoid repeating the same destination, angle, or advice.
- Prefer a useful reader question over a generic destination overview.
- Record today's date and the intended audience, origin market, travel window, currency, and language.

### 2. Find current topic candidates

- Browse the web; do not select trends from model memory.
- Collect at least three candidates and rank them by current interest, reader usefulness, evidence quality, seasonality, and fit with TravelGoGuide's Asia focus.
- Require at least two recent signals from different publishers or domains before calling a destination popular or trending.
- Distinguish search interest, booking demand, new access, event interest, and editorial hype. State which signal is actually present.
- Reject topics whose core facts cannot be verified from accessible sources.

### 3. Build the evidence bundle before drafting

- Create a temporary working directory under `work/travel-guide/YYYY-MM-DD-slug/`.
- Write `research.json` using the schema in [references/travelgoguide-schema.md](references/travelgoguide-schema.md).
- Prefer government, tourism authority, airport, transit operator, attraction, and event-organizer pages for operational facts.
- For every material claim, record its exact wording, category, volatility, checked time, and supporting source IDs.
- Resolve source conflicts explicitly. Use the more authoritative and more recent source; if a material conflict remains, omit the claim or clearly describe the uncertainty.
- Never infer opening hours, entry eligibility, safety, fares, schedules, coupon validity, or accessibility from an undated snippet.

### 4. Write the article

- Create `post.json` only after the evidence bundle is complete.
- Publish all 11 supported locales: `zh-CN`, `zh-TW`, `en`, `id`, `th`, `vi`, `ms`, `fil`, `km`, `lo`, and `my`. A scheduled daily run must not rely on locale fallback. Translate meaning, units, and traveler context; do not mechanically mirror awkward phrasing.
- Make the title specific and defensible. Avoid unsupported superlatives such as “best,” “cheapest,” “safest,” or “must visit.”
- Separate verified facts from recommendations and editorial judgment.
- Give exact dates for time-sensitive claims and label prices as checked-on reference prices, with currency and inclusions.
- Mention uncertainty and practical failure modes: closure days, last departures, reservation requirements, weather exposure, mobility barriers, cash/card limits, and holiday effects when relevant.
- Include only sources actually used. Add the article's `verifiedAt` and public `sources` fields.
- Use a lawful image source and accurate alt text. Do not claim that a generic stock image depicts an exact hotel, dish, trail, or current condition.
- Do not copy source wording. Paraphrase facts and keep quotations exceptional and short.

### 5. Validate and install

Run from the skill directory:

```bash
python3 scripts/validate_bundle.py \
  --post /absolute/path/to/post.json \
  --research /absolute/path/to/research.json

python3 scripts/install_bundle.py \
  --repo /absolute/path/to/RoamInsiders \
  --post /absolute/path/to/post.json \
  --research /absolute/path/to/research.json
```

- Fix every validation error. Treat warnings as editorial review items, not noise.
- The install script refuses to overwrite an existing post or evidence file unless `--replace` is passed. Use `--replace` only when the user asked to update that post.
- Run `npm run lint` and `npm run build` after installation.
- Inspect the rendered page or local build when layout, links, or structured fields changed.

### 6. Publish safely

Only perform these steps in `publish` mode:

1. Confirm all 11 supported locales exist and have `status: published`.
2. Inspect `git status` and preserve unrelated user changes.
3. Stage only the new or intentionally updated post, its research file, and any directly required schema/UI changes.
4. Commit with `内容：发布 <destination> <angle>`.
5. Push the current commit to the configured deployment branch. For this repository, `main` triggers GitHub Pages.
6. Wait for the deployment to finish when tooling allows it.
7. Open `https://travelgoguide.com/guides/<slug>/` and verify HTTP success, title, updated date, sources, image, CTA, and absence of obvious rendering errors.

Never stage, commit, overwrite, or revert unrelated changes. Never store GitHub tokens, CMS tokens, or other credentials in the skill, repository, or evidence bundle.

## Publication gate

Do not publish when any of the following is true:

- a material claim has no traceable source;
- safety, entry, transport, opening-hour, price, or event claims fail the freshness rules;
- the topic's “popular” premise has fewer than two independent recent signals;
- sources materially conflict and the uncertainty is hidden;
- the article contains placeholders, invented firsthand experience, fake quotes, or a fabricated test/visit;
- a destination advisory makes the proposed itinerary irresponsible without prominent context;
- the build fails, the CTA is unsafe, or the live page cannot be associated with the committed slug.

In a scheduled run, save a research report or draft and report `not published` instead of weakening this gate.

## Output summary

At the end of every run, report:

- selected topic and why it qualified today;
- researched/verified timestamps and the strongest primary sources;
- locales, slug, and content type created;
- validation and build results;
- whether the post was drafted, committed, pushed, and verified live;
- any volatile facts that need rechecking later.
