import type { Dictionary } from "@/app/i18n";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex h-[60vh] w-full items-end justify-start overflow-hidden bg-default-teal px-6 pb-10 sm:px-10 sm:pb-14 lg:h-[70vh] lg:px-16 lg:pb-16">
      <video
        src="/videos/Video of delicious food made with authentic latino food provided by excellentia foods.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative max-w-xl">
        <h1 className="font-support1 text-xl text-default-ivory drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-2xl">
          {dict.hero.title}
        </h1>
        <p className="mt-4 font-support2 text-sm text-default-ivory/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-base">
          {dict.hero.subtitle}
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 font-support2 text-default-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-all hover:gap-3"
        >
          {dict.hero.cta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
