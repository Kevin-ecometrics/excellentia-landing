import type { Dictionary } from "@/app/i18n";

export default function AboutStory({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="story"
      className="w-full scroll-mt-24 bg-default-ivory px-6 py-24 text-default-navy sm:px-10 sm:py-28 lg:px-16"
    >
      <h2 className="font-support1 text-4xl text-default-teal sm:text-5xl lg:text-6xl">
        {dict.about.story.heading}
      </h2>
      <div aria-hidden="true" className="mt-8 h-1 w-24 bg-default-mustard" />

      <div className="mt-16 flex flex-col">
        {dict.about.story.milestones.map((milestone) =>
          milestone.year ? (
            <article
              key={milestone.body}
              className="grid grid-cols-1 gap-3 border-t border-default-navy/15 py-10 sm:py-12 md:grid-cols-[9rem_1fr] md:gap-10 lg:grid-cols-[15rem_1fr]"
            >
              <span className="font-support1 text-3xl text-default-mustard sm:text-4xl lg:text-5xl">
                {milestone.year}
              </span>
              <p className="max-w-3xl font-support2 text-lg leading-relaxed text-default-navy/85 sm:text-xl">
                {milestone.body}
              </p>
            </article>
          ) : (
            // El ultimo parrafo cierra la historia: va sin marcador y en
            // destacado, como remate de la seccion. La regla superior cruza
            // todo el ancho igual que las de los hitos.
            <div
              key={milestone.body}
              className="border-t border-default-navy/15 pt-10 sm:pt-12"
            >
              <p className="max-w-4xl font-support2 text-xl font-bold leading-relaxed text-default-teal sm:text-2xl">
                {milestone.body}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
