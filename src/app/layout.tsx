import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TILog 오늘의 배움 공유",
  description: "Today I Learned! 오늘 배운 지식을 지인과 공유해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={pretendard.className}>
      <body>{children}</body>
    </html>
  );
}
