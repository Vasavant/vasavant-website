import { getTranslations } from 'next-intl/server';
import { getFaqItems } from '@/lib/messages';

export async function ServicesFaq() {
  const t = await getTranslations('pages.services');
  const faq = getFaqItems(t.raw('faq'));

  return (
    <section className="section-cream section-pad">
      <div className="section-inner max-w-3xl">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-8 lg:mb-10">
          {t('faqTitle')}
        </h2>

        <div className="space-y-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="sticker-card group card-hover-lift overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 lg:p-6 font-display font-semibold text-[var(--ink)] hover:text-[var(--cta)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cta)]">
                {item.question}
                <span
                  className="text-[var(--ink-soft)] text-xl leading-none transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
                <p className="text-[var(--ink-muted)] leading-relaxed border-t border-[var(--border-ink)] pt-4">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
