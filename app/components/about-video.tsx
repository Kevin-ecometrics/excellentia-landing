"use client";

import { useEffect, useRef } from "react";

/** Reproduce solo cuando el video entra en pantalla y pausa al salir. */
export default function AboutVideo({ title }: { title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() se rechaza si el navegador bloquea autoplay; los controles quedan disponibles.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src="/videos/We are excellentia foods your partner for authentic Latino staples.webm"
      title={title}
      aria-label={title}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      className="block h-auto w-full"
    />
  );
}
