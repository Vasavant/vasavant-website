import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/seo/JsonLd';
import { getUseCaseCards } from '@/lib/messages';
import { absoluteUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';
import { useCaseHref } from '@/lib/use-case-link';

export async function UseCasesPageJsonLd({ locale }: { locale: Locale }) {
  const tPage = await getTranslations({ locale, namespace: 'pages.useCases' });
  const tContent = await getTranslations({ locale, namespace: 'content' });
  const useCases = getUseCaseCards(tContent.raw('useCaseCards'));
  const pageUrl = absoluteUrl(getPathname({ locale, href: '/use-cases' }));

  const pageGraph = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tPage('meta.title'),
    description: tPage('meta.description'),
    url: pageUrl,
    inLanguage: locale,
    about: [
      'Logistics operations',
      'Field operations',
      'Sales operations',
      'Production monitoring',
      'Client and project management',
    ],
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: useCases.map((useCase, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(getPathname({ locale, href: useCaseHref(locale, useCase.slug) })),
        name: useCase.title,
        description: useCase.description,
      })),
    },
  };

  return <JsonLd data={pageGraph} />;
}