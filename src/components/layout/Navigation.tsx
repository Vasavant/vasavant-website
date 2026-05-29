'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { VasaVantLogo } from '@/components/ui/VasaVantLogo';
import { navLinks } from '@/lib/content';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

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
          <a href="#" className="flex items-center">
            <VasaVantLogo />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <Button variant="primary" size="sm" href="#cta">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
