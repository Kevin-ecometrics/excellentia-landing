import type { Dictionary } from "@/app/i18n";

export default function VideoBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex h-[50vh] w-full items-end overflow-hidden bg-default-indigo px-6 pb-10 sm:h-[40vh] sm:items-center sm:px-10 sm:pb-0 lg:px-16">
      <video
        src="/videos/clip comida macro.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* El clip es claro (crema): oscurecer del lado del texto para que se lea. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
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
