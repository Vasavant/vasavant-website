import { Brain, Workflow, BarChart3, AppWindow } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getCoreCapabilitiesDetailed } from '@/lib/messages';
import type { CoreCapability } from '@/lib/content-types';

const iconMap = {
  brain: Brain,
  workflow: Workflow,
  chart: BarChart3,
  app: AppWindow,
} as const;

function CapabilityIcon({ icon }: { icon: CoreCapability['icon'] }) {
  const Icon = iconMap[icon];
  return (
    <div className="w-11 h-11 rounded-xl bg-[var(--cta)]/10 flex items-center justify-center text-[var(--cta)] mb-5">
      <Icon className="w-5 h-5" strokeWidth={1.75} />
    </div>
  );
}

export async function ServicesCapabilities() {
  const t = await getTranslations('pages.services');
  const tContent = await getTranslations('content');
  const capabilities = getCoreCapabilitiesDetailed(tContent.raw('coreCapabilitiesDetailed'));

  return (
    <section className="section-cream-alt section-pad">
      <div className="section-inner">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3">
            {t('capabilitiesTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">{t('capabilitiesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {capabilities.map((cap) => (
            <article key={cap.title} className="sticker-card card-hover-lift p-6 lg:p-8">
              <CapabilityIcon icon={cap.icon} />
              <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{cap.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
