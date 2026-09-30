type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--crafty-accent-dark)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--crafty-ink)] sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-[var(--crafty-muted)]">{description}</p>}
    </div>
  );
}
