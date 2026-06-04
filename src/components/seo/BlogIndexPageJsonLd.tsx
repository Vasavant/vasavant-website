import { JsonLd } from '@/components/seo/JsonLd';
import type { BlogPostSummary } from '@/lib/blog';
import { getPostCoverImage } from '@/lib/blog';
import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo';

interface BlogIndexPageJsonLdProps {
  locale: Locale;
  title: string;
  description: string;
  posts: BlogPostSummary[];
}

export function BlogIndexPageJsonLd({
  locale,
  title,
  description,
  posts,
}: BlogIndexPageJsonLdProps) {
  const pageUrl = absoluteUrl(getPathname({ locale, href: '/blog' }));

  const pageGraph = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(
          getPathname({
            locale,
            href: {
              pathname: '/blog/[slug]',
              params: { slug: post.slug },
            },
          })
        ),
        name: post.frontmatter.title,
        description: post.frontmatter.description,
      })),
    },
  };

  const blogGraph = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.publishedAt,
      image: [absoluteUrl(getPostCoverImage(post.frontmatter))],
      keywords: post.frontmatter.tags,
      url: absoluteUrl(
        getPathname({
          locale,
          href: {
            pathname: '/blog/[slug]',
            params: { slug: post.slug },
          },
        })
      ),
    })),
  };

  return <JsonLd data={[pageGraph, blogGraph]} />;
}