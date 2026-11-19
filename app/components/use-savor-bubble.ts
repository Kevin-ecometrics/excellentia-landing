"use client";

import type { RefObject } from "react";
import { useScroll, useTransform } from "motion/react";

/**
 * Geometria de la "burbuja" de savor.it, medida cuadro a cuadro (1920x997).
 * La forma se apoya en una linea a 40vh del inicio de la seccion `ref`, que sube con el
 * scroll normal. El progreso va de 0 (seccion al 60% de la pantalla) a 1 (40vh despues de
 * que la seccion toca el borde superior): una pantalla de scroll.
 * - 1a mitad: pildora bajo la linea que se ensancha (`pillW` %) y aplana sus esquinas.
 * - 2a mitad: lo que queda sobre la linea cuelga como pildora que se angosta (`capW` %).
 * Radios: `*Rx` en vw y `*Ry` en vh.
 */
export function useSavorBubble(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start 60%", "start -40%"],
  });
  const pillW = useTransform(progress, [0, 0.1, 0.2, 0.3, 0.4, 0.5], [58, 65, 74, 89, 100, 100]);
  // Angosta es cupula ovalada (radio = medio ancho); al ensancharse aparece la parte plana. En 0.5 queda recta.
  const pillRx = useTransform(progress, [0, 0.1, 0.2, 0.3, 0.4, 0.5], [29, 32, 30, 22, 26, 0]);
  const pillRy = useTransform(progress, [0, 0.3, 0.4, 0.5], [30, 30, 17, 0]);
  const capW = useTransform(progress, [0.5, 0.6, 0.7, 0.8, 0.9, 1], [100, 100, 88, 68, 50, 40]);
  const capRx = useTransform(progress, [0.5, 0.6, 0.7], [0, 18, 14]);
  const capRy = useTransform(progress, [0.5, 0.6, 0.7], [0, 13, 20]);
  return { progress, pillW, pillRx, pillRy, capW, capRx, capRy };
}
