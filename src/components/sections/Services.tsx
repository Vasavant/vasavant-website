import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { getCoreCapabilities, getFeaturedServices } from '@/lib/messages';

export async function Services() {
  const t = await getTranslations('services');
  const tContent = await getTranslations('content');
  const featuredServices = getFeaturedServices(tContent.raw('featuredServices'));
  const coreCapabilities = getCoreCapabilities(tContent.raw('coreCapabilities'));

  return (
    <section id="services" className="section-navy section-pad">
      <div className="section-inner">
        <div className="text-center mb-14 lg:mb-16">
          <p className="hand-label text-white/60 mb-4">{t('label')}</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-white tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {featuredServices.map((service) => (
            <article key={service.title} className="sticker-card-dark p-8 lg:p-10 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cta)] mb-2">
                {service.subtitle}
              </p>
              <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-4">
                {service.title}
              </h3>
              <p className="text-[var(--ink-muted)] leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-[var(--ink-muted)]">
                    <Check className="w-4 h-4 text-[var(--cta)] shrink-0 mt-0.5" strokeWidth={2.5} />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="md" href="#cta" className="self-start">
                {t('getStarted')}
              </Button>
            </article>
          ))}
        </div>

        <div className="border-t border-white/10 pt-10">
          <p className="hand-label text-white/50 text-center mb-6">{t('alsoIncluded')}</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {coreCapabilities.map((cap) => (
              <li key={cap} className="text-sm text-white/80 font-medium">
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
