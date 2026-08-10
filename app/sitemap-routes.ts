import { hasTranslation, localizedPath } from "@/app/i18n/config";

export type SitemapRoute = {
  path: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: string;
  /** Rutas equivalentes por idioma, para las anotaciones hreflang. */
  alternates: { hreflang: string; path: string }[];
};

// Public, indexable pages only — excludes /_not-found and any
// private, admin, auth, or utility routes.
const canonicalRoutes: Omit<SitemapRoute, "alternates">[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about/", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy/", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions/", changefreq: "yearly", priority: "0.3" },
  {
    path: "/End-User-Licensing-Agreement/",
    changefreq: "yearly",
    priority: "0.3",
  },
];

function buildAlternates(path: string) {
  const alternates = [{ hreflang: "en", path }];

  if (hasTranslation(path)) {
    alternates.push({ hreflang: "es", path: localizedPath("es", path) });
  }

  alternates.push({ hreflang: "x-default", path });
  return alternates;
}

// Cada ruta traducida aparece dos veces (una por idioma), y ambas entradas
// declaran el mismo bloque de alternates.
export const sitemapRoutes: SitemapRoute[] = canonicalRoutes.flatMap(
  (route) => {
    const alternates = buildAlternates(route.path);
    const entries: SitemapRoute[] = [{ ...route, alternates }];

    if (hasTranslation(route.path)) {
      entries.push({
        ...route,
        path: localizedPath("es", route.path),
        alternates,
      });
    }

    return entries;
  },
);
