import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { BlogPostFrontmatter } from '@/lib/blog';
import { useCaseHref } from '@/lib/use-case-link';
import type { ReactElement } from 'react';

interface BlogPostLayoutProps {
  locale: Locale;
  frontmatter: BlogPostFrontmatter;
  content: ReactElement;
  backLabel: string;
  relatedUseCaseLabel?: string;
  faqTitle: string;
}

export function BlogPostLayout({
  locale,
  frontmatter,
  content,
  backLabel,
  relatedUseCaseLabel,
  faqTitle,
}: BlogPostLayoutProps) {
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(frontmatter.publishedAt));

  return (
    <article className="section-cream">
      <div className="section-inner section-pad">
        <header className="max-w-3xl mb-12 lg:mb-16">
          <Link
            href="/blog"
            className="inline-block text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] mb-6 transition-colors"
          >
            ← {backLabel}
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] bg-[var(--paper-elevated)] px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mb-6">{formattedDate}</p>
          <p className="text-lg text-[var(--ink-muted)] leading-relaxed">
            {frontmatter.description}
          </p>
        </header>

        <div className="max-w-3xl prose-blog">{content}</div>

        {frontmatter.relatedUseCase && relatedUseCaseLabel ? (
          <p className="max-w-3xl mt-12 text-[var(--ink-muted)]">
            <Link
              href={useCaseHref(locale, frontmatter.relatedUseCase)}
              className="font-medium text-[var(--accent-blue)] underline underline-offset-2"
            >
              {relatedUseCaseLabel}
            </Link>
          </p>
        ) : null}

        {frontmatter.faq && frontmatter.faq.length > 0 ? (
          <section className="max-w-3xl mt-16 pt-10 border-t border-[var(--border-ink)]">
            <h2 className="font-display font-bold text-2xl text-[var(--ink)] mb-6">
              {faqTitle}
            </h2>
            <dl className="space-y-6">
              {frontmatter.faq.map((item) => (
                <div key={item.question}>
                  <dt className="font-display font-semibold text-[var(--ink)] mb-2">
                    {item.question}
                  </dt>
                  <dd className="text-[var(--ink-muted)] leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </div>
    </article>
  );
}
