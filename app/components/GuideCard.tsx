import Link from "next/link";
import type { Locale, LocalizedPost } from "@/lib/content";
import { contentTypeLabel, copy, withLocale } from "@/lib/i18n";

export function GuideCard({ post, locale, variant = "standard", index }: { post: LocalizedPost; locale: Locale; variant?: "lead" | "wide" | "standard"; index: number }) {
  const t = copy[locale];
  return (
    <article className={`feed-card ${variant}`}>
      <Link className={`feed-image ${post.imageUrl ? "has-image" : ""}`} href={withLocale(`/guides/${post.slug}`, locale)} style={post.imageUrl ? { backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(10,20,17,.35)), url("${post.imageUrl}")` } : undefined} aria-label={post.imageAlt || post.title}>
        <span className="issue-number">{String(index + 1).padStart(2, "0")}</span>
        <span className={`type-pill type-${post.contentType}`}>{contentTypeLabel(locale, post.contentType)}</span>
        {post.priceLabel ? <strong className="price-label">{post.priceLabel}</strong> : null}
      </Link>
      <div className="feed-copy">
        <div className="feed-meta"><span>{post.destination}</span><span>{post.category}</span><time>{post.updatedAt}</time></div>
        <h2><Link href={withLocale(`/guides/${post.slug}`, locale)}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <div className="feed-card-footer">
          <span>{post.ctaPlatform === "traveloka" ? "Traveloka" : post.ctaPlatform === "trip" ? "Trip.com" : t.editorial}</span>
          <Link href={withLocale(`/guides/${post.slug}`, locale)}>{t.read} <b>↗</b></Link>
        </div>
      </div>
    </article>
  );
}
