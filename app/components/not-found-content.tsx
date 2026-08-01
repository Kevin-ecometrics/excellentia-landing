import Image from "next/image";
import { localizedPath, type Dictionary, type Locale } from "@/app/i18n";

/** Pagina 404, compartida por ambos idiomas. */
export default function NotFoundContent({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <main className="flex flex-1 flex-col bg-default-teal">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <Image
          src="/logos/V1/LOGO EXCELLENTIA SIN FONDO.png"
          alt={dict.common.logoAlt}
          title={dict.common.logoTitle}
          width={320}
          height={320}
          priority
          className="h-auto w-56 object-contain sm:w-72"
        />
        <h1 className="mt-8 font-main text-8xl font-bold tracking-tight text-default-ivory sm:text-9xl">
          404
        </h1>
        <p className="mt-2 text-lg text-default-ivory/80 sm:text-xl font-support2">
          {dict.notFound.title}
        </p>
        <a
          href={localizedPath(locale, "/")}
          className="mt-8 rounded-full bg-default-ivory px-8 py-3 font-support2 text-base font-bold text-default-teal transition-transform hover:scale-105"
        >
          {dict.notFound.cta}
        </a>
      </div>

      <div className="flex flex-col items-center gap-3 px-6 pb-8 text-sm text-default-ivory/70">
        <div className="flex flex-wrap font-support2 justify-center gap-x-4 gap-y-1">
          <a
            href={localizedPath(locale, "/terms-and-conditions/")}
            className="underline-offset-2 hover:underline"
          >
            {dict.nav.terms}
          </a>
          <a
            href="/End-User-Licensing-Agreement/"
            hrefLang="en"
            className="underline-offset-2 hover:underline"
          >
            {dict.nav.eulaShort}
          </a>
          <a
            href="/privacy-policy/"
            hrefLang="en"
            className="underline-offset-2 hover:underline"
          >
            {dict.nav.privacy}
          </a>
        </div>
        <div className="border-t border-default-ivory/20 pt-3 text-center font-support2">
          &copy; {new Date().getFullYear()} {dict.footer.copyright}
        </div>
      </div>
    </main>
  );
}
