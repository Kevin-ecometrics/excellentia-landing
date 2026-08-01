"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import {
  hasTranslation,
  localizedPath,
  otherLocale,
  stripLocale,
  withTrailingSlash,
  type Dictionary,
  type Locale,
} from "@/app/i18n";

const BANNER_HEIGHT = 96;

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setAtTop(latest <= BANNER_HEIGHT);
    if (latest <= BANNER_HEIGHT) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous);
  });

  // Si la pagina actual no existe en el otro idioma (Privacy Policy, EULA),
  // el switcher lleva al inicio de ese idioma en lugar de a un 404.
  const target = otherLocale(locale);
  const canonical = withTrailingSlash(stripLocale(withTrailingSlash(pathname)));
  const switchHref = localizedPath(
    target,
    hasTranslation(canonical) ? canonical : "/",
  );

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: hidden ? 0.15 : 0.3, ease: "easeInOut" }}
      className="group fixed inset-x-0 top-0 z-50 h-24 w-full"
    >
      <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)] transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-default-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full w-full items-center justify-center px-6">
        <nav className="absolute left-6 flex items-center gap-6 font-support2 text-base font-bold text-default-ivory sm:left-10 lg:left-16">
          <a href={localizedPath(locale, "/")} className="hover:underline">
            {dict.nav.home}
          </a>
          <span aria-disabled="true" className="cursor-pointer hover:underline">
            {dict.nav.about}
          </span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:underline"
          >
            {dict.nav.contact}
          </a>
        </nav>
        <div className="absolute right-6 flex items-center gap-4 font-support2 text-base font-bold text-default-ivory sm:right-10 lg:right-16">
          <a
            href={localizedPath(locale, "/terms-and-conditions/")}
            className="hidden hover:underline sm:inline"
          >
            {dict.nav.terms}
          </a>
          <a
            href={switchHref}
            hrefLang={target}
            aria-label={dict.nav.languageSwitchLabel}
            title={dict.nav.languageSwitchLabel}
            className="flex items-center gap-1.5 rounded-full border border-default-ivory/40 px-3 py-1 text-sm transition-colors hover:bg-default-ivory hover:text-default-navy"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 010 18a15 15 0 010-18z" />
            </svg>
            {dict.nav.languageSwitchText}
          </a>
        </div>
        <a
          href={localizedPath(locale, "/")}
          aria-label={dict.nav.homeAriaLabel}
          className={`transition-opacity ${
            atTop || hidden
              ? "pointer-events-none opacity-0 duration-150"
              : "opacity-100 duration-300"
          }`}
        >
          <Image
            src="/logos/V2/LOGO SECUNDATRIO SIN FONDO.png"
            alt={dict.common.logoAlt}
            title={dict.common.logoTitle}
            width={1873}
            height={1661}
            loading="eager"
            className="h-12 w-auto"
          />
        </a>
      </div>
    </motion.header>
  );
}
