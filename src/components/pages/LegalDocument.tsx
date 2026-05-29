interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="section-cream">
      <div className="section-inner section-pad">
        <header className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mb-6">{lastUpdated}</p>
          <p className="text-lg text-[var(--ink-muted)] leading-relaxed">{intro}</p>
        </header>

        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="text-[var(--ink-muted)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
