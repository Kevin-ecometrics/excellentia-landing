"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/app/i18n";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

function buildFaqs(dict: Dictionary): FaqItem[] {
  return [
    {
      question: dict.faq.partner.question,
      answer: (
        <>
          {dict.faq.partner.intro}
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {dict.faq.partner.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      question: dict.faq.products.question,
      answer: (
        <div className="space-y-3 max-w-5xl">
          <p>{dict.faq.products.intro}</p>
          {dict.faq.products.sections.map((section) => (
            <p key={section.label}>
              <strong className="font-bold">{section.label}</strong>
              {section.text}
            </p>
          ))}
        </div>
      ),
    },
  ];
}

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

export default function Faq({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = buildFaqs(dict);

  return (
    <section className="w-full bg-default-ivory px-6 py-24 text-default-navy sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-support1 text-4xl sm:text-5xl lg:text-6xl">
          {dict.faq.heading}
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
