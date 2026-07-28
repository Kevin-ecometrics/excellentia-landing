"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Product = {
  name: string;
  image: string;
  video: string;
};

const products: Product[] = [
  {
    name: "Reynaldo's Premium Cured Pork Longaniza Sausage",
    image:
      "/products/Reynaldos premium pork cured longaniza sausage distributed by excellentia foods.png",
    video: "/products/Longaniza de puerco.mp4",
  },
  {
    name: "Excelsior Cotija Cheese",
    image:
      "/products/Excellentia foods distributes excelsior cotija cheese.png",
    video: "/products/Queso cotija.mp4",
  },
  {
    name: "Juquilita Mole Paste",
    image: "/products/Excellentia foods distributes juquilita mole paste.webp",
    video: "/products/Mole video.mp4",
  },
];

function ProductCard({
  product,
  loading,
}: {
  product: Product;
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
          title={`${product.name} – distributed by Excellentia Foods`}
          fill
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading={loading}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="pointer-events-none object-contain p-10 sm:p-12 lg:p-14"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 pt-3 pb-16 text-left transition-colors duration-300 group-hover:bg-default-mustard/30">
        <p className="font-support2 text-sm font-bold text-default-navy sm:text-base">
          {product.name}
        </p>
      </div>
    </div>
  );
}

export default function BestSellers() {
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
    <section className="w-full bg-white pt-16 text-default-navy ">
      <div className="flex flex-col items-start px-6 font-bold sm:flex-row sm:items-end sm:justify-between sm:px-10 lg:px-16">
        <h2 className="font-support2 text-2xl sm:text-3xl lg:text-4xl">
          Request Wholesale Catalog & Price List
        </h2>
        <p className="mt-6 inline-flex items-center gap-2 font-support2 text-default-navy transition-all hover:cursor-pointer hover:gap-3">
          See All Products
          <span aria-hidden="true">→</span>
        </p>
      </div>
      <div ref={viewportRef} className="relative mt-8 overflow-hidden">
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
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent sm:w-24 lg:hidden" />
      </div>
    </section>
  );
}
