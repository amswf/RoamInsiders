import type { Metadata } from "next";
import { Noto_Sans_SC, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"], weight: ["400", "500", "600", "700", "900"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"], style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "Roam Insider｜少而准确的旅行路线", template: "%s｜Roam Insider" },
    description: "为想出发、却不想被攻略淹没的人，筛选真正值得走的旅行路线。",
    openGraph: { title: "Roam Insider｜只要选对下一站", description: "少一点打卡，多一点记得住的时刻。", images: [new URL("/og.png", base).toString()] },
    twitter: { card: "summary_large_image", title: "Roam Insider｜只要选对下一站", description: "少一点打卡，多一点记得住的时刻。", images: [new URL("/og.png", base).toString()] },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${sans.variable} ${serif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
