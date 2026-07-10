import Link from "next/link";
import type { GuidePost } from "@/lib/content";

export function GuideCard({ post, index }: { post: GuidePost; index: number }) {
  return (
    <article className="guide-card">
      <Link href={`/guides/${post.slug}`} className={`guide-cover ${post.color}`}>
        <span className="guide-index">0{index}</span><span className="guide-category">{post.category}</span>
        <div className="cover-landscape"><i /><i /><i /></div>
        <strong>{post.destination}</strong><small>{post.duration}</small>
      </Link>
      <div className="guide-meta"><span>{post.season}</span><span>{post.budget}</span></div>
      <h3><Link href={`/guides/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <Link className="card-link" href={`/guides/${post.slug}`}>打开路线 <span>↗</span></Link>
    </article>
  );
}
