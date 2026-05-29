import { getTranslations } from 'next-intl/server';
import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { getServicesDetailed } from '@/lib/messages';

const splitServiceImages = [
  '/images/services-page.png',
  '/images/services-agentic.png',
] as const;

export async function ServicesSplitSection() {
  const t = await getTranslations('pages.services');
  const tContent = await getTranslations('content');
  const services = getServicesDetailed(tContent.raw('servicesDetailed'));

  return (
    <section className="section-cream section-pad relative overflow-hidden">
      <DoodleDecor
        variant="hatch-circle"
        className="absolute top-32 right-[3%] w-12 h-12 text-[var(--cta)] opacity-20 hidden lg:block"
      />

      <div className="section-inner relative">
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3">
            {t('splitTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">{t('splitSubtitle')}</p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cta)] mb-2">
                  {service.subtitle}
                </p>
                <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[var(--ink-muted)] leading-relaxed mb-8">
                  {service.description}
                </p>

                <p className="hand-label mb-4">{t('howItWorksLabel')}</p>
                <ol className="space-y-4 mb-8">
                  {service.howItWorks.map((step, stepIndex) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        className="font-display font-extrabold text-sm text-[var(--cta)] bg-[var(--cta)]/10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {stepIndex + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-[var(--ink)] text-sm mb-1">
                          {step.title}
                        </p>
                        <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="hand-label mb-3">{t('deliverablesLabel')}</p>
                <ul className="flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--border-ink)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <GeneratedIllustration
                src={splitServiceImages[index] ?? splitServiceImages[0]}
                alt={service.title}
                width={1200}
                height={675}
                className="rounded-2xl card-hover-lift"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
