import { getSiteSettings } from "@/lib/data";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const dynamic = "force-dynamic";
export const metadata = { title: "关于我们｜Roam Insider" };

export default async function AboutPage() { const settings = await getSiteSettings(); return <main><SiteHeader tripUrl={settings.trip_cta_url} /><section className="about-hero shell"><span className="kicker">ABOUT / 关于</span><h1>我们相信，好的旅行建议，<br />应该让你更轻松，<em>不是更焦虑。</em></h1></section><section className="about-story shell"><div><span>OUR POINT OF VIEW</span></div><div><p className="lead-paragraph">互联网上不缺攻略。缺的是有人替你判断：哪些真的值得，哪些只是顺路，哪些删掉反而会更开心。</p><p>Roam Insider 从真实的旅行节奏出发，先做减法，再给选择。我们不追求一天走两万步，也不把收藏夹当作待办清单。</p><p>首发阶段，我们专注于短途城市旅行和亚洲慢旅行。每条内容都要回答三个问题：为什么去、怎么走、现在如何订。</p><div className="signature">ROAM, BUT KNOW.</div></div></section><SiteFooter /></main>; }
