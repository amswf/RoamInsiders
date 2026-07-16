"use client";

import Link from "next/link";
import { getLegalDocument, legalLabels, type LegalKind } from "@/lib/legal-content";
import { withLocale } from "@/lib/i18n";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { useLocale } from "./useLocale";

export function LegalExperience({ kind }: { kind: LegalKind }) {
  const [locale, changeLocale] = useLocale();
  const labels = legalLabels[locale];
  const { document, translated } = getLegalDocument(locale, kind);

  return (
    <main>
      <SiteHeader locale={locale} onLocaleChange={changeLocale} />
      <section className="legal-hero shell">
        <span className="eyebrow">TRAVELGO / LEGAL</span>
        <h1>{kind === "privacy" ? labels.privacy : labels.terms}</h1>
        <p>{document.intro}</p>
        <small>{labels.effective}: 16 July 2026</small>
      </section>
      <div className="legal-layout shell">
        <aside className="legal-nav">
          <b>{labels.contents}</b>
          <Link className={kind === "privacy" ? "active" : ""} href={withLocale("/privacy/", locale)}>{labels.privacy}</Link>
          <Link className={kind === "terms" ? "active" : ""} href={withLocale("/terms/", locale)}>{labels.terms}</Link>
        </aside>
        <article className="legal-content">
          {!translated && <p className="legal-fallback">{labels.fallback}</p>}
          {document.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        </article>
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}
