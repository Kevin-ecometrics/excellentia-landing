import type { Metadata } from "next";
import TermsContent from "@/app/components/terms-content";
import { getDictionary } from "@/app/i18n";
import { alternatesFor } from "@/app/root-shell";

export const metadata: Metadata = {
  alternates: alternatesFor("en", "/terms-and-conditions/"),
};

export default function TermsAndConditions() {
  return <TermsContent dict={getDictionary("en")} />;
}
