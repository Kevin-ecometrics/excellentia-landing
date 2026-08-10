import type { Dictionary } from "@/app/i18n";

/** Dos bloques de color a sangre, uno claro y uno oscuro, que se tocan. */
export default function AboutMissionVision({ dict }: { dict: Dictionary }) {
  return (
    <section className="grid w-full grid-cols-1 md:grid-cols-2">
      <div className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div aria-hidden="true" className="h-1 w-16 bg-default-mustard" />
        <h2 className="mt-8 font-support1 text-3xl text-default-teal sm:text-4xl">
          {dict.about.mission.label}
        </h2>
        <p className="mt-6 max-w-xl font-support2 text-base leading-relaxed text-default-navy/85 sm:text-lg">
          {dict.about.mission.body}
        </p>
      </div>

      <div className="bg-default-navy px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div aria-hidden="true" className="h-1 w-16 bg-default-mustard" />
        <h2 className="mt-8 font-support1 text-3xl text-default-mustard sm:text-4xl">
          {dict.about.vision.label}
        </h2>
        <p className="mt-6 max-w-xl font-support2 text-base leading-relaxed text-default-ivory/85 sm:text-lg">
          {dict.about.vision.body}
        </p>
      </div>
    </section>
  );
}
