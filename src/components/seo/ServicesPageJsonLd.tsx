import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqItems, getServicesDetailed, getUseCaseCards } from '@/lib/messages';
import { CONTACT_EMAIL } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';

export async function ServicesPageJsonLd({ locale }: { locale: Locale }) {
  const tPage = await getTranslations({ locale, namespace: 'pages.services' });
  const tContent = await getTranslations({ locale, namespace: 'content' });
  const services = getServicesDetailed(tContent.raw('servicesDetailed'));
  const faq = getFaqItems(tPage.raw('faq'));
  const useCases = getUseCaseCards(tContent.raw('useCaseCards'));

  const pageUrl = absoluteUrl(getPathname({ locale, href: '/services' }));
  const contactUrl = absoluteUrl(getPathname({ locale, href: '/contact' }));

  const pageGraph = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tPage('meta.title'),
    description: tPage('meta.description'),
    url: pageUrl,
    inLanguage: locale,
    about: [
      'Operational intelligence systems',
      'Conversational business intelligence',
      'Agentic operations',
      'WhatsApp automation',
      'ERP and CRM integrations',
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        locale === 'es'
          ? 'Equipos mid-market de operaciones'
          : 'Mid-market operations teams',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: service.subtitle,
          areaServed: 'Venezuela',
          provider: {
            '@type': 'Organization',
            name: 'VasaVant',
            url: absoluteUrl('/'),
          },
          audience: {
            '@type': 'BusinessAudience',
            audienceType: service.idealFor,
          },
          knowsAbout: service.deliverables,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: contactUrl,
          },
        },
      })),
    },
    mentions: useCases.slice(0, 5).map((useCase) => ({
      '@type': 'Thing',
      name: useCase.title,
      description: useCase.description,
    })),
  };

  const faqGraph = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const serviceCatalogGraph = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VasaVant',
    url: absoluteUrl('/'),
    email: CONTACT_EMAIL,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'es' ? 'Servicios VasaVant' : 'VasaVant Services',
      itemListElement: services.map((service) => ({
        '@type': 'OfferCatalog',
        name: service.title,
        itemListElement: service.deliverables.map((deliverable) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: deliverable,
          },
        })),
      })),
    },
  };

  return <JsonLd data={[pageGraph, faqGraph, serviceCatalogGraph]} />;
}