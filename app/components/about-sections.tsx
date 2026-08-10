import AboutHero from "@/app/components/about-hero";
import AboutStory from "@/app/components/about-story";
import AboutPromise from "@/app/components/about-promise";
import AboutMissionVision from "@/app/components/about-mission-vision";
import AboutValues from "@/app/components/about-values";
import AboutDifference from "@/app/components/about-difference";
import type { Dictionary } from "@/app/i18n";

/** Composicion del About, compartida por la version en ingles y en espanol. */
export default function AboutSections({ dict }: { dict: Dictionary }) {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <AboutHero dict={dict} />
      <AboutStory dict={dict} />
      <AboutPromise dict={dict} />
      <AboutMissionVision dict={dict} />
      <AboutValues dict={dict} />
      <AboutDifference dict={dict} />
    </main>
  );
}
