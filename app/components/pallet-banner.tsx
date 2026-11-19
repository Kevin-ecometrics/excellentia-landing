import PalletBuilder from "@/app/components/pallet-builder";
import type { Dictionary } from "@/app/i18n";

/** Dos columnas (texto | animacion), con la estructura del "2-up" de lacolombe.com. */
export default function PalletBanner({ dict }: { dict: Dictionary }) {
  const t = dict.palletBanner;
  return (
    <section className="w-full bg-default-ivory px-6 py-16 sm:px-10 lg:px-28 lg:py-15">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-0">
        <div className="lg:px-6">
          <h2 className="max-w-[22ch] font-support1 text-2xl leading-tight text-default-teal sm:text-3xl">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-[36ch] font-support2 text-lg leading-[1.3] text-default-teal sm:text-2xl">
            {t.body}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block bg-default-teal px-4 py-3 font-support2 text-base text-default-ivory transition-colors hover:bg-default-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-default-teal"
          >
            {t.cta}
          </a>
        </div>

        <PalletBuilder dict={dict} />
      </div>
    </section>
  );
}
