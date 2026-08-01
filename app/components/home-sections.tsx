import Hero from "@/app/components/hero";
import BestSellers from "@/app/components/best-sellers";
import BenefitsBanner from "@/app/components/benefits-banner";
import NewArrivals from "@/app/components/new-arrivals";
import VideoBanner from "@/app/components/video-banner";
import TypesOfProducts from "@/app/components/types-of-products";
import ExcellentiaDifference from "@/app/components/excellentia-difference";
import LegacyBanner from "@/app/components/legacy-banner";
import Faq from "@/app/components/faq";
import type { Dictionary } from "@/app/i18n";

/** Composicion de la home, compartida por la version en ingles y en espanol. */
export default function HomeSections({ dict }: { dict: Dictionary }) {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <Hero dict={dict} />
      <BestSellers dict={dict} />
      <BenefitsBanner dict={dict} />
      <NewArrivals dict={dict} />
      <VideoBanner dict={dict} />
      <TypesOfProducts dict={dict} />
      <ExcellentiaDifference dict={dict} />
      <LegacyBanner dict={dict} />
      <Faq dict={dict} />
    </main>
  );
}
