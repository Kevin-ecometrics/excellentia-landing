export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

// El ingles vive en la raiz (/) y el espanol bajo /es. Mantener el ingles sin
// prefijo evita romper las URLs ya indexadas.
export const defaultLocale: Locale = "en";

// Rutas traducidas. Privacy Policy y el EULA existen solo en ingles (son
// documentos de la aplicacion interna de QuickBooks), asi que desde /es se
// enlazan a la version en ingles.
export const localizedRoutes = ["/", "/terms-and-conditions/"] as const;

export function hasTranslation(path: string) {
  return (localizedRoutes as readonly string[]).includes(path);
}

/** Convierte una ruta "canonica" (en ingles) a su equivalente en `locale`. */
export function localizedPath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  return path === "/" ? "/es/" : `/es${path}`;
}

/** Quita el prefijo /es de una ruta para volver a su forma canonica. */
export function stripLocale(pathname: string) {
  if (pathname === "/es" || pathname === "/es/") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

/** El sitio usa `trailingSlash: true`; usePathname() no siempre lo incluye. */
export function withTrailingSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
