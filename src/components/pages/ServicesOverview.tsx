import { Check, MessageSquare, Bot } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { Link } from '@/i18n/navigation';
import { getServicesDetailed } from '@/lib/messages';

const serviceIcons = [MessageSquare, Bot] as const;
const comparisonKeys = ['conversational', 'agentic'] as const;

export async function ServicesOverview() {
  const t = await getTranslations('pages.services');
  const tServices = await getTranslations('services');
  const tContent = await getTranslations('content');
  const services = getServicesDetailed(tContent.raw('servicesDetailed'));

  return (
    <section className="section-navy section-pad relative overflow-hidden">
      <DoodleDecor
        variant="dots"
        className="absolute top-16 right-[6%] w-12 h-12 text-white/20 hidden lg:block"
      />
      <DoodleDecor
        variant="squiggle"
        className="absolute bottom-20 left-[4%] w-14 h-10 text-[var(--cta)] opacity-20 hidden lg:block"
      />

      <div className="section-inner relative">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-lg text-white/70 leading-relaxed">{t('intro')}</p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {comparisonKeys.map((key) => (
            <span
              key={key}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80"
            >
              {t(`comparison.${key}`)}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? MessageSquare;

            return (
              <article
                key={service.title}
                className="sticker-card-dark card-hover-lift p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--cta)]/10 flex items-center justify-center text-[var(--cta)]">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--cta)] bg-[var(--cta)]/10 px-2.5 py-1 rounded-md">
                    {t(`comparison.${comparisonKeys[index] ?? 'conversational'}`)}
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cta)] mb-2">
                  {service.subtitle}
                </p>
                <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--ink-muted)] leading-relaxed mb-4">
                  {service.description}
                </p>

                <p className="text-sm font-semibold text-[var(--ink)] bg-[var(--paper)]/60 rounded-lg px-4 py-3 mb-6 border border-[var(--border-ink)]">
                  {service.outcome}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-[var(--ink-muted)]"
                    >
                      <Check
                        className="w-4 h-4 text-[var(--cta)] shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-[var(--ink-soft)] mb-6">
                  <span className="font-semibold text-[var(--ink-muted)]">
                    {t('idealForLabel')}:
                  </span>{' '}
                  {service.idealFor}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-[var(--cta)] text-white hover:bg-[var(--cta-hover)] shadow-md shadow-blue-600/20 px-5 py-2.5 text-sm rounded-lg self-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cta)]"
                >
                  {tServices('getStarted')}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
