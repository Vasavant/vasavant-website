import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { LegalDocument } from '@/components/pages/LegalDocument';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

type LegalSection = {
  title: string;
  paragraphs: string[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
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
