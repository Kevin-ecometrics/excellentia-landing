import type { Metadata } from "next";
import Hero from "@/app/components/hero";
import BestSellers from "@/app/components/best-sellers";
import BenefitsBanner from "@/app/components/benefits-banner";
import NewArrivals from "@/app/components/new-arrivals";
import VideoBanner from "@/app/components/video-banner";
import TypesOfProducts from "@/app/components/types-of-products";
import ExcellentiaDifference from "@/app/components/excellentia-difference";
import LegacyBanner from "@/app/components/legacy-banner";
import Faq from "@/app/components/faq";
import { absoluteUrl } from "@/app/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <Hero />
      <BestSellers />
      <BenefitsBanner />
      <NewArrivals />
      <VideoBanner />
      <TypesOfProducts />
      <ExcellentiaDifference />
      <LegacyBanner />
      <Faq />
    </main>
  );
}
