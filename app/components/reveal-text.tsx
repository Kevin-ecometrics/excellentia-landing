"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/** Letra que aparece y sube 1.35em a su lugar segun el scroll (savor.it: 30px con letra de 22px). */
export function Char({
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
export function RevealText({
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

