import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { BLOG_TRANSLATION_SLUGS } from '@/lib/blog-locale-map';
import type { ReactElement } from 'react';
import type { UseCaseSlug } from '@/lib/routes';
import { useCaseHref } from '@/lib/use-case-link';
import { Link } from '@/i18n/navigation';

const BLOG_ROOT = path.join(process.cwd(), 'content/blog');

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPostFrontmatter {
  translationKey: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  relatedUseCase?: UseCaseSlug;
  draft?: boolean;
  faq?: BlogFaqItem[];
}

export interface BlogPostSummary {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}

export interface BlogPost extends BlogPostSummary {
  content: ReactElement;
}

function localeDir(locale: Locale): string {
  return path.join(BLOG_ROOT, locale);
}

function listMdxFiles(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

function readRawPost(locale: Locale, slug: string): { content: string; data: BlogPostFrontmatter } | null {
  const base = path.join(localeDir(locale), slug);
  const mdxPath = `${base}.mdx`;
  const mdPath = `${base}.md`;

  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);

  return {
    content,
    data: data as BlogPostFrontmatter,
  };
}

export function getAllPostSummaries(locale: Locale): BlogPostSummary[] {
  return listMdxFiles(locale)
    .map((file) => file.replace(/\.mdx?$/, ''))
    .map((slug) => {
      const raw = readRawPost(locale, slug);
      if (!raw || raw.data.draft) return null;
      return { slug, frontmatter: raw.data };
    })
    .filter((post): post is BlogPostSummary => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getPostBySlug(locale: Locale, slug: string): BlogPostSummary | null {
  const raw = readRawPost(locale, slug);
  if (!raw || raw.data.draft) return null;
  return { slug, frontmatter: raw.data };
}

export function getPostByTranslationKey(
  locale: Locale,
  translationKey: string
): BlogPostSummary | null {
  const slug = BLOG_TRANSLATION_SLUGS[translationKey]?.[locale];
  if (slug) {
    return getPostBySlug(locale, slug);
  }
  const posts = getAllPostSummaries(locale);
  return posts.find((p) => p.frontmatter.translationKey === translationKey) ?? null;
}

export async function compileBlogPost(
  locale: Locale,
  slug: string
): Promise<BlogPost | null> {
  const raw = readRawPost(locale, slug);
  if (!raw || raw.data.draft) return null;

  const UseCaseLink = ({
    slug: useCaseSlug,
    children,
  }: {
    slug: UseCaseSlug;
    children: React.ReactNode;
  }) => <Link href={useCaseHref(locale, useCaseSlug)}>{children}</Link>;

  const { content } = await compileMDX({
    source: raw.content,
    components: { ...mdxComponents, UseCaseLink },
    options: { parseFrontmatter: false },
  });

  return {
    slug,
    frontmatter: raw.data,
    content,
  };
}

export function getBlogAlternatePaths(
  translationKey: string
): Record<Locale, string> | null {
  const esPost = getPostByTranslationKey('es', translationKey);
  const enPost = getPostByTranslationKey('en', translationKey);

  if (!esPost || !enPost) return null;

  return {
    es: getPathname({
      locale: 'es',
      href: {
        pathname: '/blog/[slug]',
        params: { slug: esPost.slug },
      },
    }),
    en: getPathname({
      locale: 'en',
      href: {
        pathname: '/blog/[slug]',
        params: { slug: enPost.slug },
      },
    }),
  };
}

export function getBlogPostCanonicalPath(locale: Locale, slug: string): string {
  return getPathname({
    locale,
    href: {
      pathname: '/blog/[slug]',
      params: { slug },
    },
  });
}

export function generateBlogStaticParams(): Array<{ locale: Locale; slug: string }> {
  const locales: Locale[] = ['es', 'en'];
  return locales.flatMap((locale) =>
    getAllPostSummaries(locale).map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}
