import Hero from "@/app/components/hero";
import BestSellers from "@/app/components/best-sellers";
import BenefitsBanner from "@/app/components/benefits-banner";
import VideoBanner from "@/app/components/video-banner";
import ExcellentiaDifference from "@/app/components/excellentia-difference";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <Hero />
      <BestSellers />
      <BenefitsBanner />
      <VideoBanner />
      <ExcellentiaDifference />
    </main>
  );
}
