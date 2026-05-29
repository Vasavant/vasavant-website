import { JsonLd } from '@/components/seo/JsonLd';
import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo';

interface UseCaseBreadcrumbJsonLdProps {
  locale: Locale;
  slugParam: string;
  title: string;
}

export function UseCaseBreadcrumbJsonLd({
  locale,
  slugParam,
  title,
}: UseCaseBreadcrumbJsonLdProps) {
  const hubPath = getPathname({ locale, href: '/use-cases' });
  const detailPath = getPathname({
    locale,
    href: {
      pathname: '/use-cases/[slug]',
      params: { slug: slugParam },
    },
  });

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'VasaVant',
        item: absoluteUrl(getPathname({ locale, href: '/' })),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'es' ? 'Casos de uso' : 'Use cases',
        item: absoluteUrl(hubPath),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: absoluteUrl(detailPath),
      },
    ],
  };

  return <JsonLd data={data} />;
}
