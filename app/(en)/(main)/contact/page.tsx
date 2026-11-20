import type { Metadata } from "next";
import ContactSections from "@/app/components/contact-sections";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

const dict = getDictionary("en");

export const metadata: Metadata = {
  title: dict.contact.meta.title,
  description: dict.contact.meta.description,
  alternates: alternatesFor("en", "/contact/"),
};

export default function Contact() {
  return <ContactSections locale="en" dict={dict} />;
}
