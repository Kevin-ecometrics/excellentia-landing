"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/app/i18n";

/** Hero de /progress: al hacer scroll el video de fondo se acerca. */
export default function ProgressHero({ dict }: { dict: Dictionary }) {
  const t = dict.progress.hero;
  const sound = dict.progress.warehouseVideo;
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useReducedMotion();

  // Pausa fuera de pantalla para que el audio no siga sonando bajo otras secciones.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // El navegador bloquea autoplay con sonido: arranca mudo y el usuario lo activa.
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) video.play().catch(() => {});
  };
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-default-teal"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { scale: bgScale }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          src="/videos/Excellia Foods brings your favorite Latin ingredients and dishes to your table.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <h1 className="sr-only">{t.title}</h1>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute right-4 bottom-8 inline-flex items-center gap-2 rounded-full bg-default-navy/80 px-4 py-2.5 font-support2 text-sm font-bold text-default-ivory backdrop-blur-sm transition-colors hover:bg-default-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-mustard sm:right-6 sm:text-base"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          {muted ? (
            <path d="m22 9-6 6m0-6 6 6" />
          ) : (
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
          )}
        </svg>
        {muted ? sound.soundOn : sound.soundOff}
      </button>

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
          className="h-8 w-8 animate-bounce drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        >
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
