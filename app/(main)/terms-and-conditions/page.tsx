import type { Metadata } from "next";
import LogoBanner from "@/app/components/logo-banner";
import { absoluteUrl } from "@/app/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/terms-and-conditions/"),
  },
};

const terms = [
  "Seller retains title to the goods until buyer performs the entire contract and goods have been paid for in full. Seller retains a security interest in the goods, including all additions and replacements, to secure performance of all buyer's obligations under this contract.",
  "The buyer is responsible for any loss or damage to goods once they are in buyer's possession.",
  "Any claim of immediately apparent defect against delivered goods must be made upon receipt. In the case of hidden defects, buyer shall have no more than 3 days to present seller with a claim of defect.",
  "The goods sold in this invoice will only be used for resale.",
  "In any action which may be brought to enforce payment under this contract, seller shall be entitled to recover from buyer all the attorney fees seller incurs, in addition to seller's actual, incidental, and consequential damages.",
  "Buyer agrees to pay a fee of $30.00 for each check drawn on insufficient funds (NSF Check).",
  "Buyer agrees that jurisdiction and venue for any dispute under this contract are proper in San Diego, CA.",
];

export default function TermsAndConditions() {
  return (
    <>
      <LogoBanner />
      <main className="w-full bg-default-ivory px-6 py-16 text-default-navy sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-support1 text-3xl text-default-navy sm:text-4xl lg:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 font-support2 text-sm text-default-navy/60">
            Excellentia Foods LLC
          </p>

          <ol className="mt-10 space-y-5 sm:mt-12">
            {terms.map((term, index) => (
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
                  {term}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
