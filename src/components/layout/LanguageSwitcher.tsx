'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

const locales: Locale[] = ['es', 'en'];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-[var(--border-ink)] p-0.5"
      role="group"
      aria-label={t('label')}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          className={cn(
            'px-2.5 py-1 text-xs font-semibold rounded-md transition-colors',
            locale === code
              ? 'bg-[var(--ink)] text-[var(--paper)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
          )}
          aria-current={locale === code ? 'true' : undefined}
        >
          {t(code)}
        </Link>
      ))}
    </div>
  );
}
