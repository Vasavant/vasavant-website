import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getAllPostSummaries } from '@/lib/blog';
import { USE_CASE_SLUGS, getLocalizedUseCaseSlug } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';

type StaticHref =
  | '/'
  | '/use-cases'
  | '/services'
  | '/process'
  | '/contact'
  | '/terms'
  | '/privacy'
  | '/blog';

const STATIC_HREFS: StaticHref[] = [
  '/',
  '/use-cases',
  '/services',
  '/process',
  '/contact',
  '/terms',
  '/privacy',
  '/blog',
];

export type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'weekly' | 'monthly';
  priority?: number;
};

export function getAllSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const locale of routing.locales) {
    for (const href of STATIC_HREFS) {
      entries.push({
        url: absoluteUrl(getPathname({ locale, href })),
        changeFrequency: href === '/' ? 'weekly' : 'monthly',
        priority: href === '/' ? 1 : 0.8,
      });
    }

    for (const slug of USE_CASE_SLUGS) {
      const localizedSlug = getLocalizedUseCaseSlug(locale, slug);
      entries.push({
        url: absoluteUrl(
          getPathname({
            locale,
            href: {
              pathname: '/use-cases/[slug]',
              params: { slug: localizedSlug },
            },
          })
        ),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const post of getAllPostSummaries(locale)) {
      entries.push({
        url: absoluteUrl(
          getPathname({
            locale,
            href: {
              pathname: '/blog/[slug]',
              params: { slug: post.slug },
            },
          })
        ),
        lastModified: new Date(post.frontmatter.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
