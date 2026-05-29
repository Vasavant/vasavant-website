import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/pages/PageHero';
import { PageCta } from '@/components/pages/PageCta';
import { UseCasesGrid } from '@/components/sections/UseCasesGrid';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.useCases' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function UseCasesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.useCases');

  return (
    <SiteShell>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/images/use-cases-hub.png"
        imageAlt={t('hero.imageAlt')}
        priority
      />
      <UseCasesGrid showHeader={false} />
      <PageCta />
    </SiteShell>
  );
}
