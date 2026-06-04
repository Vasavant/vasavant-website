import { JsonLd } from '@/components/seo/JsonLd';
import type { BlogPostFrontmatter } from '@/lib/blog';
import { getPostCoverImage } from '@/lib/blog';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo';
import { getPathname } from '@/i18n/navigation';
import { useCaseHref } from '@/lib/use-case-link';

interface BlogPostingJsonLdProps {
  locale: Locale;
  canonicalPath: string;
  frontmatter: BlogPostFrontmatter;
}

export function BlogPostingJsonLd({
  locale,
  canonicalPath,
  frontmatter,
}: BlogPostingJsonLdProps) {
  const url = absoluteUrl(canonicalPath);
  const coverImage = absoluteUrl(getPostCoverImage(frontmatter));
  const relatedUseCaseUrl = frontmatter.relatedUseCase
    ? absoluteUrl(
        getPathname({
          locale,
          href: useCaseHref(locale, frontmatter.relatedUseCase),
        })
      )
    : undefined;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    alternativeHeadline: frontmatter.description,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.publishedAt,
    inLanguage: locale,
    url,
    mainEntityOfPage: url,
    image: [coverImage],
    keywords: frontmatter.tags,
    articleSection: frontmatter.tags[0],
    author: {
      '@type': 'Organization',
      name: 'VasaVant',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VasaVant',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'VasaVant',
      url: absoluteUrl(locale === 'es' ? '/recursos' : '/en/blog'),
    },
    about: frontmatter.tags.map((tag) => ({
      '@type': 'Thing',
      name: tag,
    })),
    mentions: relatedUseCaseUrl
      ? [
          {
            '@type': 'Thing',
            name: frontmatter.relatedUseCase,
            url: relatedUseCaseUrl,
          },
        ]
      : undefined,
  };

  const graphs: Record<string, unknown>[] = [blogPosting];

  if (frontmatter.faq && frontmatter.faq.length > 0) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: frontmatter.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return <JsonLd data={graphs} />;
}
