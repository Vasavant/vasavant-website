import { JsonLd } from '@/components/seo/JsonLd';
import type { BlogPostFrontmatter } from '@/lib/blog';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo';

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

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    inLanguage: locale,
    url,
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
