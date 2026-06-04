import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const DEFAULT_PRODUCTION_SITE_URL = 'https://www.vasavant.io';

function normalizeSiteUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/$/, '');
}

function resolveSiteUrl(): string {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    DEFAULT_PRODUCTION_SITE_URL
  );
}

export const siteUrl = resolveSiteUrl();
export const defaultSocialImageAlt =
  'VasaVant operational intelligence overview';

type BuildPageMetadataOptions = {
  locale: Locale;
  getLocalizedPath: (targetLocale: Locale) => string;
  title: string;
  description: string;
  openGraphType?: 'website' | 'article';
};

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function getDefaultSocialImages() {
  return [
    {
      url: absoluteUrl('/opengraph-image'),
      width: 1200,
      height: 630,
      alt: defaultSocialImageAlt,
    },
  ];
}

export function getSharedMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: 'VasaVant',
    referrer: 'origin-when-cross-origin',
    creator: 'VasaVant',
    publisher: 'VasaVant',
    category: 'business',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function buildLanguageAlternates(
  getLocalizedPath: (targetLocale: Locale) => string
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(getLocalizedPath(loc));
  }

  languages['x-default'] = languages.es;
  return languages;
}

export function buildPageMetadata({
  locale,
  getLocalizedPath,
  title,
  description,
  openGraphType = 'website',
}: BuildPageMetadataOptions): Metadata {
  const canonical = absoluteUrl(getLocalizedPath(locale));
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? ['en_US'] : ['es_ES'];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(getLocalizedPath),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: getDefaultSocialImages(),
      locale: ogLocale,
      alternateLocale,
      type: openGraphType,
      siteName: 'VasaVant',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: getDefaultSocialImages(),
    },
  };
}

export function buildBlogPostMetadata({
  locale,
  title,
  description,
  canonicalPath,
  alternatePaths,
  publishedAt,
}: {
  locale: Locale;
  title: string;
  description: string;
  canonicalPath: string;
  alternatePaths: Record<Locale, string>;
  publishedAt: string;
}): Metadata {
  const canonical = absoluteUrl(canonicalPath);
  const languages: Record<string, string> = {
    es: absoluteUrl(alternatePaths.es),
    en: absoluteUrl(alternatePaths.en),
    'x-default': absoluteUrl(alternatePaths.es),
  };
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? ['en_US'] : ['es_ES'];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: getDefaultSocialImages(),
      locale: ogLocale,
      alternateLocale,
      type: 'article',
      siteName: 'VasaVant',
      publishedTime: publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: getDefaultSocialImages(),
    },
  };
}

/** Helper for static localized routes */
export function staticLocalizedPath(
  href: Parameters<typeof getPathname>[0]['href']
): (targetLocale: Locale) => string {
  return (targetLocale) => getPathname({ locale: targetLocale, href });
}
