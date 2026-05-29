import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageCta } from '@/components/pages/PageCta';
import { BlogPostLayout } from '@/components/pages/BlogPostLayout';
import { BlogPostingJsonLd } from '@/components/seo/BlogPostingJsonLd';
import { routing, type Locale } from '@/i18n/routing';
import {
  compileBlogPost,
  generateBlogStaticParams,
  getBlogAlternatePaths,
  getBlogPostCanonicalPath,
  getPostBySlug,
} from '@/lib/blog';
import { buildBlogPostMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return generateBlogStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const summary = getPostBySlug(locale as Locale, slug);
  if (!summary) return {};

  const alternatePaths = getBlogAlternatePaths(summary.frontmatter.translationKey);
  if (!alternatePaths) return {};

  return buildBlogPostMetadata({
    locale: locale as Locale,
    title: summary.frontmatter.title,
    description: summary.frontmatter.description,
    canonicalPath: getBlogPostCanonicalPath(locale as Locale, slug),
    alternatePaths,
    publishedAt: summary.frontmatter.publishedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const post = await compileBlogPost(locale as Locale, slug);
  if (!post) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.blog');
  const tContent = await getTranslations('content');
  const useCaseCards = tContent.raw('useCaseCards') as Array<{
    slug: string;
    title: string;
  }>;

  const relatedCard = post.frontmatter.relatedUseCase
    ? useCaseCards.find((c) => c.slug === post.frontmatter.relatedUseCase)
    : undefined;

  const relatedUseCaseLabel = relatedCard
    ? t('relatedUseCase', { title: relatedCard.title })
    : undefined;

  return (
    <SiteShell>
      <BlogPostingJsonLd
        locale={locale as Locale}
        canonicalPath={getBlogPostCanonicalPath(locale as Locale, slug)}
        frontmatter={post.frontmatter}
      />
      <BlogPostLayout
        locale={locale as Locale}
        frontmatter={post.frontmatter}
        content={post.content}
        backLabel={t('backToIndex')}
        relatedUseCaseLabel={relatedUseCaseLabel}
        faqTitle={t('faqTitle')}
      />
      <PageCta />
    </SiteShell>
  );
}
