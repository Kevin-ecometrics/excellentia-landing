"use client";

import { Fragment, useRef, type RefObject } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Dictionary } from "@/app/i18n";
import { useSavorBubble } from "@/app/components/use-savor-bubble";

const smooth = { stiffness: 120, damping: 30, restDelta: 0.0005 };

/** Letra que aparece y sube 1.35em a su lugar segun el scroll (savor.it: 30px con letra de 22px). */
function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const t = useTransform(progress, range, [0, 1], {
    ease: (v) => 1 - (1 - v) ** 2,
  });
  const y = useTransform(t, [0, 1], ["1.35em", "0em"]);
  const opacity = t;
  return (
    <motion.span className="inline-block" style={{ y, opacity }}>
      {char}
    </motion.span>
  );
}

/** Texto letra por letra; las palabras no se parten entre lineas. */
function RevealText({
  text,
  progress,
  start,
  end,
  charDur,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  charDur: number;
}) {
  const words = text.split(" ");
  const stagger = (end - start) / text.replace(/ /g, "").length;
  let index = 0;
  return words.map((word, w) => (
    <span key={w} aria-hidden="true">
      <span className="inline-block whitespace-nowrap">
        {[...word].map((char, c) => {
          const s = start + index++ * stagger;
          return <Char key={c} char={char} progress={progress} range={[s, s + charDur]} />;
        })}
      </span>
      {w < words.length - 1 && " "}
    </span>
  ));
}

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];
type ProductGroupData = Dictionary["productCredits"]["groups"][number];

/** Progreso 0-1 del scroll sobre `ref`, suavizado; `still` (movimiento reducido) lo deja en 1. */
function useScrubbed(ref: RefObject<HTMLElement | null>, offset: ScrollOffset, still: boolean) {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const smoothed = useSpring(scrollYProgress, smooth);
  const done = useMotionValue(1);
  return still ? done : smoothed;
}

const lineColor = "text-default-navy/50";

/** Linea vertical que se dibuja hacia abajo al hacer scroll (hilo de savor.it/foods). */
function VLine({ still, className }: { still: boolean; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrubbed(ref, ["start 85%", "end 55%"], still);
  return (
    <div ref={ref} aria-hidden="true" className={`flex justify-center ${lineColor} ${className}`}>
      <motion.div style={{ scaleY: p }} className="h-full w-[1.5px] origin-top bg-current" />
    </div>
  );
}

/**
 * Conexion entre capitulos (340px de alto, 360 de ancho): una curva que serpentea hacia un lado y vuelve
 * al centro, dibujandose a lo largo de mas scroll (del 85% al 35% de la pantalla).
 */
function Curve({ side, still }: { side: "left" | "right"; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrubbed(ref, ["start 85%", "end 35%"], still);
  const x = side === "right" ? 330 : 30;
  return (
    <div ref={ref} aria-hidden="true" className={lineColor}>
      <svg viewBox="0 0 360 340" fill="none" className="h-[340px] w-[360px] max-w-full">
        <motion.path
          d={`M180 0 C180 90 ${x} 70 ${x} 170 C${x} 270 180 250 180 340`}
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ pathLength: p }}
        />
      </svg>
    </div>
  );
}

/** Parentesis curvos que se dibujan alrededor del boton (como "Play Episode" de savor.it/foods). */
function Brackets({ still, children }: { still: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrubbed(ref, ["start 90%", "start 60%"], still);
  return (
    <div ref={ref} className="relative flex h-[90px] w-[320px] items-center justify-center">
      <svg aria-hidden="true" viewBox="0 0 320 90" fill="none" className={`pointer-events-none absolute inset-0 h-full w-full ${lineColor}`}>
        <motion.path d="M38 6 C6 24 6 66 38 84" stroke="currentColor" strokeWidth={1.5} style={{ pathLength: p }} />
        <motion.path d="M282 6 C314 24 314 66 282 84" stroke="currentColor" strokeWidth={1.5} style={{ pathLength: p }} />
      </svg>
      {children}
    </div>
  );
}

/** Renglon que aparece y sube 1.35em a su lugar (las frases de savor.it/foods). */
function ItemLine({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
}) {
  const t = useTransform(progress, range, [0, 1], { ease: (v) => 1 - (1 - v) ** 2 });
  const y = useTransform(t, [0, 1], ["1.35em", "0em"]);
  return <motion.li style={{ y, opacity: t }}>{children}</motion.li>;
}

/**
 * Capitulo por categoria (como los de savor.it/foods): titulo grande
 * letra por letra y luego cada producto, renglon por renglon.
 */
function ProductGroup({ group, still }: { group: ProductGroupData; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrubbed(ref, ["start 80%", "end 55%"], still);
  const step = 0.45 / group.items.length;
  return (
    <div ref={ref} className="flex w-full flex-col items-center py-8">
      <h3 aria-label={group.title} className="font-support1 text-4xl leading-none text-default-teal sm:text-5xl lg:text-6xl">
        <RevealText text={group.title} progress={p} start={0} end={0.2} charDur={0.25} />
      </h3>
      <ul className="mt-10 space-y-3 font-support2 text-lg sm:text-xl">
        {group.items.map((item, i) => (
          <ItemLine key={item.name} progress={p} range={[0.25 + i * step, 0.25 + i * step + 0.3]}>
            {item.name}
            {item.note && <em className="ml-3 text-default-teal/70">( {item.note} )</em>}
          </ItemLine>
        ))}
      </ul>
    </div>
  );
}

/**
 * Tras el hero, replica de savor.it (home + bloque "Our team" de /mission):
 * en la banda teal aparece el titulo letra por letra; debajo, la burbuja revela un
 * video desenfocado fijo al fondo; la banda cuelga como pildora y sale por arriba.
 * Sobre el video: "Our Products" letra por letra, los productos por categoria como
 * creditos ("Nombre ( nota )") y el boton de contacto.
 */
export default function CatalogReveal({ dict }: { dict: Dictionary }) {
  const t = dict.catalogReveal;
  const products = dict.productCredits;
  const ref = useRef<HTMLElement>(null);
  const productsTitleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const done = useMotionValue(1);

  const { progress, pillW, pillRx, pillRy, capW, capRx, capRy } = useSavorBubble(ref);
  // El video vive en un contenedor fijo: hasta 0.5 se recorta como la pildora bajo la linea
  // (40vh del inicio de la seccion); despues se ve completo y la banda teal cuelga encima.
  const clipTop = useTransform(progress, (v) => (v < 0.5 ? 40 : 0));
  const clipSide = useTransform(pillW, (w) => (100 - w) / 2);
  const clipPath = useMotionTemplate`inset(${clipTop}vh ${clipSide}% 0% ${clipSide}% round ${pillRx}vw / ${pillRy}vh)`;
  const capWidth = useMotionTemplate`${capW}%`;
  const capRadius = useMotionTemplate`${capRx}vw ${capRy}vh`;

  // savor.it usa Lenis (scroll que se desliza); un resorte sobre el progreso de las letras da el mismo efecto.
  // Titulo de la banda: la ola empieza al entrar la banda y termina (0.5) antes de que se angoste.
  const bandSmooth = useSpring(progress, smooth);
  const bandP = reduceMotion ? done : bandSmooth;
  // "Our Products": letra por letra mientras sube del 85% al 45% de la pantalla.
  const { scrollYProgress: productsScroll } = useScroll({
    target: productsTitleRef,
    offset: ["start 85%", "start 45%"],
  });
  const productsSmooth = useSpring(productsScroll, smooth);
  const productsP = reduceMotion ? done : productsSmooth;

  const bandTitle = (
    <h4
      aria-label={t.body}
      // Una sola linea desde tablet: el tamano escala con el ancho y topa en 3rem. En celular puede partirse.
      className="font-support2 text-[clamp(1.25rem,2.9vw,3rem)] leading-[1.3] text-default-ivory sm:whitespace-nowrap"
    >
      <RevealText text={t.body} progress={bandP} start={0.03} end={0.3} charDur={0.2} />
    </h4>
  );

  return (
    <section ref={ref} className="relative w-full bg-default-navy">
      {/* Fondo blanco fijo mientras pasa la seccion; la burbuja lo recorta al entrar. */}
      <div aria-hidden="true" className="sticky top-0 z-0 -mb-[100svh] h-svh overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { clipPath }} className="absolute inset-0 bg-white" />
      </div>

      {reduceMotion ? (
        <div className="relative z-10 flex justify-center bg-default-navy px-6 py-20 text-center sm:px-10">
          {bandTitle}
        </div>
      ) : (
        <motion.div
          style={{ width: capWidth, borderBottomLeftRadius: capRadius, borderBottomRightRadius: capRadius }}
          className="pointer-events-none absolute top-0 left-1/2 z-[1] h-[40vh] -translate-x-1/2 overflow-hidden bg-default-navy"
        >
          {/* Ancho de pantalla fijo: al angostarse la banda el titulo se recorta, no se reacomoda. */}
          <div className="absolute inset-y-0 left-1/2 flex w-screen -translate-x-1/2 items-center justify-center px-6 text-center sm:px-10">
            {bandTitle}
          </div>
        </motion.div>
      )}

      <div
        className={`relative z-10 px-6 pb-32 text-center text-default-teal sm:px-10 ${reduceMotion ? "bg-white pt-24" : "pt-[77vh]"}`}
      >
        <h2
          ref={productsTitleRef}
          aria-label={products.heading}
          className="font-support1 text-5xl leading-none sm:text-6xl lg:text-7xl"
        >
          <RevealText text={products.heading} progress={productsP} start={0} end={0.6} charDur={0.4} />
        </h2>

        {/* Como savor.it/foods: un hilo que se dibuja con el scroll une titulo, categorias y boton. */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center">
          <VLine still={!!reduceMotion} className="h-40" />
          {products.groups.map((group, i) => (
            <Fragment key={group.title}>
              <ProductGroup group={group} still={!!reduceMotion} />
              {i < products.groups.length - 1 && <Curve side={i % 2 ? "left" : "right"} still={!!reduceMotion} />}
            </Fragment>
          ))}
          <VLine still={!!reduceMotion} className="h-40" />
          <Brackets still={!!reduceMotion}>
            <a
              href={`mailto:contact@excellentiafoods.com?subject=${encodeURIComponent(t.mailSubject)}`}
              className="inline-flex items-center rounded-full bg-default-mustard px-10 py-4 font-support2 text-lg text-default-teal transition-colors hover:bg-default-teal hover:text-default-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-default-teal"
            >
              {t.cta}
            </a>
          </Brackets>
        </div>
      </div>
    </section>
  );
}
