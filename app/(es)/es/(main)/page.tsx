import type { Metadata } from "next";
import HomeSections from "@/app/components/home-sections";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

export const metadata: Metadata = {
  alternates: alternatesFor("es", "/"),
};

export default function Home() {
  return <HomeSections dict={getDictionary("es")} />;
}
