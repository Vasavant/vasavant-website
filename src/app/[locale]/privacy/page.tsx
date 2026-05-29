import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { LegalDocument } from '@/components/pages/LegalDocument';
import { routing, type Locale } from '@/i18n/routing';
import { buildPageMetadata, staticLocalizedPath } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

type LegalSection = {
  title: string;
  paragraphs: string[];
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  return buildPageMetadata({
    locale: locale as Locale,
    getLocalizedPath: staticLocalizedPath('/privacy'),
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.privacy');
  const sections = t.raw('sections') as LegalSection[];

  return (
    <SiteShell>
      <LegalDocument
        title={t('title')}
        lastUpdated={t('lastUpdated')}
        intro={t('intro')}
        sections={sections}
      />
    </SiteShell>
  );
}
