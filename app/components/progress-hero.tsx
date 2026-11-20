"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/app/i18n";

/** Hero de /progress: al hacer scroll el texto sube y se desvanece mientras el fondo se acerca. */
export default function ProgressHero({ dict }: { dict: Dictionary }) {
  const t = dict.progress.hero;
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-default-teal px-6 sm:px-10 lg:h-[88vh] lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { scale: bgScale }}
        className="absolute inset-0 bg-gradient-to-b from-default-teal to-default-navy"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
        className="relative flex max-w-3xl flex-col items-center text-center"
      >
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-support1 text-4xl text-default-ivory sm:text-5xl lg:text-6xl"
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-xl font-support2 text-base text-default-ivory/85 sm:text-lg"
        >
          {t.subtitle}
        </motion.p>
      </motion.div>

      <a
        href="#progress-content"
        aria-label={t.scrollLabel}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-default-ivory/70 transition-colors hover:text-default-ivory"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-8 w-8 animate-bounce"
        >
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
