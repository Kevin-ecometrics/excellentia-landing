import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/footer";
import LogoBanner from "@/app/components/logo-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontMain = localFont({
  src: "../public/tipografias/after-regular.otf",
  variable: "--font-main",
});

const fontSupport1 = localFont({
  src: "../public/tipografias/bakora.ttf",
  variable: "--font-support1",
});

const fontSupport2 = localFont({
  src: "../public/tipografias/FreeSans.otf",
  variable: "--font-support2",
});

export const metadata: Metadata = {
  title: "Excellentia Foods LLC | Premium Cheeses & Deli Meats",
  description:
    "Excellentia Foods LLC offers premium quality cheeses, sausages, deli meats, and specialty food products across the USA.",
  keywords: [
    "Excellentia Foods",
    "premium cheese",
    "deli meats",
    "sausages",
    "specialty foods",
    "food distributor USA",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://excellentiafoods.com/",
  },
  authors: [{ name: "Excellentia Foods LLC" }],
  other: {
    publisher: "Excellentia Foods LLC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fontMain.variable} ${fontSupport1.variable} ${fontSupport2.variable} h-full antialiased`}
    >
      <body className="flex h-screen flex-col overflow-y-auto bg-white">
        <LogoBanner />
        <div className="flex flex-1 flex-col bg-white">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
