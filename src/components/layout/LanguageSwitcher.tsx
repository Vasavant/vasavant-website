'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { getBlogSlugForLocale } from '@/lib/blog-locale-map';
import {
  getLocalizedUseCaseSlug,
  resolveUseCaseSlug,
} from '@/lib/routes';

const locales: Locale[] = ['es', 'en'];

type StaticPathname =
  | '/'
  | '/use-cases'
  | '/services'
  | '/process'
  | '/contact'
  | '/terms'
  | '/privacy'
  | '/blog';

type LocaleSwitchHref =
  | StaticPathname
  | { pathname: '/use-cases/[slug]'; params: { slug: string } }
  | { pathname: '/blog/[slug]'; params: { slug: string } };

function getLocaleSwitchHref(
  pathname: string,
  params: Record<string, string | string[] | undefined>,
  currentLocale: Locale,
  targetLocale: Locale
): LocaleSwitchHref {
  if (pathname === '/use-cases/[slug]') {
    const slugParam = params.slug;
    if (typeof slugParam === 'string') {
      const useCaseKey = resolveUseCaseSlug(currentLocale, slugParam);
      if (useCaseKey) {
        return {
          pathname: '/use-cases/[slug]',
          params: { slug: getLocalizedUseCaseSlug(targetLocale, useCaseKey) },
        };
      }
    }
  }

  if (pathname === '/blog/[slug]') {
    const slugParam = params.slug;
    if (typeof slugParam === 'string') {
      const targetSlug = getBlogSlugForLocale(
        currentLocale,
        slugParam,
        targetLocale
      );
      if (targetSlug) {
        return {
          pathname: '/blog/[slug]',
          params: { slug: targetSlug },
        };
      }
    }
  }

  const staticPaths: StaticPathname[] = [
    '/',
    '/use-cases',
    '/services',
    '/process',
    '/contact',
    '/terms',
    '/privacy',
    '/blog',
  ];

  if (staticPaths.includes(pathname as StaticPathname)) {
    return pathname as StaticPathname;
  }

  return '/';
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('languageSwitcher');

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-[var(--border-ink)] p-0.5"
      role="group"
      aria-label={t('label')}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={getLocaleSwitchHref(pathname, params, locale, code)}
          locale={code}
          className={cn(
            'px-2.5 py-1 text-xs font-semibold rounded-md transition-colors',
            locale === code
              ? 'bg-[var(--ink)] text-[var(--paper)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
          )}
          aria-current={locale === code ? 'true' : undefined}
        >
          {t(code)}
        </Link>
      ))}
    </div>
  );
}
