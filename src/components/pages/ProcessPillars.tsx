import { Clock, Search, Layers, Bot } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { DoodleDecor } from '@/components/ui/DoodleDecor';
import type { ProcessPillar } from '@/lib/content-types';
import { getProcessPillars } from '@/lib/messages';

const iconMap = {
  clock: Clock,
  search: Search,
  layers: Layers,
  bot: Bot,
} as const;

function PillarIcon({ icon }: { icon: ProcessPillar['icon'] }) {
  const Icon = iconMap[icon];
  return (
    <div className="w-12 h-12 rounded-full border border-[var(--border-ink)] bg-white flex items-center justify-center text-[var(--cta)] mb-5">
      <Icon className="w-5 h-5" strokeWidth={1.75} />
    </div>
  );
}

export async function ProcessPillars() {
  const t = await getTranslations('pages.process');
  const tHow = await getTranslations('howWeWork');
  const tContent = await getTranslations('content');
  const pillars = getProcessPillars(tContent.raw('processPillars'));

  return (
    <section className="section-cream section-pad relative overflow-hidden">
      <DoodleDecor
        variant="stripe-circle"
        className="absolute top-24 left-[5%] w-12 h-12 text-[var(--cta)] opacity-20 hidden lg:block"
      />

      <div className="section-inner relative">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-lg text-[var(--ink-muted)] leading-relaxed mb-8">{t('intro')}</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3">
            {t('pillarsTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">{t('pillarsSubtitle')}</p>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--border-ink)]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="sticker-card card-hover-lift p-6 lg:p-7 relative"
              >
                <span
                  className="absolute -top-3 left-6 font-display font-extrabold text-xs text-white bg-[var(--cta)] w-6 h-6 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <PillarIcon icon={pillar.icon} />
                <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-12 pt-8 border-t border-[var(--border-ink)] text-sm text-[var(--ink-muted)]">
          {tHow('footerPrefix')}{' '}
          <span className="font-semibold text-[var(--ink)]">{tHow('footerWeeks')}</span>{' '}
          {tHow('footerSuffix')}
        </p>
      </div>
    </section>
  );
}
