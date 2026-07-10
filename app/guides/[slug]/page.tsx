import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getSiteSettings } from "@/lib/data";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

export const dynamic = "force-dynamic";

export default async function GuideDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]); if (!post) notFound();
  return <main><SiteHeader tripUrl={settings.trip_cta_url} /><article className="article-shell shell"><Link href="/guides" className="back-link">← 返回全部路线</Link><header className="article-header"><div><span className="kicker">{post.category} / {post.destination}</span><h1>{post.title}</h1><p>{post.excerpt}</p></div><div className={`article-poster ${post.color}`}><span>{post.destination}</span><strong>{post.duration}</strong><i>ROAM<br />INSIDER</i></div></header><div className="article-facts"><div><small>适合时间</small><b>{post.season}</b></div><div><small>建议天数</small><b>{post.duration}</b></div><div><small>预算参考</small><b>{post.budget}</b></div><a href={settings.trip_cta_url} target="_blank" rel="noreferrer">在 Trip 查看选择 ↗</a></div><div className="article-body">{post.content.split("\n").map((part, index) => part ? (part.includes("｜") ? <h2 key={index}>{part}</h2> : <p key={index}>{part}</p>) : <br key={index} />)}</div><aside className="article-cta"><span>读到这里，已经比昨天更接近出发。</span><a className="button button-primary" href={settings.trip_cta_url} target="_blank" rel="noreferrer">去 Trip 看实时选择 ↗</a></aside></article><SiteFooter /></main>;
}
