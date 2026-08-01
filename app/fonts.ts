import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

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

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  fontMain.variable,
  fontSupport1.variable,
  fontSupport2.variable,
].join(" ");
