"use client";

import { useMemo } from "react";
import type { GuidePost, SiteSettings } from "@/lib/content";
import { localizePost } from "@/lib/content";
import { copy } from "@/lib/i18n";
import { GuideCard } from "./GuideCard";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

export function GuidesExperience({ posts, settings }: { posts: GuidePost[]; settings: SiteSettings }) {
  const [locale, changeLocale] = useLocale();
  const t = copy[locale];
  const localized = useMemo(() => posts.map((post) => localizePost(post, locale)), [posts, locale]);
  return <main><div className="announcement"><span>{settings.announcements[locale] || settings.announcements.en}</span><i />{t.latest}</div><SiteHeader locale={locale} onLocaleChange={changeLocale} /><section className="page-intro shell"><span className="eyebrow">ARCHIVE / {String(localized.length).padStart(2, "0")}</span><h1>{t.guidesTitle}</h1><p>{t.guidesIntro}</p></section><section className="content-stream archive-stream shell">{localized.map((post, index) => <GuideCard key={post.slug} post={post} locale={locale} index={index} variant={index % 4 === 0 ? "wide" : "standard"} />)}</section><SiteFooter locale={locale} /></main>;
}
