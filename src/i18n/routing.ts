import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/use-cases': {
      es: '/casos-de-uso',
      en: '/use-cases',
    },
    '/use-cases/[slug]': {
      es: '/casos-de-uso/[slug]',
      en: '/use-cases/[slug]',
    },
    '/services': {
      es: '/servicios',
      en: '/services',
    },
    '/process': {
      es: '/proceso',
      en: '/process',
    },
    '/contact': {
      es: '/contacto',
      en: '/contact',
    },
    '/terms': {
      es: '/terminos',
      en: '/terms',
    },
    '/privacy': {
      es: '/privacidad',
      en: '/privacy',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
