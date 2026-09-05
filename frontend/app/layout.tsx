import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "智源科技 - AI 智能公司",
  description: "用 AI 团队将想法转化为可销售的产品，无需编写代码。集成 MetaGPT + OpenManus 的多智能体开发平台。",
  keywords: ["AI", "MetaGPT", "OpenManus", "多智能体", "自动开发", "无代码"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
