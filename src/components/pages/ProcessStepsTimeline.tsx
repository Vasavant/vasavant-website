import { getTranslations } from 'next-intl/server';
import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { getProcessSteps } from '@/lib/messages';

export async function ProcessStepsTimeline() {
  const t = await getTranslations('pages.process');
  const tContent = await getTranslations('content');
  const steps = getProcessSteps(tContent.raw('processSteps'));

  return (
    <section className="section-cream-alt section-pad relative overflow-hidden">
      <DoodleDecor
        variant="dots"
        className="absolute bottom-24 right-[5%] w-10 h-10 text-[var(--cta)] opacity-20 hidden lg:block"
      />

      <div className="section-inner relative">
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3">
            {t('stepsTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">{t('stepsSubtitle')}</p>
        </div>

        <ol className="relative max-w-3xl mx-auto">
          <div
            className="timeline-line absolute left-[1.125rem] top-4 bottom-4 w-px bg-[var(--border-ink)] lg:left-1/2 lg:-translate-x-px"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <li
                key={step.title}
                className={`relative flex items-start gap-6 pb-10 last:pb-0 lg:gap-0 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div
                  className={`hidden lg:block lg:w-1/2 ${isEven ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}
                >
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  <span className="timeline-dot font-display font-extrabold text-sm text-white bg-[var(--cta)] w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-[var(--paper-light)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div
                  className={`flex-1 lg:hidden ${isEven ? '' : ''}`}
                >
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="hidden lg:block lg:w-1/2" aria-hidden="true" />
              </li>
            );
          })}
        </ol>

        <p className="mt-12 lg:mt-16 max-w-2xl mx-auto text-center text-[var(--ink-muted)] leading-relaxed border-t border-[var(--border-ink)] pt-8">
          {t('outcome')}
        </p>
      </div>
    </section>
  );
}
