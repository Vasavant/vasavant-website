import type { Locale } from '@/i18n/routing';

/** Slugs per translationKey — keep in sync with content/blog frontmatter */
export const BLOG_TRANSLATION_SLUGS: Record<string, Record<Locale, string>> = {
  'whatsapp-ops-layer': {
    es: 'whatsapp-capas-operativas',
    en: 'whatsapp-as-operations-layer',
  },
  'logistics-mid-market-data': {
    es: 'logistica-mid-market-datos-dispersos',
    en: 'mid-market-logistics-scattered-data',
  },
};

export function getBlogSlugForLocale(
  currentLocale: Locale,
  currentSlug: string,
  targetLocale: Locale
): string | null {
  for (const slugs of Object.values(BLOG_TRANSLATION_SLUGS)) {
    if (slugs[currentLocale] === currentSlug) {
      return slugs[targetLocale];
    }
  }
  return null;
}
