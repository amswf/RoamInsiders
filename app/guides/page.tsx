import { getPublishedPosts, getSiteSettings } from "@/lib/data";
import { GuideCard } from "../components/GuideCard";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const dynamic = "force-dynamic";
export const metadata = { title: "旅行路线｜Roam Insider", description: "少而准确的旅行路线，读完就能出发。" };

export default async function GuidesPage() {
  const [posts, settings] = await Promise.all([getPublishedPosts(), getSiteSettings()]);
  return <main><SiteHeader tripUrl={settings.trip_cta_url} /><section className="page-hero shell"><span className="kicker">DESTINATIONS / 目的地</span><h1>先选一种感觉，<br />再决定去哪里。</h1><p>所有路线都经过减法：更少换酒店、更少无效移动，也更少回程后的疲惫。</p></section><section className="section shell"><div className="guide-grid guide-grid-all">{posts.map((post, index) => <GuideCard key={post.id} post={post} index={index + 1} />)}</div></section><SiteFooter /></main>;
}
