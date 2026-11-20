"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/app/i18n";

/**
 * Historia del About: trayectoria 2003 -> hoy. En desktop la linea es horizontal y se traza
 * una sola vez al entrar en pantalla; en movil queda vertical, como la ruta de pasos.
 */
export default function AboutStory({ dict }: { dict: Dictionary }) {
  const milestones = dict.about.story.milestones.filter((m) => m.year);
  const closing = dict.about.story.milestones.find((m) => !m.year);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="w-full scroll-mt-24 bg-default-ivory px-6 py-24 text-default-navy sm:px-10 sm:py-28 lg:px-16"
    >
      <h2 id="story-heading" className="font-support1 text-4xl text-default-teal sm:text-5xl lg:text-6xl">
        {dict.about.story.heading}
      </h2>
      <div aria-hidden="true" className="mt-8 h-1 w-24 bg-default-mustard" />

      <div className="relative mt-16 lg:mt-20">
        {/* Linea: vertical en movil, horizontal en desktop. */}
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-default-navy/15 lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto" />
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[11px] right-0 left-0 hidden h-0.5 origin-left bg-default-mustard lg:block"
        />
        <ol className="grid grid-cols-1 gap-12 lg:grid-cols-3">

        {milestones.map((milestone, index) => (
          <motion.li
            key={milestone.body}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.3 + index * 0.35 }}
            className="relative pl-12 lg:pt-14 lg:pl-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-default-mustard"
            >
              <span className="h-2 w-2 rounded-full bg-default-ivory" />
            </span>
            <p className="font-support1 text-5xl leading-none text-default-teal sm:text-6xl lg:text-7xl">
              {milestone.year}
            </p>
            <p className="mt-6 max-w-md font-support2 text-base leading-relaxed text-default-navy/80 sm:text-lg">
              {milestone.body}
            </p>
          </motion.li>
        ))}
        </ol>
      </div>

      {closing && (
        <p className="mt-16 max-w-4xl border-t border-default-navy/15 pt-10 font-support2 text-xl font-bold leading-relaxed text-default-teal sm:text-2xl">
          {closing.body}
        </p>
      )}
    </section>
  );
}
