"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import type { Dictionary, Locale } from "@/app/i18n";

const EMAIL = "contact@excellentiafoods.com";

const inputClass =
  "mt-2 w-full rounded-lg border border-default-navy/20 bg-white px-4 py-3 font-support2 text-base text-default-navy focus-visible:border-default-teal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-default-teal";

/**
 * Pagina de contacto, compartida por ingles y espanol. El mapa ya vive en el footer.
 * El formulario envia a /send-contact (backend.js), que lo reenvia por SMTP a la bandeja del idioma.
 */
export default function ContactSections({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      setPending(true);
      setStatus(null);
      await axios.post("https://excellentiafoods.com/send-contact", { ...data, locale });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setPending(false);
    }
  };

  const info = [
    { label: t.phoneLabel, value: "619 621 6337", href: "tel:+16196216337" },
    { label: t.emailLabel, value: EMAIL, href: `mailto:${EMAIL}` },
    {
      label: dict.footer.officeLabel,
      value: dict.footer.officeAddress,
      href: "https://maps.app.goo.gl/xf2FEAhDGwMYwN76A",
    },
    {
      label: dict.footer.warehouseLabel,
      value: dict.footer.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dict.footer.address)}`,
    },
  ];

  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="flex w-full flex-col items-center bg-default-teal px-6 pt-36 pb-20 text-center sm:px-10 sm:pb-24 lg:px-16">
        <Image
          src="/logos/V1/LOGO EXCELLENTIA SIN FONDO.png"
          alt={dict.common.logoAlt}
          title={dict.common.logoTitle}
          width={400}
          height={400}
          loading="eager"
          fetchPriority="high"
          className="h-auto w-32 object-contain sm:w-40"
        />
        <p className="mt-6 font-support2 text-xs font-bold uppercase tracking-[0.35em] text-default-mustard sm:text-sm">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-support1 text-3xl text-default-ivory sm:text-4xl lg:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mt-5 max-w-xl font-support2 text-base text-default-ivory/85 sm:text-lg">
          {t.hero.subtitle}
        </p>
      </section>

      <section className="grid w-full grid-cols-1 gap-16 bg-default-ivory px-6 py-24 text-default-navy sm:px-10 lg:grid-cols-[2fr_3fr] lg:gap-20 lg:px-16">
        <div>
          <h2 className="font-support1 text-3xl text-default-teal sm:text-4xl">{t.infoHeading}</h2>
          <div aria-hidden="true" className="mt-6 h-1 w-24 bg-default-mustard" />
          <address className="mt-10 flex flex-col gap-8 not-italic">
            {info.map(({ label, value, href }) => (
              <div key={label}>
                <p className="font-support2 text-sm font-bold uppercase tracking-[0.2em] text-default-mustard">
                  {label}
                </p>
                <a
                  href={href}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="mt-2 block font-support2 text-lg leading-relaxed text-default-navy hover:underline sm:text-xl"
                >
                  {value}
                </a>
              </div>
            ))}
          </address>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-support1 text-3xl text-default-teal sm:text-4xl">{t.form.heading}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="font-support2 text-sm font-bold">
              {t.form.name}
              <input name="name" maxLength={120} required autoComplete="name" className={inputClass} />
            </label>
            <label className="font-support2 text-sm font-bold">
              {t.form.business}
              <input name="business" maxLength={160} autoComplete="organization" className={inputClass} />
            </label>
            <label className="font-support2 text-sm font-bold">
              {t.form.phone}
              <input name="phone" maxLength={40} type="tel" autoComplete="tel" className={inputClass} />
            </label>
            <label className="font-support2 text-sm font-bold">
              {t.form.email}
              <input name="email" maxLength={254} type="email" required autoComplete="email" className={inputClass} />
            </label>
            <label className="font-support2 text-sm font-bold sm:col-span-2">
              {t.form.message}
              <textarea name="message" maxLength={5000} required rows={5} className={inputClass} />
            </label>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-8 disabled:opacity-60 inline-flex items-center gap-2 rounded-full bg-default-teal px-8 py-3.5 font-support2 text-base font-bold text-default-ivory transition-colors hover:bg-default-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-mustard"
          >
            {pending ? t.form.sending : t.form.submit}
            <span aria-hidden="true">→</span>
          </button>
          <p role="status" className="mt-4 font-support2 text-sm text-default-navy/70">
            {status === "success" && t.form.success}
            {status === "error" && t.form.error}
          </p>
        </form>
      </section>
    </main>
  );
}
