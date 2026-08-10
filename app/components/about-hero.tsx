import Image from "next/image";
import type { Dictionary } from "@/app/i18n";

export default function AboutHero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-default-teal px-6 sm:px-10 lg:h-[88vh] lg:px-16">
      <video
        src="/videos/portada about excellentia.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/logos/V1/LOGO EXCELLENTIA SIN FONDO.png"
          alt={dict.common.logoAlt}
          title={dict.common.logoTitle}
          width={400}
          height={400}
          loading="eager"
          fetchPriority="high"
          className="h-auto w-40 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:w-48 lg:w-56"
        />
        <p className="mt-6 font-support2 text-xs font-bold uppercase tracking-[0.35em] text-default-mustard drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-sm">
          {dict.about.hero.eyebrow}
        </p>
        <h1 className="mt-4 font-support1 text-3xl text-default-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-5xl">
          {dict.about.hero.title}
        </h1>
        <p className="mt-5 max-w-xl font-support2 text-base text-default-ivory/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-lg">
          {dict.about.hero.subtitle}
        </p>
      </div>

      <a
        href="#story"
        aria-label={dict.about.hero.scrollLabel}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-default-ivory/70 transition-colors hover:text-default-ivory"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-8 w-8 animate-bounce drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        >
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
