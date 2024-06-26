import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContextProvider";
import { SWRConfigContext } from "./context/SWRConfigContext";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TILog 오늘의 배움 공유",
    template: "TILog | %s",
  },
  description: "Today I Learned! 오늘 배운 지식을 지인과 공유해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={pretendard.className}>
      <body className='flex flex-col w-full'>
        <AuthContextProvider>
          <header className='sticky top-0 z-10 px-5 bg-header-background backdrop-blur-xl'>
            <Header />
          </header>
          <main className='grow w-full max-w-screen-xl mx-auto'>
            <SWRConfigContext>{children} </SWRConfigContext>
          </main>
        </AuthContextProvider>
        <div id='modal' />
      </body>
    </html>
  );
}
