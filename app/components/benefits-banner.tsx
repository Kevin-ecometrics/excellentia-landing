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

// Los titulos viven en el diccionario; aqui solo el icono de cada beneficio,
// en el mismo orden que `dict.benefits.items`.
const icons: React.ReactNode[] = [
  <svg key="delivery" {...iconProps}>
    <path d="M3 7h11v9H3z" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="17" cy="18" r="1.5" />
  </svg>,
  <svg key="shelf-stocking" {...iconProps}>
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="inventory" {...iconProps}>
    <path d="M4 9l1-5h14l1 5" />
    <path d="M4 9v10h16V9" />
    <path d="M9 19v-6h6v6" />
  </svg>,
];

export default function BenefitsBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="w-full bg-default-navy px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-6 md:gap-12 lg:gap-24 xl:gap-36 2xl:gap-48">
        {dict.benefits.items.map((title, index) => (
          <div
            key={title}
            className="flex flex-col items-center text-center font-main"
          >
            <div className="h-16 w-16 sm:h-20 sm:w-20">{icons[index]}</div>
            <h3 className="mt-6 text-2xl font-main uppercase tracking-wide md:text-3xl">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
