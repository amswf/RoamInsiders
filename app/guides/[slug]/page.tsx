import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetailExperience } from "@/app/components/GuideDetailExperience";
import { locales } from "@/lib/content";
import { getAllPosts, getPostBySlug, getSiteSettings } from "@/lib/static-content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const localized = post.locales["zh-CN"] || post.locales.en;
  if (!localized) return {};
  const canonical = `/guides/${slug}/`;
  const languages = Object.fromEntries([
    ...locales.map((locale) => [locale, `${canonical}?lang=${locale}`]),
    ["x-default", canonical],
  ]);
  return {
    title: localized.title,
    description: localized.excerpt,
    authors: [{ name: "TravelGoGuide Editorial" }],
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "TravelGoGuide",
      title: localized.title,
      description: localized.excerpt,
      publishedTime: localized.updatedAt,
      modifiedTime: localized.updatedAt,
      images: localized.imageUrl ? [{ url: localized.imageUrl, alt: localized.imageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.excerpt,
      images: localized.imageUrl ? [localized.imageUrl] : [],
    },
  };
}

export default async function GuideDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const localized = post.locales["zh-CN"] || post.locales.en;
  const schema = localized ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: localized.title,
    description: localized.excerpt,
    image: localized.imageUrl ? [localized.imageUrl] : undefined,
    datePublished: localized.updatedAt,
    dateModified: localized.updatedAt,
    inLanguage: "zh-CN",
    mainEntityOfPage: `https://travelgoguide.com/guides/${slug}/`,
    author: { "@type": "Organization", name: "TravelGoGuide Editorial" },
    publisher: { "@type": "Organization", name: "TravelGoGuide", url: "https://travelgoguide.com/" },
    isAccessibleForFree: true,
  } : null;
  return <>
    {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /> : null}
    <GuideDetailExperience post={post} settings={getSiteSettings()} />
  </>;
}
