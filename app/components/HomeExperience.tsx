"use client";

import { useMemo } from "react";
import type { GuidePost } from "@/lib/content";
import { localizePost } from "@/lib/content";
import { GuideCard } from "./GuideCard";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

export function HomeExperience({ posts }: { posts: GuidePost[] }) {
  const [locale, changeLocale] = useLocale();
  const localized = useMemo(() => posts.map((post) => localizePost(post, locale)), [posts, locale]);

  return (
    <main className="home-page">
      <SiteHeader locale={locale} onLocaleChange={changeLocale} />
      <section className="content-stream shell" aria-live="polite">
        {localized.map((post, index) => <GuideCard key={post.slug} post={post} locale={locale} index={index} variant={index === 0 ? "lead" : index === 3 ? "wide" : "standard"} />)}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
