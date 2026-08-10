import type { Dictionary } from "@/app/i18n";

export default function AboutPromise({ dict }: { dict: Dictionary }) {
  return (
    <section className="w-full bg-default-teal px-6 py-28 text-center sm:px-10 sm:py-32 lg:px-16">
      <h2 className="mx-auto max-w-4xl font-support1 text-4xl text-default-mustard sm:text-5xl lg:text-6xl">
        {dict.about.promise.heading}
      </h2>
      <p className="mx-auto mt-10 max-w-3xl font-support2 text-lg leading-relaxed text-default-ivory sm:text-xl lg:text-2xl">
        {dict.about.promise.body}
      </p>
    </section>
  );
}
