export const locales = [
  "zh-CN",
  "zh-TW",
  "en",
  "id",
  "th",
  "vi",
  "ms",
  "fil",
  "km",
  "lo",
  "my",
] as const;

export type Locale = (typeof locales)[number];
export type ContentType = "route" | "deal" | "coupon" | "guide";
export type CtaPlatform = "trip" | "traveloka" | "custom";

export type PostLocale = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  destination: string;
  duration: string;
  budget: string;
  season: string;
  category: string;
  contentType: ContentType;
  imageUrl: string;
  imageAlt: string;
  status: "draft" | "published";
  featured: boolean;
  ctaPlatform: CtaPlatform;
  ctaLabel: string;
  ctaUrl: string;
  couponCode: string;
  priceLabel: string;
  updatedAt: string;
};

export type GuidePost = {
  slug: string;
  locales: Partial<Record<Locale, PostLocale>>;
};

export type LocalizedPost = PostLocale & {
  requestedLocale: Locale;
  resolvedLocale: Locale;
};

export type SiteSettings = {
  tripUrl: string;
  travelokaUrl: string;
  announcements: Partial<Record<Locale, string>>;
};

export const defaultSettings: SiteSettings = {
  tripUrl: "https://www.trip.com/?utm_source=roam-insider&utm_medium=content",
  travelokaUrl: "https://www.traveloka.com/en-en?funnel_source=roam_insider",
  announcements: {
    "zh-CN": "从灵感到预订，每周更新亚洲旅行内容",
    "zh-TW": "從靈感到預訂，每週更新亞洲旅行內容",
    en: "Fresh Asia travel ideas, routes and booking notes every week",
    id: "Ide, rute, dan catatan pemesanan Asia terbaru setiap minggu",
  },
};

export function normalizeLocale(value?: string | null): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "zh-CN";
}

export function localizePost(post: GuidePost, requestedLocale: Locale): LocalizedPost {
  const resolvedLocale = post.locales[requestedLocale]
    ? requestedLocale
    : post.locales.en
      ? "en"
      : "zh-CN";
  const fallback = post.locales[resolvedLocale] || post.locales["zh-CN"];
  if (!fallback) throw new Error(`Post ${post.slug} has no readable locale`);
  return { ...fallback, slug: post.slug, requestedLocale, resolvedLocale };
}

export function resolveCta(post: LocalizedPost, settings: SiteSettings) {
  if (post.ctaUrl) return post.ctaUrl;
  if (post.ctaPlatform === "traveloka") return settings.travelokaUrl;
  return settings.tripUrl;
}

export function safeExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "#";
  } catch {
    return "#";
  }
}
