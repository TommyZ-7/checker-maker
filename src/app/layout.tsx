import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import  Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checker Maker",
  description: "Create and share your own diagnostic tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-default-200">
              <Header />
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-default-200 py-8">
              <div className="container mx-auto px-4 text-center text-default-500">
                &copy; {new Date().getFullYear()} Checker Maker. All rights reserved.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
