"use client";

import type { SiteSettings } from "@/lib/content";
import { copy } from "@/lib/i18n";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

export function AboutExperience({ settings }: { settings: SiteSettings }) {
  const [locale, changeLocale] = useLocale();
  const t = copy[locale];
  return <main><div className="announcement"><span>{settings.announcements[locale] || settings.announcements.en}</span><i />{t.latest}</div><SiteHeader locale={locale} onLocaleChange={changeLocale} /><section className="about-page shell"><span className="eyebrow">ROAM / POINT OF VIEW</span><h1>{t.aboutTitle}</h1><div className="about-grid"><b>01—03</b><div><p className="about-lead">{t.aboutLead}</p><p>{t.aboutBody}</p><p className="about-signature">READ. DECIDE. ROAM.</p></div></div></section><SiteFooter locale={locale} /></main>;
}
