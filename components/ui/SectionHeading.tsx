type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-dark)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-black leading-[1.05] tracking-tighter text-[var(--crafty-ink)] sm:text-5xl lg:text-6xl">{title}</h2>
      {description && <p className="mt-5 text-lg text-[var(--crafty-muted)]">{description}</p>}
    </div>
  );
}
