import type { Dictionary } from "@/app/i18n";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Los titulos viven en el diccionario; aqui solo el icono de cada valor, en el
// mismo orden que `dict.about.values.items`.
const icons: React.ReactNode[] = [
  <svg key="excellence" {...iconProps}>
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3z" />
  </svg>,
  <svg key="integrity" {...iconProps}>
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="commitment" {...iconProps}>
    <path d="M11 20H6a2 2 0 01-2-2v-7a2 2 0 012-2h2.5l3-6a2 2 0 012.9 2.4L13 9h5.2a2 2 0 011.9 2.6l-2.1 7A2 2 0 0116 20h-5z" />
    <path d="M8.5 9v11" />
  </svg>,
];

export default function AboutValues({ dict }: { dict: Dictionary }) {
  return (
    <section className="w-full bg-default-ivory px-6 py-24 text-default-navy sm:px-10 sm:py-28 lg:px-16">
      <h2 className="font-support1 text-4xl text-default-teal sm:text-5xl lg:text-6xl">
        {dict.about.values.heading}
      </h2>
      <div aria-hidden="true" className="mt-8 h-1 w-24 bg-default-mustard" />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3">
        {dict.about.values.items.map((value, index) => (
          <div
            key={value.title}
            className="flex flex-col border-t border-default-navy/15 py-10 sm:mr-10 sm:py-12 lg:mr-20"
          >
            <div className="h-12 w-12 text-default-teal sm:h-14 sm:w-14">
              {icons[index]}
            </div>
            <h3 className="mt-6 font-main text-2xl uppercase tracking-wide text-default-navy md:text-3xl">
              {value.title}
            </h3>
            <p className="mt-4 max-w-sm font-support2 text-base leading-relaxed text-default-navy/75">
              {value.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
