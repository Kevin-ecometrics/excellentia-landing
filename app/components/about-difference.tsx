import type { Dictionary } from "@/app/i18n";

/** Split asimetrico: el encabezado vive en el bloque de color, la lista al lado. */
export default function AboutDifference({ dict }: { dict: Dictionary }) {
  return (
    <section className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div className="bg-default-teal px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <h2 className="font-support1 text-4xl text-default-mustard sm:text-5xl">
          {dict.about.difference.heading}
        </h2>
        <p className="mt-4 font-support2 text-lg font-bold text-default-ivory sm:text-xl">
          {dict.about.difference.subheading}
        </p>
        <p className="mt-8 max-w-xl font-support2 text-base leading-relaxed text-default-ivory/80 sm:text-lg">
          {dict.about.difference.intro}
        </p>
      </div>

      <div className="flex flex-col bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        {dict.about.difference.items.map((item, index) => (
          <div
            key={item.title}
            className="border-t border-default-navy/15 py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="font-support1 text-2xl text-default-mustard"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-support2 text-lg font-bold text-default-teal sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 max-w-lg font-support2 text-base leading-relaxed text-default-navy/75">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
