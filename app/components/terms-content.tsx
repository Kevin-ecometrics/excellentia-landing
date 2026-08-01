import LogoBanner from "@/app/components/logo-banner";
import type { Dictionary } from "@/app/i18n";

/** Terminos y condiciones, compartidos por ambos idiomas. */
export default function TermsContent({ dict }: { dict: Dictionary }) {
  return (
    <>
      <LogoBanner dict={dict} />
      <main className="w-full bg-default-ivory px-6 py-16 text-default-navy sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-support1 text-3xl text-default-navy sm:text-4xl lg:text-5xl">
            {dict.terms.heading}
          </h1>
          <p className="mt-3 font-support2 text-sm text-default-navy/60">
            {dict.terms.org}
          </p>

          {dict.terms.legalNotice && (
            <p className="mt-6 rounded-lg border border-default-navy/15 bg-white/60 p-4 font-support2 text-sm text-default-navy/70">
              {dict.terms.legalNotice}
            </p>
          )}

          <ol className="mt-10 space-y-5 sm:mt-12">
            {dict.terms.clauses.map((clause, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-xl border border-default-navy/10 bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-default-teal font-support2 text-sm font-bold text-default-ivory"
                >
                  {index + 1}
                </span>
                <p className="font-support2 leading-relaxed text-default-navy/90">
                  {clause}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
