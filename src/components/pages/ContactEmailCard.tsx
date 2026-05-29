import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CONTACT_EMAIL } from '@/lib/routes';

export async function ContactEmailCard() {
  const t = await getTranslations('pages.contact');

  return (
    <section className="section-cream-alt section-pad">
      <div className="section-inner flex justify-center">
        <div className="sticker-card p-10 lg:p-14 text-center max-w-lg w-full">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--border-ink)] mb-6">
            <Mail className="w-6 h-6 text-[var(--ink)]" strokeWidth={1.75} />
          </div>
          <p className="hand-label mb-3">{t('emailLabel')}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] hover:text-[var(--cta)] transition-colors break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-6 text-sm text-[var(--ink-muted)]">{t('responseTime')}</p>
        </div>
      </div>
    </section>
  );
}
