import type { Dictionary } from "@/app/i18n";

export default function VideoBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex h-[50vh] w-full items-end overflow-hidden bg-default-indigo px-6 pb-10 sm:h-[40vh] sm:items-center sm:px-10 sm:pb-0 lg:px-16">
      {/* Background video placeholder — swap this section's bg-default-indigo
          for an absolutely positioned <video> once the asset is available. */}
      <div className="relative max-w-xl text-left text-white">
        <h2 className="font-support2 text-2xl font-bold sm:text-3xl lg:text-4xl">
          {dict.videoBanner.heading}
        </h2>
        <p className="mt-4 font-support2 text-base sm:text-lg">
          {dict.videoBanner.line1}
        </p>
        <p className="mt-2 font-support2 text-base sm:text-lg">
          {dict.videoBanner.line2}
        </p>
      </div>
    </section>
  );
}
