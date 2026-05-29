import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/pages/PageHero';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getAllPostSummaries } from '@/lib/blog';
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

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('pages.blog');
  const posts = getAllPostSummaries(locale as Locale);

  return (
    <SiteShell>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/images/services-page.png"
        imageAlt={t('hero.imageAlt')}
      />
      <section className="section-cream">
        <div className="section-inner section-pad">
          {posts.length === 0 ? (
            <p className="text-[var(--ink-muted)]">{t('empty')}</p>
          ) : (
            <ul className="grid gap-8 max-w-3xl">
              {posts.map((post) => {
                const date = new Intl.DateTimeFormat(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(post.frontmatter.publishedAt));

                return (
                  <li
                    key={post.slug}
                    className="border border-[var(--border-ink)] rounded-2xl p-6 bg-[var(--paper)] hover:border-[var(--ink-soft)] transition-colors"
                  >
                    <p className="text-xs text-[var(--ink-soft)] mb-2">{date}</p>
                    <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">
                      <Link
                        href={{
                          pathname: '/blog/[slug]',
                          params: { slug: post.slug },
                        }}
                        className="hover:text-[var(--accent-blue)] transition-colors"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <p className="text-[var(--ink-muted)] leading-relaxed mb-4">
                      {post.frontmatter.description}
                    </p>
                    <Link
                      href={{
                        pathname: '/blog/[slug]',
                        params: { slug: post.slug },
                      }}
                      className="text-sm font-semibold text-[var(--accent-blue)]"
                    >
                      {t('readMore')} →
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
