import Link from "next/link";
import { getPublishedPosts, getSiteSettings } from "@/lib/data";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { LeadForm, NewsletterForm } from "./components/LeadForms";
import { GuideCard } from "./components/GuideCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, settings] = await Promise.all([getPublishedPosts(), getSiteSettings()]);
  const featured = posts.filter((post) => post.featured).slice(0, 3);

  return (
    <main>
      <div className="announcement">{settings.site_announcement}</div>
      <SiteHeader tripUrl={settings.trip_cta_url} />

      <section className="hero shell">
        <div className="hero-copy reveal">
          <div className="eyebrow">ROAM INSIDER · 漫游内行</div>
          <h1>旅行不用做满攻略。<br /><em>只要选对下一站。</em></h1>
          <p className="hero-intro">为想出发、却不想被攻略淹没的人，筛选真正值得走的路线。少一点打卡，多一点记得住的时刻。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plan">帮我选路线 <span>↗</span></a>
            <Link className="text-link" href="/guides">先看看灵感 <span>→</span></Link>
          </div>
          <div className="trust-row">
            <span><b>03</b> 首发路线</span><i />
            <span><b>10 min</b> 读完就能订</span><i />
            <span><b>0</b> 复制粘贴攻略</span>
          </div>
        </div>

        <div className="hero-art reveal delay-1" aria-label="三张旅行目的地明信片">
          <div className="sun-orbit"><span /></div>
          <div className="postcard card-one"><small>WEEKEND 01</small><strong>山里<br />醒来</strong><span>莫干山 · 48h</span></div>
          <div className="postcard card-two"><small>CITY 02</small><strong>清晨<br />京都</strong><span>四日 · 慢行</span></div>
          <div className="postcard card-three"><small>SLOW 03</small><strong>北纬<br />18°</strong><span>清迈 · 五日</span></div>
          <div className="stamp">GO<br />SLOW</div>
        </div>
      </section>

      <section className="marquee" aria-label="Roam Insider values">
        <div>真实体验 <span>✦</span> 不赶路 <span>✦</span> 住得舒服 <span>✦</span> 预算透明 <span>✦</span> 随时出发 <span>✦</span></div>
      </section>

      <section className="section shell" id="guides">
        <div className="section-heading split-heading">
          <div><span className="kicker">01 / 本期精选</span><h2>三条路线，<br />三种离开日常的方法。</h2></div>
          <p>我们先替你删掉不必要的行程，保留值得起早、值得绕路，也值得坐下来慢慢感受的部分。</p>
        </div>
        <div className="guide-grid">
          {featured.map((post, index) => <GuideCard key={post.id} post={post} index={index + 1} />)}
        </div>
        <div className="center-action"><Link className="button button-outline" href="/guides">查看全部路线 <span>→</span></Link></div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-grid">
          <div className="manifesto-title"><span className="kicker light">02 / 为什么是我们</span><h2>不是更多信息，<br />是更少犹豫。</h2></div>
          <div className="principles">
            <article><b>01</b><div><h3>先做减法</h3><p>每天只留一个重点。你不需要证明自己来过，只需要真的在场。</p></div></article>
            <article><b>02</b><div><h3>说清预算</h3><p>从交通到住处，用真实区间帮助你判断，而不是用“丰俭由人”敷衍。</p></div></article>
            <article><b>03</b><div><h3>最后一步也陪你</h3><p>灵感之后，直接去 Trip 查看实时选择，把“以后再说”变成“现在就订”。</p></div></article>
          </div>
        </div>
      </section>

      <section className="planner-section shell" id="plan">
        <div className="planner-copy">
          <span className="kicker">03 / 路线诊断</span>
          <h2>告诉我们你想怎么走，<br />我们替你缩小答案。</h2>
          <p>留下四个信息，我们会按时间、预算和旅行偏好给你一条更适合的出发建议。</p>
          <div className="planner-note"><span>↳</span><p><b>不是销售电话。</b><br />首发阶段，我们会认真读每一条需求。</p></div>
        </div>
        <LeadForm />
      </section>

      <section className="newsletter">
        <div className="shell newsletter-inner">
          <div><span className="eyebrow">THE SUNDAY NOTE</span><h2>每两周，一封让你想出发的信。</h2></div>
          <NewsletterForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
