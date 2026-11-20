import type { Metadata } from "next";
import ProgressSections from "@/app/components/progress-sections";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.progress.meta.title,
  description: dict.progress.meta.description,
  alternates: alternatesFor("es", "/progress/"),
};

export default function Progress() {
  return <ProgressSections dict={dict} />;
}
