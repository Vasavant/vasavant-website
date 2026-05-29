import type { UseCaseSlug } from '@/lib/routes';
import { getLocalizedUseCaseSlug } from '@/lib/routes';
import type { Locale } from '@/i18n/routing';

export function useCaseHref(
  locale: Locale,
  slug: UseCaseSlug
): { pathname: '/use-cases/[slug]'; params: { slug: string } } {
  return {
    pathname: '/use-cases/[slug]',
    params: { slug: getLocalizedUseCaseSlug(locale, slug) },
  };
}
