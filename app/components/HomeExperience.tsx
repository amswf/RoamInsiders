"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import type { ContentType, GuidePost, SiteSettings } from "@/lib/content";
import { localizePost } from "@/lib/content";
import { contentTypeLabel, copy, withLocale } from "@/lib/i18n";
import { GuideCard } from "./GuideCard";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

type Filter = "all" | ContentType;

function getFilterSnapshot(): Filter {
  const value = new URLSearchParams(window.location.search).get("type");
  return ["route", "deal", "coupon", "guide"].includes(value || "") ? value as Filter : "all";
}

function getServerFilterSnapshot(): Filter {
  return "all";
}

function subscribeFilter(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("travelgoguide:filter", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("travelgoguide:filter", callback);
  };
}

export function HomeExperience({ posts, settings }: { posts: GuidePost[]; settings: SiteSettings }) {
  const [locale, changeLocale] = useLocale();
  const filter = useSyncExternalStore(subscribeFilter, getFilterSnapshot, getServerFilterSnapshot);
  const t = copy[locale];

  const localized = useMemo(() => posts.map((post) => localizePost(post, locale)), [posts, locale]);
  const visible = filter === "all" ? localized : localized.filter((post) => post.contentType === filter);
  const filters: Filter[] = ["all", "route", "deal", "coupon", "guide"];

  function chooseFilter(next: Filter) {
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("type"); else url.searchParams.set("type", next);
    window.history.replaceState({}, "", url);
    window.dispatchEvent(new Event("travelgoguide:filter"));
  }

  return (
    <main className="home-page">
      <div className="announcement"><span>{settings.announcements[locale] || settings.announcements.en}</span><i />{t.latest}</div>
      <SiteHeader locale={locale} onLocaleChange={changeLocale} />
      <section className="feed-intro shell">
        <div><span className="eyebrow">{t.feedEyebrow}</span><h1>{t.feedTitle}</h1></div>
        <div className="feed-intro-note"><p>{t.feedIntro}</p><Link href={withLocale("/about", locale)}>TRAVELGOGUIDE <span>↗</span></Link></div>
      </section>
      <section className="filter-rail shell" aria-label="Content filters">
        <span className="filter-label">INDEX / 01—05</span>
        <div>{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => chooseFilter(item)}>{item === "all" ? t.all : contentTypeLabel(locale, item)}</button>)}</div>
        <span className="story-count">{String(visible.length).padStart(2, "0")} STORIES</span>
      </section>
      <section className="content-stream shell" aria-live="polite">
        {visible.map((post, index) => <GuideCard key={post.slug} post={post} locale={locale} index={index} variant={index === 0 ? "lead" : index === 3 ? "wide" : "standard"} />)}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
