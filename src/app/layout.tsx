import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "行业五行志 · 日主五行查询",
  description:
    "三分钟查出你的日主五行，对照行业五行——判断你做着累不是能力问题，是你脚下那块工位的五行正跟你日主互咬。",
  keywords: [
    "八字排盘",
    "日主查询",
    "日主五行",
    "五行查职业",
    "八字看工作",
    "职场命理",
    "行业五行志",
  ],
  openGraph: {
    title: "行业五行志 · 日主五行查询",
    description: "三分钟查日主，五行对照行业——找到你该待的地方。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-stone-50 text-stone-800 antialiased">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
