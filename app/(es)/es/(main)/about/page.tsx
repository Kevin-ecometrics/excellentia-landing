import type { Metadata } from "next";
import AboutSections from "@/app/components/about-sections";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.about.meta.title,
  description: dict.about.meta.description,
  alternates: alternatesFor("es", "/about/"),
};

export default function About() {
  return <AboutSections dict={dict} />;
}
