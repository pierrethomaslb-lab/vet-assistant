import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NavMobile } from "@/components/layout/nav-mobile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VetAssistant — Aide a la decision veterinaire",
  description:
    "Assistant IA pour veterinaires. Aide a la decision clinique avec checklist, questions guidees et validation senior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-20 md:pb-6">
          {children}
        </main>
        <Footer />
        <NavMobile />
      </body>
    </html>
  );
}
