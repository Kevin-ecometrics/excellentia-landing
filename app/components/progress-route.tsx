"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll } from "motion/react";
import type { Dictionary } from "@/app/i18n";

// Una imagen por parada, en el mismo orden que `dict.progress.route.stops`.
const images = [
  "/products/Contact excellentia foods to place your order.webp",
  "/products/excellentia foods stocks your store, mini-market, and restaurant.webp",
  "/products/excellentia foods delivers the freshest ingredients the very same day.webp",
];

type Stops = Dictionary["progress"]["route"]["stops"];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ruta del pedido entre el hero y el video del almacen: la linea mostaza se dibuja con el scroll
 * y el panel fijo (solo desktop) cambia imagen y contador segun la parada que cruza el centro.
 */
export default function ProgressRoute({ dict }: { dict: Dictionary }) {
  const t = dict.progress.route;
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });

  return (
    <section
      aria-labelledby="route-heading"
      className="w-full bg-default-ivory px-6 py-24 text-default-navy sm:px-10 sm:py-28 lg:px-16"
    >
      <h2 id="route-heading" className="max-w-3xl font-support1 text-4xl text-default-teal sm:text-5xl lg:text-6xl">
        {t.heading}
      </h2>
      <div aria-hidden="true" className="mt-8 h-1 w-24 bg-default-mustard" />
      <p className="mt-8 max-w-2xl font-support2 text-lg leading-relaxed text-default-navy/80 sm:text-xl">
        {t.intro}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <RoutePanel stops={t.stops} active={active} />

        <div className="relative">
          {/* Riel: pista tenue + trazo mostaza que avanza con el scroll. */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-default-navy/15" />
          <motion.div
            aria-hidden="true"
            style={reduceMotion ? undefined : { scaleY: scrollYProgress }}
            className="absolute top-2 bottom-2 left-[11px] w-0.5 origin-top bg-default-mustard"
          />
          <ol ref={listRef}>
          {t.stops.map((stop, index) => (
            <RouteStop
              key={stop.title}
              stop={stop}
              index={index}
              total={t.stops.length}
              reached={index <= active}
              onActive={() => setActive(index)}
            />
          ))}
          </ol>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-start gap-6 border-t border-default-navy/15 pt-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-support1 text-3xl text-default-teal sm:text-4xl">{t.ctaHeading}</p>
        <a
          href="#contact"
          className="inline-flex items-center rounded-full bg-default-teal px-8 py-4 font-support2 text-base font-bold text-default-ivory transition-colors hover:bg-default-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-default-mustard sm:text-lg"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}

function RoutePanel({ stops, active }: { stops: Stops; active: number }) {
  return (
    <div aria-hidden="true" className="hidden lg:block">
      <div className="sticky top-28">
        <div className="relative aspect-[4/3]">
          {stops.map((stop, index) => (
            <Image
              key={stop.title}
              src={images[index]}
              alt=""
              fill
              sizes="40vw"
              className={`object-contain mix-blend-multiply transition-opacity duration-500 motion-reduce:transition-none ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <p className="mt-8 flex items-baseline gap-3 font-support1 text-default-teal">
          <span className="text-8xl leading-none text-default-mustard tabular-nums">{pad(active + 1)}</span>
          <span className="text-2xl text-default-navy/40 tabular-nums">/ {pad(stops.length)}</span>
        </p>
        <p className="mt-3 font-support2 text-xl font-bold text-default-teal">{stops[active].title}</p>
      </div>
    </div>
  );
}

function RouteStop({
  stop,
  index,
  total,
  reached,
  onActive,
}: {
  stop: Stops[number];
  index: number;
  total: number;
  reached: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Activa la parada cuando cruza la linea media de la pantalla.
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  const last = index === total - 1;

  return (
    <li
      ref={ref}
      className={`relative pl-12 sm:pl-16 ${last ? "pb-2" : "pb-16 lg:min-h-[60svh] lg:pb-24"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none ${
          reached ? "border-default-mustard bg-default-mustard" : "border-default-navy/25 bg-default-ivory"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${reached ? "bg-default-ivory" : "bg-default-navy/25"}`} />
      </span>

      <p className="font-support2 text-sm font-bold text-default-mustard tabular-nums">
        {pad(index + 1)}
      </p>
      <h3 className="mt-2 font-support1 text-3xl text-default-teal sm:text-4xl">{stop.title}</h3>
      <p className="mt-4 max-w-xl font-support2 text-lg leading-relaxed text-default-navy/80">{stop.body}</p>

      <ul className="mt-6 flex flex-wrap gap-3">
        {stop.points.map((point) => (
          <li
            key={point}
            className="inline-flex items-center gap-2 rounded-full border border-default-teal/20 px-4 py-2 font-support2 text-sm font-bold text-default-teal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 text-default-mustard"
            >
              <path d="M5 12l5 5 9-10" />
            </svg>
            {point}
          </li>
        ))}
      </ul>

      {/* En movil no hay panel fijo: la imagen va dentro de cada parada. */}
      <div className="relative mt-8 aspect-[4/3] max-w-md lg:hidden">
        <Image src={images[index]} alt={stop.imageAlt} fill sizes="(min-width: 640px) 28rem, 90vw" className="object-contain mix-blend-multiply" />
      </div>
    </li>
  );
}
