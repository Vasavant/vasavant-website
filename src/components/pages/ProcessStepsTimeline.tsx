import { getTranslations } from 'next-intl/server';
import { getProcessSteps } from '@/lib/messages';

export async function ProcessStepsTimeline() {
  const t = await getTranslations('pages.process');
  const tContent = await getTranslations('content');
  const steps = getProcessSteps(tContent.raw('processSteps'));

  return (
    <section className="section-cream-alt section-pad">
      <div className="section-inner">
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3">
            {t('stepsTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">{t('stepsSubtitle')}</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="sticker-card p-6 lg:p-8 flex gap-5">
              <span
                className="font-display font-extrabold text-4xl text-[var(--cta)]/20 leading-none shrink-0"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
