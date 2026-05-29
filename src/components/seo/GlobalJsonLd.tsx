import { JsonLd } from '@/components/seo/JsonLd';
import { siteUrl } from '@/lib/seo';

export function GlobalJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VasaVant',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: 'hello@vasavant.com',
    description:
      'Operational intelligence studio turning scattered data and manual workflows into structured systems.',
    areaServed: {
      '@type': 'Country',
      name: 'Venezuela',
    },
    availableLanguage: ['es', 'en'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VasaVant',
    url: siteUrl,
    inLanguage: ['es', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'VasaVant',
    },
  };

  return <JsonLd data={[organization, website]} />;
}
