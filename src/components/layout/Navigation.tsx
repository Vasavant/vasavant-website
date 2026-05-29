'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { VasaVantLogo } from '@/components/ui/VasaVantLogo';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { getNavLinks } from '@/lib/messages';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const tContent = useTranslations('content');
  const navLinks = getNavLinks(tContent.raw('navLinks'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border-ink)]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-inner">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link href="/" className="flex items-center">
            <VasaVantLogo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="primary" size="sm" href="#cta">
              {t('getStarted')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
