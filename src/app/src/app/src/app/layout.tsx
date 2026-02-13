import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "小学生错题高效学习智能体",
  description: "帮助小学生有效提升知识掌握",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
