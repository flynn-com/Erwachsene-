import { FaqItem } from "@/lib/mock-data/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t-2 border-[var(--crafty-ink)]">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-[var(--crafty-ink)]/15 py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-[var(--crafty-ink)] marker:content-none sm:text-xl">
            {item.question}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--crafty-ink)]/20 text-xl transition-all group-open:rotate-45 group-open:bg-[var(--crafty-petrol)] group-open:text-white">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-[var(--crafty-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
