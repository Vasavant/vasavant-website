import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

type AppLinkHref = ComponentProps<typeof Link>['href'];

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display font-bold text-xl text-[var(--ink)] mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-semibold text-lg text-[var(--ink)] mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[var(--ink-muted)] leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 text-[var(--ink-muted)] mb-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 text-[var(--ink-muted)] mb-4">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    if (typeof href === 'string' && href.startsWith('/')) {
      return (
        <Link
          href={href as AppLinkHref}
          className="text-[var(--accent-blue)] underline underline-offset-2"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-[var(--accent-blue)] underline underline-offset-2"
        rel={href?.toString().startsWith('http') ? 'noopener noreferrer' : undefined}
        target={href?.toString().startsWith('http') ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--ink)]">{children}</strong>
  ),
};
