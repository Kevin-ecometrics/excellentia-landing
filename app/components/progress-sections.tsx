import ProgressHero from "@/app/components/progress-hero";
import ProgressWarehouseVideo from "@/app/components/progress-warehouse-video";
import type { Dictionary } from "@/app/i18n";

/** Composicion de /progress, compartida por la version en ingles y en espanol. */
export default function ProgressSections({ dict }: { dict: Dictionary }) {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <ProgressHero dict={dict} />
      <div id="progress-content" className="scroll-mt-24">
        <ProgressWarehouseVideo dict={dict} />
      </div>
    </main>
  );
}
