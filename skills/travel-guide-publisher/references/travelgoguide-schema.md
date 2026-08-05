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
- The repository's GitHub Pages workflow deploys pushes to `main`.
- The expected live URL is `https://travelgoguide.com/guides/<slug>/`.
