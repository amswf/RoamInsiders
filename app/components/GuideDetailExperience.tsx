"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { GuidePost, SiteSettings } from "@/lib/content";
import { localizePost, resolveCta, safeExternalUrl } from "@/lib/content";
import { contentTypeLabel, copy, withLocale } from "@/lib/i18n";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

function paragraphs(content: string) {
  return content.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const lines = block.split("\n");
    const first = lines[0];
    if (first.includes("｜") || /^(Day|Hari|\d{2})\b/.test(first)) {
      return <section className="story-section" key={index}><h2>{first}</h2>{lines.slice(1).map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}</section>;
    }
    return <p key={index}>{block}</p>;
  });
}

function sourceDate(value: string, fallback: string) {
  return value ? value.slice(0, 10) : fallback;
}

export function GuideDetailExperience({ post, settings }: { post: GuidePost; settings: SiteSettings }) {
  const [locale, changeLocale] = useLocale();
  const localized = localizePost(post, locale);
  const t = copy[locale];
  const platform = localized.ctaPlatform === "traveloka" ? "Traveloka" : localized.ctaPlatform === "trip" ? "Trip.com" : t.bookingVia;
  const defaultLabel = localized.ctaPlatform === "traveloka" ? t.openTraveloka : localized.ctaPlatform === "trip" ? t.openTrip : t.openCustom;
  const ctaLabel = localized.ctaLabel || defaultLabel;
  const ctaUrl = safeExternalUrl(resolveCta(localized, settings));

  useEffect(() => {
    document.documentElement.lang = localized.resolvedLocale;
    document.title = `${localized.title}｜TravelGoGuide`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = localized.excerpt;
  }, [localized.excerpt, localized.resolvedLocale, localized.title]);

  return (
    <main className="detail-page">
      <SiteHeader locale={locale} onLocaleChange={changeLocale} />
      <article>
        <header className="story-hero shell">
          <Link className="back-link" href={withLocale("/", locale)}>← {t.back}</Link>
          <div className="story-hero-grid">
            <div className="story-heading"><div className="story-kicker"><span>{contentTypeLabel(locale, localized.contentType)}</span><span>{localized.category}</span><span>{localized.updatedAt}</span></div><h1>{localized.title}</h1><p>{localized.excerpt}</p>{localized.resolvedLocale !== locale ? <div className="translation-note">{t.fallback}</div> : null}</div>
            <div className="story-photo" role="img" aria-label={localized.imageAlt} style={localized.imageUrl ? { backgroundImage: `url("${localized.imageUrl}")` } : undefined}><span>{localized.destination}</span><b>TRAVELGO / {localized.contentType.toUpperCase()}</b></div>
          </div>
        </header>
        <section className="fact-strip shell">
          <div><small>{t.duration}</small><strong>{localized.duration || "—"}</strong></div>
          <div><small>{t.season}</small><strong>{localized.season || "—"}</strong></div>
          <div><small>{t.budget}</small><strong>{localized.budget || "—"}</strong></div>
          <div><small>{t.bookingVia}</small><strong>{platform}</strong></div>
        </section>
        <div className="story-layout shell">
          <aside className="story-index"><span>TRAVELGO NOTE</span><b>{localized.destination}</b><p>{localized.priceLabel}</p></aside>
          <div className="story-body">{paragraphs(localized.content)}{localized.contentType === "coupon" ? <div className="coupon-box"><span>{t.couponCode}</span><strong>{localized.couponCode || t.terms}</strong><a href={ctaUrl} target="_blank" rel="noopener noreferrer">{t.terms} ↗</a></div> : null}{localized.sources.length ? <section className="story-sources"><h2>{t.sources}</h2>{localized.verifiedAt ? <p>{t.verifiedOn}: {sourceDate(localized.verifiedAt, localized.updatedAt)}</p> : null}<ol>{localized.sources.map((source) => <li key={source.url}><a href={safeExternalUrl(source.url)} target="_blank" rel="noopener noreferrer">{source.title}</a><span>{source.publisher}{source.accessedAt ? ` · ${source.accessedAt}` : ""}</span></li>)}</ol></section> : null}<p className="disclosure">{t.disclosure}</p></div>
        </div>
      </article>
      <SiteFooter locale={locale} />
      <aside className="sticky-action" aria-label={ctaLabel}>
        <div><small>{t.bookingVia}</small><strong>{platform}</strong></div>
        <a href={ctaUrl} target="_blank" rel="noopener noreferrer"><span>{ctaLabel}</span><b>↗</b></a>
      </aside>
    </main>
  );
}
