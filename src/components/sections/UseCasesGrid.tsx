import { ArrowUpRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { UseCaseAccent, UseCaseCard } from '@/lib/content-types';
import { getUseCaseCards } from '@/lib/messages';
import { useCaseHref } from '@/lib/use-case-link';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

const accentStyles: Record<
  UseCaseAccent,
  { tag: string; ring: string; number: string; dot: string }
> = {
  blue: {
    tag: 'bg-[#2563eb]/10 text-[#1d4ed8] border-[#2563eb]/20',
    ring: 'ring-[#2563eb]/15',
    number: 'text-[#2563eb]/12',
    dot: 'bg-[#2563eb]',
  },
  green: {
    tag: 'bg-[#059669]/10 text-[#047857] border-[#059669]/20',
    ring: 'ring-[#059669]/15',
    number: 'text-[#059669]/12',
    dot: 'bg-[#059669]',
  },
  amber: {
    tag: 'bg-[#d97706]/10 text-[#b45309] border-[#d97706]/20',
    ring: 'ring-[#d97706]/15',
    number: 'text-[#d97706]/12',
    dot: 'bg-[#d97706]',
  },
  coral: {
    tag: 'bg-[#e85d4c]/10 text-[#c2410c] border-[#e85d4c]/20',
    ring: 'ring-[#e85d4c]/15',
    number: 'text-[#e85d4c]/12',
    dot: 'bg-[#e85d4c]',
  },
  navy: {
    tag: 'bg-[#071a2d]/8 text-[#071a2d] border-[#071a2d]/12',
    ring: 'ring-[#071a2d]/10',
    number: 'text-[#071a2d]/10',
    dot: 'bg-[#071a2d]',
  },
};

function UseCaseTile({
  useCase,
  className,
  tilt = false,
  learnMoreLabel,
  locale,
}: {
  useCase: UseCaseCard;
  className?: string;
  tilt?: boolean;
  learnMoreLabel: string;
  locale: Locale;
}) {
  const styles = accentStyles[useCase.accent];
  const isFeatured = useCase.featured === true;

  return (
    <article
      className={cn(
        'group relative sticker-card overflow-hidden p-6 lg:p-8 flex flex-col ring-1 transition-transform duration-300 hover:-translate-y-1',
        styles.ring,
        tilt && 'lg:rotate-[1.25deg] lg:group-hover:rotate-0',
        className
      )}
    >
      <div
        className="pointer-events-none absolute top-5 right-5 sm:top-6 sm:right-6 lg:top-7 lg:right-7 flex items-start gap-2.5 select-none"
        aria-hidden="true"
      >
        <span
          className={cn(
            'font-display font-extrabold text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] leading-none',
            styles.number
          )}
        >
          {useCase.number}
        </span>
        <span className={cn('mt-2 h-2.5 w-2.5 rounded-full shrink-0', styles.dot)} />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="mb-5 pr-24 sm:pr-28">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider',
              styles.tag
            )}
          >
            {useCase.tag}
          </span>
        </div>

        <h3
          className={cn(
            'font-display font-semibold text-[var(--ink)] mb-3 pr-20 sm:pr-24',
            isFeatured ? 'text-2xl sm:text-3xl leading-tight' : 'text-xl leading-snug'
          )}
        >
          {useCase.title}
        </h3>

        <p
          className={cn(
            'text-[var(--ink-muted)] leading-relaxed flex-1',
            isFeatured ? 'text-base max-w-md' : 'text-sm'
          )}
        >
          {useCase.description}
        </p>

        <Link
          href={useCaseHref(locale, useCase.slug)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)] hover:text-[var(--cta)] transition-colors w-fit"
        >
          {learnMoreLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

interface UseCasesGridProps {
  showHeader?: boolean;
  id?: string;
}

export async function UseCasesGrid({ showHeader = true, id }: UseCasesGridProps) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('useCases');
  const tContent = await getTranslations('content');
  const useCaseCards = getUseCaseCards(tContent.raw('useCaseCards'));

  const [featured, ...rest] = useCaseCards;
  const [fieldOps, sales, production, projects] = rest;

  if (!featured || !fieldOps || !sales || !production || !projects) {
    return null;
  }

  return (
    <section
      id={id}
      className="section-cream-alt section-pad relative overflow-hidden"
    >
      <div className="section-inner relative">
        {showHeader ? (
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-xl">
              <p className="hand-label mb-4">{t('label')}</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-[var(--ink)] leading-tight">
                {t('title')}
              </h2>
            </div>
            <p className="text-base text-[var(--ink-muted)] max-w-sm leading-relaxed lg:text-right">
              {t('subtitle')}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-auto">
          <UseCaseTile
            useCase={featured}
            learnMoreLabel={t('learnMore')}
            locale={locale}
            className="md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[280px] lg:min-h-[340px]"
          />
          <UseCaseTile
            useCase={fieldOps}
            learnMoreLabel={t('learnMore')}
            locale={locale}
            tilt
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1"
          />
          <UseCaseTile
            useCase={sales}
            learnMoreLabel={t('learnMore')}
            locale={locale}
            className="lg:col-span-5 lg:col-start-8 lg:row-start-2"
          />
          <UseCaseTile
            useCase={production}
            learnMoreLabel={t('learnMore')}
            locale={locale}
            tilt
            className="md:col-span-1 lg:col-span-4 lg:row-start-3"
          />
          <UseCaseTile
            useCase={projects}
            learnMoreLabel={t('learnMore')}
            locale={locale}
            className="md:col-span-1 lg:col-span-8 lg:col-start-5 lg:row-start-3 bg-[var(--paper)]"
          />
        </div>
      </div>
    </section>
  );
}
