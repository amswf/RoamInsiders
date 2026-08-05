# TravelGoGuide bundle schema

Create one public post and one internal evidence file per slug.

## Public post

Path: `content/posts/<slug>.json`

The top level maps locale codes to localized post objects. Daily publishing requires all 11 supported locales; locale fallback is not acceptable for a scheduled post.

```json
{
  "zh-CN": {
    "slug": "destination-specific-angle",
    "title": "Specific, defensible title",
    "excerpt": "One useful promise without hype.",
    "content": "Sections separated by blank lines.",
    "destination": "Destination",
    "duration": "3天2夜",
    "budget": "按2026-08-05核验的参考区间",
    "season": "Season with caveat",
    "category": "Practical category",
    "contentType": "guide",
    "imageUrl": "https://...",
    "imageAlt": "Literal description",
    "status": "published",
    "featured": false,
    "ctaPlatform": "trip",
    "ctaLabel": "Check current options",
    "ctaUrl": "",
    "couponCode": "",
    "priceLabel": "Current prices may change",
    "updatedAt": "2026-08-05",
    "verifiedAt": "2026-08-05T01:30:00Z",
    "sources": [
      {
        "title": "Official page title",
        "publisher": "Authority name",
        "url": "https://...",
        "accessedAt": "2026-08-05"
      }
    ]
  },
  "en": {}
}
```

Allowed values:

- locale: `zh-CN`, `zh-TW`, `en`, `id`, `th`, `vi`, `ms`, `fil`, `km`, `lo`, `my`
- `contentType`: `route`, `deal`, `coupon`, `guide`
- `status`: `draft`, `published`
- `ctaPlatform`: `trip`, `traveloka`, `custom`

Keep the same slug, operational facts, timestamps, URLs, publication status, and source set across all 11 translations.

## Editorial structure

- Title: one concrete idea, normally destination + time/duration + reader problem. It must work without the excerpt.
- Excerpt: one plain-language outcome, not a restatement of the title.
- Content: at least five blank-line-separated sections. Start each section with a short descriptive heading on its own line; use the full-width separator `｜` so the current renderer displays it as a heading in every locale.
- Recommended order: `why now` → `plan at a glance` → `steps` → `fallbacks and risks` → `final checklist`.
- Paragraphs: one main idea each, with the decision or action before supporting detail.
- Translation: facts and section order stay aligned, but sentence structure and idiom must be rewritten naturally for each locale. Never use locale fallback for a published daily post.

## Evidence bundle

Path: `content/research/<slug>.json`. This file is an editorial audit trail and is not rendered publicly.

```json
{
  "schemaVersion": 1,
  "slug": "destination-specific-angle",
  "destination": "Destination",
  "researchedAt": "2026-08-05T01:30:00Z",
  "audience": "Mainland Chinese independent travelers",
  "topicDecision": {
    "angle": "The reader problem being solved",
    "reason": "Why this qualified today",
    "trendSignals": [
      {
        "description": "Dated, bounded signal—not a universal popularity claim",
        "checkedAt": "2026-08-05T01:00:00Z",
        "sourceIds": ["s1"]
      },
      {
        "description": "Independent second signal",
        "checkedAt": "2026-08-05T01:05:00Z",
        "sourceIds": ["s2"]
      }
    ]
  },
  "sources": [
    {
      "id": "s1",
      "title": "Page title",
      "publisher": "Publisher",
      "url": "https://...",
      "sourceType": "official",
      "publishedAt": "2026-08-01",
      "accessedAt": "2026-08-05T01:00:00Z"
    }
  ],
  "claims": [
    {
      "id": "c1",
      "text": "One atomic fact as used in the post",
      "category": "hours",
      "volatility": "high",
      "checkedAt": "2026-08-05T01:10:00Z",
      "sourceIds": ["s1"],
      "usedInPost": true
    }
  ],
  "conflicts": [],
  "image": {
    "landingPageUrl": "https://...",
    "creator": "Creator or owner",
    "usageBasis": "Unsplash License / CC BY 4.0 / owned / permission"
  },
  "editorNotes": "Limits, assumptions, and follow-up checks"
}
```

Claim categories: `safety`, `entry`, `transport`, `hours`, `price`, `event`, `weather`, `seasonality`, `geography`, `culture`, `other`.

Volatility: `critical`, `high`, `medium`, `low`. Entry and safety claims must be `critical`; transport, hours, price, and event claims must be `high` unless they explicitly describe an enduring system rather than a current operation.

## Installation and deployment

- Install post JSON to `content/posts` and evidence JSON to `content/research`.
- `npm run lint` and `npm run build` must pass.
- Pushes to `main` preserve the reviewed source state but are not the production release when the custom domain uses the self-hosted Nginx server.
- Build locally, upload `out/` to a new `/data/travelgoguide/releases/<unique-release>/` directory, validate it, then atomically switch `/data/travelgoguide/current`.
- Keep the prior release intact for rollback and keep the private SSH origin out of the public repository.
- The expected live URL is `https://travelgoguide.com/guides/<slug>/`.
