import { FaqItem } from "@/lib/mock-data/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[20px] border border-black/5 bg-white p-5 shadow-sm open:shadow-md"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--crafty-ink)] marker:content-none">
            {item.question}
            <span className="shrink-0 text-xl text-[var(--crafty-accent-dark)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-[var(--crafty-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
