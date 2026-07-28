"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FaqItem[] = [
  {
    question: "Why Partner with Excellentia Foods?",
    answer: (
      <>
        We don&apos;t just drop off pallets; we manage your inventory&apos;s
        success with:
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Direct Store Delivery (DSD)</li>
          <li>Refrigerated Merchandising &amp; Placement</li>
          <li>Strict FIFO Product Rotation</li>
          <li>In-Store Product Demonstrations</li>
          <li>Exclusive Hispanic Products</li>
        </ul>
      </>
    ),
  },
  {
    question: "What kind of products does Excellentia Foods Offer?",
    answer: (
      <div className="space-y-3 max-w-5xl">
        <p>
          From easy-crumble queso fresco and meltable queso Oaxaca to queso
          cotija and traditional queso panela, shredded mozarella, monterey
          jack, cheddar, and more
        </p>
        <p>
          <strong className="font-bold">Creams &amp; Cremas:</strong> Rich,
          velvety crema mexicana and crema centroamericana designed for
          traditional dishes, milk, yogurts
        </p>
        <p>
          <strong className="font-bold">Premium Cold Cuts &amp; Meats:</strong>{" "}
          Traditional chorizos, longaniza, sausages, chicharron, bacon
        </p>
        <p>
          <strong className="font-bold">More:</strong> Salsas, beef seasoning,
          adobo, mole paste, flan napolitano, tamales, rice puddings, and more
        </p>
      </div>
    ),
  },
];

function FaqRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-support2 text-base font-bold sm:text-lg">
          {faq.question}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 flex-none transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 font-support2 text-sm text-default-navy/80 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-default-ivory px-6 py-24 text-default-navy sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-support1 text-4xl sm:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 divide-y divide-default-navy/20 border-t border-default-navy/20">
          {faqs.map((faq, index) => (
            <FaqRow
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
