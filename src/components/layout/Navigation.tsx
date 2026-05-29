'use client';

import { useEffect, useState } from 'react';
import { useMessages, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { VasaVantLogo } from '@/components/ui/VasaVantLogo';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { NavUseCasesMenu } from '@/components/layout/NavUseCasesMenu';
import { MobileNavWrapper } from '@/components/layout/MobileNav';
import { getNavItems } from '@/lib/messages';
import type { NavItem } from '@/lib/content-types';
import { CONTACT_EMAIL } from '@/lib/routes';
import { cn } from '@/lib/utils';

function isUseCasesItem(
  item: NavItem
): item is NavItem & { children: NonNullable<NavItem['children']> } {
  return Boolean(item.children && item.children.length > 0);
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const messages = useMessages();
  const navItems = getNavItems(messages.nav.items);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border-ink)]'
          : 'bg-transparent'
      )}
    >
      <div className="section-inner">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link href="/" className="flex items-center">
            <VasaVantLogo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (isUseCasesItem(item)) {
                return <NavUseCasesMenu key={item.label} item={item} />;
              }

              if (!item.href) return null;

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href={`mailto:${CONTACT_EMAIL}`}>
                {t('getStarted')}
              </Button>
            </div>
            <MobileNavWrapper rawItems={messages.nav.items} />
          </div>
        </div>
      </div>
    </nav>
  );
}
