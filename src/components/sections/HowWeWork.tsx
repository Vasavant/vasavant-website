import { Clock, Search, Layers, Bot } from 'lucide-react';
import type { ProcessPillar } from '@/lib/content';
import { processPillars } from '@/lib/content';

const iconMap = {
  clock: Clock,
  search: Search,
  layers: Layers,
  bot: Bot,
} as const;

function ProcessIcon({ icon }: { icon: ProcessPillar['icon'] }) {
  const Icon = iconMap[icon];
  return (
    <div className="w-12 h-12 rounded-full border border-[var(--border-ink)] flex items-center justify-center text-[var(--ink)] mb-5">
      <Icon className="w-5 h-5" strokeWidth={1.75} />
    </div>
  );
}

export function HowWeWork() {
  return (
    <section id="process" className="section-cream section-pad">
      <div className="section-inner">
        <p className="hand-label mb-4">Our process</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-[var(--ink)] mb-14 lg:mb-16">
          How we work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {processPillars.map((pillar) => (
            <div key={pillar.title}>
              <ProcessIcon icon={pillar.icon} />
              <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 pt-8 border-t border-[var(--border-ink)] text-sm text-[var(--ink-muted)]">
          Typical deployment:{' '}
          <span className="font-semibold text-[var(--ink)]">4-12 weeks</span> depending on scope.
          Full eight-step execution available on engagement.
        </p>
      </div>
    </section>
  );
}
