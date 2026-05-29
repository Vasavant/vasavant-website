'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { NavItem, NavUseCaseChild } from '@/lib/content-types';
import { useCaseHref } from '@/lib/use-case-link';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface NavUseCasesMenuProps {
  item: NavItem & { children: NavUseCaseChild[] };
}

export function NavUseCasesMenu({ item }: NavUseCasesMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');

  const isActive =
    pathname === '/use-cases' || pathname.startsWith('/use-cases/');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium transition-colors',
          isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-[var(--border-ink)] bg-[var(--paper)] shadow-lg py-2 z-50">
          <ul>
            {item.children.map((child) => (
              <li key={child.slug}>
                <Link
                  href={useCaseHref(locale, child.slug)}
                  className="block px-4 py-2.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-black/[0.03] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--border-ink)] mt-1 pt-1">
            <Link
              href="/use-cases"
              className="block px-4 py-2.5 text-sm font-semibold text-[var(--cta)] hover:bg-black/[0.03] transition-colors"
              onClick={() => setOpen(false)}
            >
              {t('viewAllUseCases')}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
