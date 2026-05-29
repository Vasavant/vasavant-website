import { getTranslations } from 'next-intl/server';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { getHeroStats, getTrustedTools } from '@/lib/messages';

export async function Problem() {
  const t = await getTranslations('problem');
  const tContent = await getTranslations('content');
  const heroStats = getHeroStats(tContent.raw('heroStats'));
  const trustedTools = getTrustedTools(tContent.raw('trustedTools'));

  return (
    <section id="problem" className="section-cream-alt section-pad">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          <div>
            <p className="hand-label mb-4">{t('label')}</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-[var(--ink)] leading-tight mb-6">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
            </h2>
            <p className="text-lg text-[var(--ink-muted)] leading-relaxed max-w-lg">
              {t('description')}
            </p>
          </div>

          <div className="relative">
            <GeneratedIllustration
              src="/images/operations-map.png"
              alt={t('imageAlt')}
              width={1200}
              height={1200}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {heroStats.map((stat) => (
            <div key={stat.label} className="border-t border-[var(--border-ink)] pt-6">
              <p className="font-display font-extrabold text-4xl lg:text-5xl text-[var(--ink)] mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--ink-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="sticker-card px-6 py-8 lg:px-10 lg:py-10">
          <p className="hand-label text-center mb-6">{t('toolsLabel')}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedTools.map((tool) => (
              <span
                key={tool}
                className="font-display font-semibold text-sm sm:text-base text-[var(--ink-muted)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
