import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/routes';
import { ArrowRight } from 'lucide-react';

export async function PageCta() {
  const t = await getTranslations('pages.common');

  return (
    <section className="section-cream-alt section-pad border-t border-[var(--border-ink)]">
      <div className="section-inner">
        <div className="sticker-card p-8 lg:p-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed mb-8">{t('ctaDescription')}</p>
          <Button variant="primary" size="lg" href={`mailto:${CONTACT_EMAIL}`}>
            {t('ctaButton')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
