"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Dictionary } from "@/app/i18n";
import { useSavorBubble } from "@/app/components/use-savor-bubble";
import { RevealText } from "@/app/components/reveal-text";
import ZTrail from "@/app/components/z-trail";

const smooth = { stiffness: 120, damping: 30, restDelta: 0.0005 };

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
      {/* Fondo ivory (el de la seccion de 3 pasos) fijo mientras pasa la seccion; la burbuja lo recorta al entrar. */}
      <div aria-hidden="true" className="sticky top-0 z-0 -mb-[100svh] h-svh overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { clipPath }} className="absolute inset-0 bg-default-ivory" />
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
        className={`relative z-10 px-6 text-center text-default-teal sm:px-10 ${reduceMotion ? "bg-default-ivory pt-24 pb-32" : "pt-[77vh]"}`}
      >
        <h2
          ref={productsTitleRef}
          aria-label={products.heading}
          className="font-support1 text-5xl leading-none sm:text-6xl lg:text-7xl"
        >
          <RevealText text={products.heading} progress={productsP} start={0} end={0.6} charDur={0.4} />
        </h2>

        <ZTrail
          groups={products.groups}
          still={!!reduceMotion}
          skipLabel={t.skip}
          cta={
            <a
              href={`mailto:contact@excellentiafoods.com?subject=${encodeURIComponent(t.mailSubject)}`}
              className="pointer-events-auto inline-flex items-center rounded-full bg-default-mustard px-10 py-4 font-support2 text-lg text-default-teal transition-colors hover:bg-default-teal hover:text-default-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-default-teal"
            >
              {t.cta}
            </a>
          }
        />
      </div>
    </section>
  );
}
