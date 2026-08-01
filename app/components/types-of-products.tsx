"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/app/i18n";

type Product = {
  name: string;
  image: string;
  video: string;
};

// Los nombres viven en el diccionario, en el mismo orden que estos assets.
const media = [
  {
    image:
      "/products/Excellentia foods distributes queso fresco from tio francisco.webp",
    video: "/products/queso fresco.mp4",
  },
  {
    image:
      "/products/Excellentia foods distributes  reynaldos beef chorizo.png",
    video: "/products/chorizo.mp4",
  },
  {
    image:
      "/products/Excellentia foods distributes  flan napolitano from juan j.webp",
    video: "/products/Flan.mp4",
  },
];

function ProductCard({
  product,
  titleSuffix,
  loading,
}: {
  product: Product;
  titleSuffix: string;
  loading: "eager" | "lazy";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="group flex h-full w-[85%] flex-none flex-col sm:w-[46%] lg:w-1/3"
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
      }}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-white">
        <video
          ref={videoRef}
          src={product.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <Image
          src={product.image}
          alt={product.name}
          title={`${product.name} – ${titleSuffix}`}
          fill
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading={loading}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="pointer-events-none object-contain p-10 sm:p-12 lg:p-14"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 pt-3 pb-16 text-left transition-colors duration-300 group-hover:bg-default-mustard/30">
        <p className="font-support2 text-xl text-center font-bold text-default-navy sm:text-4xl">
          {product.name}
        </p>
      </div>
    </div>
  );
}

export default function TypesOfProducts({ dict }: { dict: Dictionary }) {
  const products: Product[] = dict.typesOfProducts.products.map(
    (name, index) => ({ name, ...media[index] }),
  );
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [minX, setMinX] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      setMinX(Math.min(0, viewport.offsetWidth - track.scrollWidth));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, []);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    const cardWidth = card?.getBoundingClientRect().width ?? 0;
    if (!cardWidth) return;

    const projected = x.get() + info.velocity.x * 0.15;
    let target = Math.round(projected / cardWidth) * cardWidth;
    target = Math.max(minX, Math.min(0, target));

    animate(x, target, { type: "spring", stiffness: 300, damping: 32 });
  };

  return (
    <section className="w-full bg-white text-default-navy">
      <div ref={viewportRef} className="relative overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              titleSuffix={dict.common.productTitleSuffix}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent sm:w-24 lg:hidden" />
      </div>
    </section>
  );
}
