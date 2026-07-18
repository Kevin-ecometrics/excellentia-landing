"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const BANNER_HEIGHT = 96;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest <= BANNER_HEIGHT) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group fixed inset-x-0 top-0 z-50 h-24 w-full"
    >
      <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)] transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-default-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full w-full items-center justify-center px-6">
        <nav className="absolute left-6 flex items-center gap-6 font-support2 text-base font-bold text-default-ivory">
          <span aria-disabled="true" className="cursor-pointer hover:underline">
            About
          </span>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
        <Image
          src="/logos/V2/LOGO SECUNDATRIO SIN FONDO.png"
          alt="Excellentia Foods"
          width={1873}
          height={1661}
          loading="eager"
          className="h-12 w-auto"
        />
      </div>
    </motion.header>
  );
}
