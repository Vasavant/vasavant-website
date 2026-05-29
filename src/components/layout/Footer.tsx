import { Mail, Share2 } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { VasaVantLogo } from '@/components/ui/VasaVantLogo';
import { Link } from '@/i18n/navigation';
import { useCaseHref } from '@/lib/use-case-link';
import type { Locale } from '@/i18n/routing';
import { CONTACT_EMAIL, type UseCaseSlug } from '@/lib/routes';

const useCaseFooterSlugs: UseCaseSlug[] = [
  'logistics',
  'field-operations',
  'commercial-operations',
];

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const tContent = await getTranslations('content');
  const useCaseCards = tContent.raw('useCaseCards') as Array<{
    slug: UseCaseSlug;
    title: string;
  }>;

  return (
    <footer className="section-navy">
      <div className="section-inner pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex mb-5 opacity-90 hover:opacity-100 transition-opacity">
              <VasaVantLogo variant="on-dark" />
            </Link>
            <p className="font-display font-semibold text-lg text-white mb-2">
              {t('tagline')}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">{t('description')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                {t('servicesTitle')}
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/services" className="footer-link">
                    {t('serviceLinks.intelligenceSystems')}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="footer-link">
                    {t('serviceLinks.dataAutomation')}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="footer-link">
                    {t('serviceLinks.conversationalBi')}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="footer-link">
                    {t('serviceLinks.agenticOperations')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                {t('companyTitle')}
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a href="/#problem" className="footer-link">
                    {t('companyLinks.theProblem')}
                  </a>
                </li>
                <li>
                  <a href="/#method" className="footer-link">
                    {t('companyLinks.theMethod')}
                  </a>
                </li>
                <li>
                  <Link href="/use-cases" className="footer-link">
                    {t('companyLinks.useCases')}
                  </Link>
                </li>
                <li>
                  <Link href="/process" className="footer-link">
                    {t('companyLinks.process')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="footer-link">
                    {t('companyLinks.resources')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                {tNav('useCases')}
              </p>
              <ul className="space-y-2.5">
                {useCaseFooterSlugs.map((slug) => {
                  const card = useCaseCards.find((c) => c.slug === slug);
                  return (
                    <li key={slug}>
                      <Link href={useCaseHref(locale, slug)} className="footer-link">
                        {card?.title ?? slug}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="/use-cases" className="footer-link font-medium text-white/90">
                    {tNav('viewAllUseCases')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                {t('contactTitle')}
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="footer-link">
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label={t('emailAria')}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label={t('shareAria')}
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label={t('legalNavAria')}>
              <Link href="/terms" className="text-white/50 hover:text-white/80 transition-colors">
                {t('legalLinks.terms')}
              </Link>
              <Link href="/privacy" className="text-white/50 hover:text-white/80 transition-colors">
                {t('legalLinks.privacy')}
              </Link>
            </nav>
            <p className="text-xs text-white/50">
              &copy; {currentYear} VasaVant. {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
