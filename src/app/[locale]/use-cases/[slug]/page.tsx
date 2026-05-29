import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageCta } from '@/components/pages/PageCta';
import { UseCaseBreadcrumbJsonLd } from '@/components/seo/UseCaseBreadcrumbJsonLd';
import { UseCaseDetailContent } from '@/components/pages/UseCaseDetailContent';
import type { UseCaseDetailContent as UseCaseDetailType } from '@/lib/content-types';
import { routing, type Locale } from '@/i18n/routing';
import {
  USE_CASE_SLUGS,
  getLocalizedUseCaseSlug,
  resolveUseCaseSlug,
  type UseCaseSlug,
} from '@/lib/routes';
import { getPathname } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getDetail(
  locale: Locale,
  useCaseKey: UseCaseSlug
): Promise<UseCaseDetailType> {
  const t = await getTranslations({
    locale,
    namespace: `pages.useCaseDetail.${useCaseKey}`,
  });

  return {
    meta: {
      title: t('meta.title'),
      description: t('meta.description'),
    },
    hero: {
      eyebrow: t('hero.eyebrow'),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      imageAlt: t('hero.imageAlt'),
    },
    challengesTitle: t('challengesTitle'),
    challenges: t.raw('challenges') as string[],
    outcomesTitle: t('outcomesTitle'),
    outcomes: t.raw('outcomes') as string[],
    capabilitiesTitle: t('capabilitiesTitle'),
    capabilities: t.raw('capabilities') as string[],
    imageAlt: t('imageAlt'),
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    USE_CASE_SLUGS.map((slug) => ({
      locale,
      slug: getLocalizedUseCaseSlug(locale, slug),
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug: slugParam } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const useCaseKey = resolveUseCaseSlug(locale, slugParam);
  if (!useCaseKey) return {};

  const detail = await getDetail(locale as Locale, useCaseKey);
  return buildPageMetadata({
    locale: locale as Locale,
    getLocalizedPath: (targetLocale) =>
      getPathname({
        locale: targetLocale,
        href: {
          pathname: '/use-cases/[slug]',
          params: { slug: getLocalizedUseCaseSlug(targetLocale, useCaseKey) },
        },
      }),
    title: detail.meta.title,
    description: detail.meta.description,
  });
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { locale, slug: slugParam } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const useCaseKey = resolveUseCaseSlug(locale, slugParam);
  if (!useCaseKey) notFound();

  setRequestLocale(locale);
  const detail = await getDetail(locale, useCaseKey);

  return (
    <SiteShell>
      <UseCaseBreadcrumbJsonLd
        locale={locale as Locale}
        slugParam={slugParam}
        title={detail.hero.title}
      />
      <UseCaseDetailContent slug={useCaseKey} content={detail} />
      <PageCta />
    </SiteShell>
  );
}
