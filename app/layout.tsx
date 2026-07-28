import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  src: "../public/tipografias/quirkfy-regular.otf",
  variable: "--font-support2",
});

export const metadata: Metadata = {
  title: "Excellentia Foods LLC | Hispanic Cheeses & Cold Cuts distributor ",
  description:
    "Fastest delivery in Southern California, providing the freshest and most authentic Hispanic foods with full service inventory management.",
  keywords: [
    "Hispanic food distributor",
    "bulk Mexican cheese supplier",
    "wholesale deli meats",
    "refrigerated shelf stocking food distributor",
    "bulk Queso Fresco and Cotija cheese",
    "FIFO inventory management food supplier",
    "Hispanic food wholesale catalog",
    "Hispanic grocery store supplier",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fontMain.variable} ${fontSupport1.variable} ${fontSupport2.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="flex min-h-screen flex-col bg-white"
        suppressHydrationWarning
      >
        <div className="flex flex-1 flex-col bg-white">{children}</div>
      </body>
    </html>
  );
}
