import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { getFeaturedServices } from '@/lib/messages';

const splitServiceImages = [
  '/images/services-page.png',
  '/images/services-agentic.png',
] as const;

export async function ServicesSplitSection() {
  const t = await getTranslations('pages.services');
  const tContent = await getTranslations('content');
  const featuredServices = getFeaturedServices(tContent.raw('featuredServices'));

  return (
    <section className="section-cream section-pad">
      <div className="section-inner">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-12 lg:mb-16 text-center">
          {t('splitTitle')}
        </h2>

        <div className="space-y-16 lg:space-y-24">
          {featuredServices.map((service, index) => (
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
                <p className="text-[var(--ink-muted)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
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
              </div>
              <GeneratedIllustration
                src={splitServiceImages[index] ?? splitServiceImages[0]}
                alt={service.title}
                width={1200}
                height={675}
                className="rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
