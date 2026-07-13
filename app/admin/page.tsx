import Script from "next/script";

export const metadata = {
  title: "内容后台",
  robots: { index: false, follow: false },
};

export default function ContentStudioPage() {
  return (
    <main className="cms-loading">
      <div><span>TRAVELGO / CONTENT STUDIO</span><h1>正在打开内容后台…</h1><p>后台通过 GitHub 读取和保存网站内容。</p></div>
      <Script src="https://unpkg.com/@sveltia/cms@0.164.2/dist/sveltia-cms.js" strategy="afterInteractive" />
    </main>
  );
}
