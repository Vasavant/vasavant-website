import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/pages/PageHero';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getAllPostSummaries, getPostCoverImage, getPostReadTimeMinutes } from '@/lib/blog';
import { buildPageMetadata, staticLocalizedPath } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return buildPageMetadata({
    locale: locale as Locale,
    getLocalizedPath: staticLocalizedPath('/blog'),
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

function formatDate(locale: string, dateStr: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.blog');
  const posts = getAllPostSummaries(locale as Locale);
  const [featured, ...rest] = posts;

  return (
    <SiteShell>
      <PageHero
        layout="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/images/services-page.png"
        imageAlt={t('hero.imageAlt')}
      />
      <section className="section-cream section-pad">
        <div className="section-inner">
          {posts.length === 0 ? (
            <p className="text-[var(--ink-muted)]">{t('empty')}</p>
          ) : (
            <>
              {featured ? (
                <div className="mb-12 lg:mb-16">
                  <p className="hand-label mb-4">{t('featuredLabel')}</p>
                  <article className="sticker-card card-hover-lift overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                      <div className="lg:col-span-2 relative min-h-[220px] lg:min-h-[280px]">
                        <Image
                          src={getPostCoverImage(featured.frontmatter)}
                          alt={featured.frontmatter.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/20 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="absolute bottom-0 left-0 p-6 lg:p-8 flex flex-wrap gap-2">
                          {featured.frontmatter.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-soft)] mb-3">
                          <time dateTime={featured.frontmatter.publishedAt}>
                            {formatDate(locale, featured.frontmatter.publishedAt)}
                          </time>
                          <span aria-hidden="true">·</span>
                          <span>
                            {getPostReadTimeMinutes(locale as Locale, featured.slug)}{' '}
                            {t('readTimeSuffix')}
                          </span>
                        </div>
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-3 leading-tight">
                          <Link
                            href={{
                              pathname: '/blog/[slug]',
                              params: { slug: featured.slug },
                            }}
                            className="hover:text-[var(--cta)] transition-colors"
                          >
                            {featured.frontmatter.title}
                          </Link>
                        </h2>
                        <p className="text-[var(--ink-muted)] leading-relaxed mb-6 flex-1">
                          {featured.frontmatter.description}
                        </p>
                        <Link
                          href={{
                            pathname: '/blog/[slug]',
                            params: { slug: featured.slug },
                          }}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cta)] w-fit group/link"
                        >
                          {t('readMore')}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ) : null}

              {rest.length > 0 ? (
                <div>
                  <p className="hand-label mb-6">{t('allArticlesLabel')}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {rest.map((post) => (
                      <li key={post.slug}>
                        <article className="sticker-card card-hover-lift p-6 lg:p-8 h-full flex flex-col group">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.frontmatter.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] bg-[var(--paper-light)] px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-soft)] mb-2">
                            <time dateTime={post.frontmatter.publishedAt}>
                              {formatDate(locale, post.frontmatter.publishedAt)}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span>
                              {getPostReadTimeMinutes(locale as Locale, post.slug)}{' '}
                              {t('readTimeSuffix')}
                            </span>
                          </div>
                          <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2 leading-snug">
                            <Link
                              href={{
                                pathname: '/blog/[slug]',
                                params: { slug: post.slug },
                              }}
                              className="hover:text-[var(--cta)] transition-colors"
                            >
                              {post.frontmatter.title}
                            </Link>
                          </h2>
                          <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4 flex-1">
                            {post.frontmatter.description}
                          </p>
                          <Link
                            href={{
                              pathname: '/blog/[slug]',
                              params: { slug: post.slug },
                            }}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cta)] w-fit group/link"
                          >
                            {t('readMore')}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </Link>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
