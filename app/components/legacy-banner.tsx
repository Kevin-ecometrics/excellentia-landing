import type { Dictionary } from "@/app/i18n";

export default function LegacyBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex w-full items-start justify-start overflow-hidden bg-default-indigo px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <video
        src="/videos/clip process.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* El clip es claro (cajas, piso): oscurecer del lado del texto para que se lea. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15" />
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
