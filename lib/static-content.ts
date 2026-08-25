import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  defaultSettings,
  locales,
  type GuidePost,
  type ContentSource,
  type Locale,
  type PostLocale,
  type SiteSettings,
} from "./content";

const contentRoot = join(process.cwd(), "content");

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeSources(value: unknown): ContentSource[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((source) => {
    if (!isRecord(source) || !source.title || !source.url) return [];
    return [{
      title: String(source.title),
      publisher: String(source.publisher || ""),
      url: String(source.url),
      accessedAt: String(source.accessedAt || ""),
    }];
  });
}

function normalizePostLocale(value: unknown, slug: string): PostLocale | null {
  if (!isRecord(value) || !value.title) return null;
  return {
    slug,
    title: String(value.title),
    excerpt: String(value.excerpt || ""),
    content: String(value.content || ""),
    destination: String(value.destination || ""),
    airportCode: String(value.airportCode || "").toUpperCase().slice(0, 3),
    duration: String(value.duration || ""),
    budget: String(value.budget || ""),
    season: String(value.season || ""),
    category: String(value.category || "Travel"),
    contentType: ["route", "deal", "coupon", "guide"].includes(String(value.contentType))
      ? (String(value.contentType) as PostLocale["contentType"])
      : "guide",
    imageUrl: String(value.imageUrl || ""),
    imageAlt: String(value.imageAlt || value.destination || value.title),
    status: value.status === "draft" ? "draft" : "published",
    featured: Boolean(value.featured),
    ctaPlatform: ["trip", "traveloka", "custom"].includes(String(value.ctaPlatform))
      ? (String(value.ctaPlatform) as PostLocale["ctaPlatform"])
      : "trip",
    ctaLabel: String(value.ctaLabel || ""),
    ctaUrl: String(value.ctaUrl || ""),
    ticketUrl: String(value.ticketUrl || ""),
    couponCode: String(value.couponCode || ""),
    priceLabel: String(value.priceLabel || ""),
    updatedAt: String(value.updatedAt || "2026-07-13"),
    verifiedAt: String(value.verifiedAt || ""),
    sources: normalizeSources(value.sources),
  };
}

export function getAllPosts(): GuidePost[] {
  const folder = join(contentRoot, "posts");
  return readdirSync(folder)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(readFileSync(join(folder, file), "utf8")) as Record<string, unknown>;
      const fallbackRaw = raw["zh-CN"] || raw.en;
      const fallbackSlug = isRecord(fallbackRaw) && fallbackRaw.slug
        ? String(fallbackRaw.slug)
        : file.replace(/\.json$/, "");
      const translated = Object.fromEntries(
        locales.flatMap((locale) => {
          const normalized = normalizePostLocale(raw[locale], fallbackSlug);
          return normalized ? [[locale, normalized]] : [];
        }),
      ) as Partial<Record<Locale, PostLocale>>;
      return { slug: fallbackSlug, locales: translated };
    })
    .filter((post) => post.locales["zh-CN"]?.status === "published" || post.locales.en?.status === "published")
    .sort((a, b) => {
      const left = a.locales["zh-CN"] || a.locales.en;
      const right = b.locales["zh-CN"] || b.locales.en;
      return Number(Boolean(right?.featured)) - Number(Boolean(left?.featured)) || String(right?.updatedAt).localeCompare(String(left?.updatedAt));
    });
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getSiteSettings(): SiteSettings {
  try {
    const raw = JSON.parse(readFileSync(join(contentRoot, "settings", "site.json"), "utf8")) as SiteSettings;
    return {
      tripUrl: raw.tripUrl || defaultSettings.tripUrl,
      travelokaUrl: raw.travelokaUrl || defaultSettings.travelokaUrl,
      announcements: { ...defaultSettings.announcements, ...(raw.announcements || {}) },
    };
  } catch {
    return defaultSettings;
  }
}
