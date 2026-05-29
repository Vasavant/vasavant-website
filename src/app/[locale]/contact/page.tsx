import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/pages/PageHero';
import { ContactEmailCard } from '@/components/pages/ContactEmailCard';
import { routing, type Locale } from '@/i18n/routing';
import { buildPageMetadata, staticLocalizedPath } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return buildPageMetadata({
    locale: locale as Locale,
    getLocalizedPath: staticLocalizedPath('/contact'),
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.contact');

  return (
    <SiteShell>
      <PageHero
        layout="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/images/contact-page.png"
        imageAlt={t('hero.imageAlt')}
        priority
      />
      <ContactEmailCard />
    </SiteShell>
  );
}
