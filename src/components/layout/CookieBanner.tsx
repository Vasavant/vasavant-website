'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CONSENT_KEY = 'vasavant-cookie-consent';

export function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored !== 'accepted') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="section-inner pointer-events-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[var(--border-ink)] bg-white shadow-lg shadow-[rgba(10,15,20,0.08)]">
          <div className="flex-1 min-w-0">
            <p
              id="cookie-banner-title"
              className="font-display font-semibold text-[var(--ink)] mb-1"
            >
              {t('title')}
            </p>
            <p id="cookie-banner-desc" className="text-sm text-[var(--ink-muted)] leading-relaxed">
              {t('message')}{' '}
              <Link
                href="/privacy"
                className="text-[var(--cta)] font-medium hover:text-[var(--cta-hover)] underline-offset-2 hover:underline"
              >
                {t('privacyLink')}
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={accept}
            className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--cta)] text-white text-sm font-semibold hover:bg-[var(--cta-hover)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cta)]"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
