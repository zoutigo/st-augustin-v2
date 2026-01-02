"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface LandingFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const LandingFaqCarousel = ({ faqs }: { faqs: LandingFaqItem[] }) => {
  const [perPage, setPerPage] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3,
  );
  const makeInitialSlots = (count: number, length: number) => {
    const itemCount = Math.max(1, length);
    const visible = Math.max(1, Math.min(count, itemCount));
    return Array.from({ length: visible }, (_v, i) => i % itemCount);
  };

  const [slots, setSlots] = useState<number[]>(
    makeInitialSlots(perPage, faqs.length),
  );
  const cursorRef = useRef(perPage % Math.max(1, faqs.length));
  const slotRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      setPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setSlots(makeInitialSlots(perPage, faqs.length));
    cursorRef.current = perPage % Math.max(1, faqs.length);
    slotRef.current = 0;
  }, [perPage, faqs.length]);

  useEffect(() => {
    if (faqs.length === 0) return;
    const timer = setInterval(() => {
      setSlots((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const targetSlot = slotRef.current % prev.length;
        next[targetSlot] = cursorRef.current % faqs.length;
        slotRef.current = (slotRef.current + 1) % prev.length;
        cursorRef.current = (cursorRef.current + 1) % faqs.length;
        return next;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [faqs.length]);

  const visibleFaqs = useMemo(() => {
    return slots
      .map((idx, slot) => ({
        item: faqs[idx],
        realIndex: slot,
      }))
      .filter((entry) => entry.item);
  }, [slots, faqs]);

  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl bg-white/80 p-6 text-center text-secondary shadow-md">
        Aucune question disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div
        className="grid gap-4 md:gap-6"
        style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
      >
        {visibleFaqs.map(({ item: faq, realIndex }) => (
          <article
            key={`${realIndex}-${faq.id}`}
            className={`rounded-2xl p-5 md:p-7 shadow-md border border-slate-200/60 ${
              realIndex % 2 === 0
                ? "bg-gradient-to-br from-white/90 via-slate-50 to-primary/5"
                : "bg-gradient-to-br from-secondary/5 via-white to-primary/10"
            }`}
          >
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-primary/80 mb-3">
              {faq.category || "FAQ"}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-4 line-clamp-2">
              {faq.question}
            </h3>
            <div className="space-y-2 text-secondary/85">
              <p className="text-base md:text-lg leading-relaxed text-secondary/80 line-clamp-5">
                {faq.answer}
              </p>
            </div>
          </article>
        ))}
      </div>
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-24px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        article {
          animation: slide-in-left 0.5s ease;
        }
      `}</style>
    </div>
  );
};
