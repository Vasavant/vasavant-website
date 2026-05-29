'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { NavItem } from '@/lib/content-types';
import { getNavItems } from '@/lib/messages';
import { useCaseHref } from '@/lib/use-case-link';
import type { Locale } from '@/i18n/routing';
import { CONTACT_EMAIL } from '@/lib/routes';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');

  useEffect(() => {
    setOpen(false);
    setUseCasesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-ink)] text-[var(--ink)]"
        aria-expanded={open}
        aria-label={open ? t('closeMenu') : t('openMenu')}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 bg-[var(--paper)]/98 backdrop-blur-sm overflow-y-auto">
          <nav className="section-inner py-6 flex flex-col gap-1">
            {items.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.label} className="border-b border-[var(--border-ink)] pb-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setUseCasesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-base font-semibold text-[var(--ink)]"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform',
                          useCasesOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    {useCasesOpen ? (
                      <ul className="pl-3 pb-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.slug}>
                            <Link
                              href={useCaseHref(locale, child.slug)}
                              className="block py-2.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/use-cases"
                            className="block py-2.5 text-sm font-semibold text-[var(--cta)]"
                          >
                            {t('viewAllUseCases')}
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                );
              }

              if (!item.href) return null;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-3 text-base font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] border-b border-[var(--border-ink)]"
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--cta)] text-white font-semibold py-3.5 px-6"
            >
              {t('getStarted')}
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

interface MobileNavWrapperProps {
  rawItems: unknown;
}

export function MobileNavWrapper({ rawItems }: MobileNavWrapperProps) {
  const items = getNavItems(rawItems);
  return <MobileNav items={items} />;
}
