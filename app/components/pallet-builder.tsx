"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/app/i18n";

// Posiciones medidas sobre el GIF de lacolombe.com, en % del recuadro 840x439.
const TRACK = { left: 12, right: 86, top: 29 };
// 3 pasos: cada imagen queda justo debajo de su hito.
const NODE_X = [24, 49, 74];
const SLOT_X = NODE_X;
const SLOT_Y = 66;
const FILL_END = [12.6, 24, 49, 86]; // fin del relleno por paso (0 = solo el punto)

// Orden del doc SEO: You Call (telefono), We Stock (montacargas), We Deliver (repartidor).
// Discos solo con la paleta del brand board, contrastando con la imagen: rojo/indigo, amarillo/navy, azul/mostaza.
const products = [
  { src: "/products/Contact excellentia foods to place your order.webp", disk: "bg-default-indigo" },
  { src: "/products/excellentia foods stocks your store, mini-market, and restaurant.webp", disk: "bg-default-navy" },
  { src: "/products/excellentia foods delivers the freshest ingredients the very same day.webp", disk: "bg-default-mustard" },
];

// Duracion de cada paso en ms: vacio, 3 pasos (el ultimo incluye la pausa con todo lleno).
const STEP_MS = [1000, 1000, 1000, 2400];
// Rebote corto (~10% de sobrepaso), como el "pop" del GIF.
const pop = { type: "spring", stiffness: 380, damping: 22 } as const;

/** Recreacion en codigo del GIF "Brew Bundler" de lacolombe.com, en bucle. */
export default function PalletBuilder({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  // Con movimiento reducido se muestra el estado final, sin bucle.
  const shown = reduceMotion ? 3 : step;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % 4), STEP_MS[step]);
    return () => clearTimeout(id);
  }, [step, inView, reduceMotion]);

  const milestones = dict.palletBanner.milestones;
  const alts = dict.palletBanner.imageAlts;

  return (
    <div ref={ref} className="relative aspect-[840/439] w-full select-none">
      {/* Pista blanca y relleno teal */}
      <div
        aria-hidden="true"
        className="absolute h-[1.2%] min-h-1 -translate-y-1/2 rounded-full bg-white"
        style={{ left: `${TRACK.left}%`, right: `${100 - TRACK.right}%`, top: `${TRACK.top}%` }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute h-[1.2%] min-h-1 -translate-y-1/2 rounded-full bg-default-teal"
        style={{ left: `${TRACK.left}%`, top: `${TRACK.top}%` }}
        animate={{ width: `${FILL_END[shown] - TRACK.left}%` }}
        transition={{ duration: shown === 0 ? 0 : 0.5, ease: "easeInOut" }}
      />

      {/* Hitos sobre la barra */}
      {milestones.map((m, i) => {
        const reached = shown >= i + 1;
        const current = shown === i + 1;
        return (
          <div
            key={m.value}
            className="absolute flex w-[8.5%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${NODE_X[i]}%`, top: `${TRACK.top}%` }}
          >
            {current && (
              <motion.div
                key={shown}
                aria-hidden="true"
                initial={{ scale: 0, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                transition={pop}
                className="absolute bottom-full mb-[12%] flex w-[45%] flex-col items-center"
              >
                <svg viewBox="0 0 20 8" className="mb-[6%] w-[80%] text-default-mustard" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M3 7 1 4M10 6V1M17 7l2-3" />
                </svg>
                <div className="flex aspect-square w-full items-center justify-center rounded-full bg-default-mustard">
                  <svg viewBox="0 0 12 12" className="w-[60%] text-default-teal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.5 5 9l4.5-6" />
                  </svg>
                </div>
              </motion.div>
            )}
            <div
              className={`flex aspect-square w-full items-center justify-center rounded-full border-2 border-default-teal font-support2 text-[clamp(9px,1.1vw,16px)] transition-colors duration-300 ${
                reached ? "bg-default-teal text-default-ivory" : "bg-default-ivory text-default-teal"
              }`}
            >
              {m.value}
            </div>
            <span className="absolute top-full mt-[14%] whitespace-nowrap font-support2 text-[clamp(11px,1vw,17px)] font-bold text-default-teal">
              {m.label}
            </span>
          </div>
        );
      })}

      {/* Huecos punteados y productos */}
      {products.map((p, i) => (
        <div
          key={p.src}
          className="absolute aspect-square w-[18.5%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-default-teal/30"
          style={{ left: `${SLOT_X[i]}%`, top: `${SLOT_Y}%` }}
        >
          {/* Siempre en el HTML (alt/title para SEO); solo se escala segun el paso. */}
          <motion.div
            initial={false}
            animate={{ scale: shown > i ? 1 : 0 }}
            transition={shown > i ? pop : { duration: 0 }}
            className={`absolute -inset-[2px] rounded-full ${p.disk}`}
          >
            <Image
              src={p.src}
              alt={alts[i]}
              title={alts[i]}
              fill
              sizes="(min-width: 1024px) 160px, 25vw"
              className="scale-110 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
