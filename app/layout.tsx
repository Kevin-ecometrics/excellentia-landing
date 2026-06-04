import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-screen flex-col overflow-y-auto bg-white">
        <div className="flex flex-1 flex-col bg-white">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
