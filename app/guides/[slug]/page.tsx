import { notFound } from "next/navigation";
import { GuideDetailExperience } from "@/app/components/GuideDetailExperience";
import { getAllPosts, getPostBySlug, getSiteSettings } from "@/lib/static-content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export default async function GuideDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <GuideDetailExperience post={post} settings={getSiteSettings()} />;
}
