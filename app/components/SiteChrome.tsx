"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";
import { legalLabels } from "@/lib/legal-content";
import { copy, localeOptions, withLocale } from "@/lib/i18n";

export function SiteHeader({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (locale: Locale) => void }) {
  const t = copy[locale];
  return (
    <header className="site-header shell">
      <Link className="brand brand-header" href={withLocale("/", locale)} aria-label="TravelGoGuide">
        <span className="brand-wordmark"><span>TRAVELGO</span><span>GUIDE</span></span>
        <span className="brand-tagline">世界这么大，带你转一转。</span>
      </Link>
      <div className="header-tools">
        <label className="language-picker">
          <span className="sr-only">{t.language}</span>
          <select value={locale} onChange={(event) => onLocaleChange(event.target.value as Locale)} aria-label={t.language}>
            {localeOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
          </select>
        </label>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const legal = legalLabels[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div><div className="brand footer-brand"><span>TRAVELGO</span><span>GUIDE</span></div><p>{t.footer}</p></div>
        <div className="footer-index"><span>01</span><Link href={withLocale("/", locale)}>{t.discover}</Link><span>02</span><Link href={withLocale("/guides", locale)}>{t.exploreAll}</Link><span>03</span><Link href={withLocale("/about", locale)}>{t.about}</Link><span>04</span><Link href={withLocale("/privacy/", locale)}>{legal.privacy}</Link><span>05</span><Link href={withLocale("/terms/", locale)}>{legal.terms}</Link></div>
      </div>
      <div className="shell copyright"><span>© 2026 TRAVELGOGUIDE</span><span>{t.editorial}</span></div>
    </footer>
  );
}
