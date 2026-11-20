import type { Metadata } from "next";
import ContactSections from "@/app/components/contact-sections";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.contact.meta.title,
  description: dict.contact.meta.description,
  alternates: alternatesFor("es", "/contact/"),
};

export default function Contact() {
  return <ContactSections locale="es" dict={dict} />;
}
