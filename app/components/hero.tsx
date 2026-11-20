import Image from "next/image";
import type { Dictionary } from "@/app/i18n";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-default-teal px-6 sm:px-10 lg:h-[88vh] lg:px-16">
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
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Mismo tratamiento que el hero del About: logo, titulo y subtitulo centrados. */}
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
        <h1 className="mt-6 font-support1 text-3xl text-default-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mt-5 max-w-xl font-support2 text-base text-default-ivory/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-lg">
          {dict.hero.subtitle}
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 font-support2 text-base font-bold text-default-mustard drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-all hover:gap-3 sm:text-lg"
        >
          {dict.hero.cta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
