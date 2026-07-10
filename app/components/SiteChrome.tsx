import Link from "next/link";

export function SiteHeader({ tripUrl }: { tripUrl?: string }) {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Roam Insider 首页"><span>ROAM</span><span>INSIDER</span></Link>
      <nav aria-label="主导航"><Link href="/guides">目的地</Link><Link href="/#plan">帮我选路线</Link><Link href="/about">关于我们</Link></nav>
      <a className="trip-link" href={tripUrl || "https://www.trip.com/"} target="_blank" rel="noreferrer">前往 Trip <span>↗</span></a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><div className="brand footer-brand"><span>ROAM</span><span>INSIDER</span></div><p>为下一次出发，提供少而准确的答案。</p></div>
        <div><b>探索</b><Link href="/guides">全部路线</Link><Link href="/#plan">路线诊断</Link><Link href="/about">关于我们</Link></div>
        <div><b>运营</b><Link href="/admin">内容后台</Link><a href="mailto:hello@roaminsider.com">联系我们</a></div>
        <div className="footer-mark">去<br />远<br />一点<span>↗</span></div>
      </div>
      <div className="shell copyright"><span>© 2026 ROAM INSIDER</span><span>Made for people who still look out of train windows.</span></div>
    </footer>
  );
}
