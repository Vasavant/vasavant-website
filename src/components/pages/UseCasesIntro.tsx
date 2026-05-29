import { getTranslations } from 'next-intl/server';
import type { StatItem } from '@/lib/content-types';

export async function UseCasesIntro() {
  const t = await getTranslations('pages.useCases');
  const stats = t.raw('stats') as StatItem[];

  return (
    <section className="section-cream section-pad pb-0 lg:pb-0">
      <div className="section-inner">
        <p className="text-lg text-[var(--ink-muted)] leading-relaxed max-w-3xl mb-10 lg:mb-12">
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="sticker-card card-hover-lift p-6 text-center"
            >
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--cta)] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--ink-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
