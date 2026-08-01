import type { Metadata } from "next";
import { fontVariables } from "@/app/fonts";
import { getDictionary, localizedPath, type Locale } from "@/app/i18n";
import { absoluteUrl } from "@/app/site-url";
import "./globals.css";

/**
 * Metadata comun a los dos root layouts. Cada idioma aporta su propio titulo,
 * descripcion y keywords desde el diccionario.
 */
export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(absoluteUrl("")),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    robots: "index, follow",
    authors: [{ name: "Excellentia Foods LLC" }],
    other: {
      publisher: "Excellentia Foods LLC",
    },
  };
}

/**
 * Alternates hreflang para una ruta canonica (la version en ingles del path).
 * Solo se declara `es` cuando esa ruta realmente existe traducida.
 */
export function alternatesFor(
  locale: Locale,
  canonicalPath: string,
  translated = true,
): Metadata["alternates"] {
  const languages: Record<string, string> = {
    en: absoluteUrl(canonicalPath),
  };

  if (translated) {
    languages.es = absoluteUrl(localizedPath("es", canonicalPath));
  }

  languages["x-default"] = absoluteUrl(canonicalPath);

  return {
    canonical: absoluteUrl(localizedPath(locale, canonicalPath)),
    languages,
  };
}

export default function RootShell({
  lang,
  children,
}: Readonly<{
  lang: Locale;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang}
      className={`${fontVariables} h-full scroll-smooth antialiased`}
    >
      <body
        className="flex min-h-screen flex-col bg-white"
        suppressHydrationWarning
      >
        <div className="flex flex-1 flex-col bg-white">{children}</div>
      </body>
    </html>
  );
}
