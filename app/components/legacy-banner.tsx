import type { Dictionary } from "@/app/i18n";

export default function LegacyBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex w-full items-start justify-start overflow-hidden bg-default-indigo px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      {/* Background video placeholder — swap this section's bg-default-indigo
          for an absolutely positioned <video> once the asset is available. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative max-w-2xl text-left">
        <h2 className="font-support2 text-2xl font-bold text-default-ivory sm:text-3xl">
          {dict.legacyBanner.heading}
        </h2>
        <p className="mt-4 font-support2 text-base text-default-ivory/80">
          {dict.legacyBanner.body}
        </p>
      </div>
    </section>
  );
}
