"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Dictionary } from "@/app/i18n";

/**
 * Video del warehouse con la animacion del hero: fijo en pantalla mientras se hace scroll,
 * la ventana crece de un recuadro redondeado a todo el ancho.
 * El video es 16:9 con subtitulos quemados: nunca se recorta (sin object-cover ni zoom),
 * la ventana conserva su proporcion y deja franjas navy si la pantalla es mas ancha.
 */
export default function ProgressWarehouseVideo({ dict }: { dict: Dictionary }) {
  const t = dict.progress.warehouseVideo;
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });
  const scale = useTransform(progress, [0, 0.65], [0.72, 1]);
  const radius = useTransform(progress, [0, 0.65], [28, 0]);

  // Reproduce solo en pantalla; play() se rechaza si el navegador bloquea autoplay.
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <section
      ref={ref}
      aria-label={t.title}
      className={`w-full bg-default-navy ${reduceMotion ? "py-16" : "h-[180svh]"}`}
    >
      <div
        className={
          reduceMotion
            ? "flex justify-center"
            : "sticky top-0 flex h-svh items-center justify-center overflow-hidden"
        }
      >
        <motion.div
          style={reduceMotion ? undefined : { scale, borderRadius: radius }}
          className="relative aspect-video w-[min(100vw,177.78svh)] overflow-hidden bg-black"
        >
          <video
            ref={videoRef}
            src="/videos/warehouse website vide.webm"
            title={t.title}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            className="h-full w-full object-contain"
          />
          {/* Arriba a la izquierda para no tapar la barra de controles nativa ni los subtitulos. */}
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-default-navy/80 px-4 py-2.5 font-support2 text-sm font-bold text-default-ivory backdrop-blur-sm transition-colors hover:bg-default-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-mustard sm:top-6 sm:left-6 sm:text-base"
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
            {muted ? t.soundOn : t.soundOff}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
