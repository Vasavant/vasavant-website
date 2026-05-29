export function Solution() {
  const maturitySteps = [
    'Scattered data',
    'Structured data',
    'Defined processes',
    'Automations',
    'Dashboards',
    'Conversational access',
    'Digital agents',
  ];

  return (
    <>
      <section className="section-navy section-pad">
        <div className="section-inner">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-w-4xl">
            <div
              className="shrink-0 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
              aria-hidden="true"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M6 16h20M16 6v20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
              </svg>
            </div>
            <h2
              id="method"
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight"
            >
              We&apos;re transparent with the stack: structure first, intelligence second.
            </h2>
          </div>
        </div>
      </section>

      <section className="section-cream-alt section-pad">
        <div className="section-inner">
          <p className="hand-label mb-4">The maturity track</p>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-12 max-w-xl">
            The Maturity Track
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
            {maturitySteps.map((step, index) => (
              <div key={step} className="flex flex-col">
                <span className="text-xs font-mono text-[var(--cta)] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-semibold text-[var(--ink)] leading-snug">{step}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 text-base text-[var(--ink-muted)] max-w-2xl leading-relaxed">
            VasaVant guides your organization through this progression, building each layer
            systematically until you achieve full operational intelligence.
          </p>
        </div>
      </section>
    </>
  );
}
