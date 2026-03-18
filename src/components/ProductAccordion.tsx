"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string[];
}

const ITEMS: AccordionItem[] = [
  {
    title: "Product Details",
    content: [
      "Embroidered organza front and back panels",
      "Hand-embellished neckline with pearls and crystals",
      "Raw silk undershirt and cigarette pants",
      "Embroidered net dupatta with scalloped borders",
    ],
  },
  {
    title: "Care Instructions",
    content: [
      "Dry clean only",
      "Store in a cool, dry place away from sunlight",
      "Do not bleach or tumble dry",
      "Iron on low heat with a pressing cloth",
    ],
  },
  {
    title: "Shipping & Returns",
    content: [
      "Free domestic shipping on all orders",
      "International shipping available",
      "Returns accepted within 7 days of delivery",
      "Items must be unworn and in original packaging",
    ],
  },
];

export default function ProductAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8 border-t border-primary/10">
      {ITEMS.map((item, i) => (
        <div key={item.title} className="border-b border-primary/10">
          <button
            className="w-full py-4 flex items-center justify-between"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <h3 className="font-bold uppercase tracking-widest text-sm text-left">
              {item.title}
            </h3>
            <span
              className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>

          {open === i && (
            <div className="pb-4 text-sm text-slate-600 space-y-2">
              {item.content.map((line) => (
                <p key={line}>• {line}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
