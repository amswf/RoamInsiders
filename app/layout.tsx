import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.PAGES_BASE_PATH || "";

export const metadata: Metadata = {
  title: { default: "Roam Insider｜亚洲旅行内容流", template: "%s｜Roam Insider" },
  description: "亚洲旅行路线、优惠券与预订指南。先看什么值得出发，再决定订什么。",
  icons: { icon: `${basePath}/favicon.png`, shortcut: `${basePath}/favicon.png` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
