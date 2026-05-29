import type { Locale } from '@/i18n/routing';

export const USE_CASE_SLUGS = [
  'logistics',
  'field-operations',
  'commercial-operations',
  'production',
  'client-projects',
] as const;

export type UseCaseSlug = (typeof USE_CASE_SLUGS)[number];

const localizedUseCaseSlugs: Record<Locale, Record<UseCaseSlug, string>> = {
  es: {
    logistics: 'logistica',
    'field-operations': 'operaciones-campo',
    'commercial-operations': 'ventas',
    production: 'produccion',
    'client-projects': 'proyectos',
  },
  en: {
    logistics: 'logistics',
    'field-operations': 'field-operations',
    'commercial-operations': 'commercial-operations',
    production: 'production',
    'client-projects': 'client-projects',
  },
};

const slugToKey: Record<Locale, Record<string, UseCaseSlug>> = {
  es: Object.fromEntries(
    USE_CASE_SLUGS.map((key) => [localizedUseCaseSlugs.es[key], key])
  ) as Record<string, UseCaseSlug>,
  en: Object.fromEntries(
    USE_CASE_SLUGS.map((key) => [localizedUseCaseSlugs.en[key], key])
  ) as Record<string, UseCaseSlug>,
};

export function isUseCaseSlug(value: string): value is UseCaseSlug {
  return (USE_CASE_SLUGS as readonly string[]).includes(value);
}

export function getLocalizedUseCaseSlug(
  locale: Locale,
  slug: UseCaseSlug
): string {
  return localizedUseCaseSlugs[locale][slug];
}

export function resolveUseCaseSlug(
  locale: Locale,
  param: string
): UseCaseSlug | null {
  return slugToKey[locale][param] ?? null;
}

export const CONTACT_EMAIL = 'hello@vasavant.com';

export const useCaseImagePaths: Record<UseCaseSlug, string> = {
  logistics: '/images/use-case-logistics.png',
  'field-operations': '/images/use-case-field-ops.png',
  'commercial-operations': '/images/use-case-commercial.png',
  production: '/images/use-case-production.png',
  'client-projects': '/images/use-case-projects.png',
};
