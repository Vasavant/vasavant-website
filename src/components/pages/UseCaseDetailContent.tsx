import { AlertTriangle, Target, Wrench, Check } from 'lucide-react';
import type { UseCaseDetailContent as UseCaseDetailType } from '@/lib/content-types';
import { useCaseImagePaths } from '@/lib/routes';
import type { UseCaseSlug } from '@/lib/routes';
import { PageHero } from '@/components/pages/PageHero';

interface UseCaseDetailContentProps {
  slug: UseCaseSlug;
  content: UseCaseDetailType;
}

export function UseCaseDetailContent({ slug, content }: UseCaseDetailContentProps) {
  return (
    <>
      <PageHero
        layout="split"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        imageSrc={useCaseImagePaths[slug]}
        imageAlt={content.imageAlt}
        priority
      />

      <section className="section-cream-alt section-pad">
        <div className="section-inner">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center text-[var(--accent-red)]">
              <AlertTriangle className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h2 className="hand-label">{content.challengesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {content.challenges.map((challenge, index) => (
              <article
                key={challenge}
                className="sticker-card card-hover-lift p-6 lg:p-7 border-l-4 border-l-[var(--accent-red)]/40"
              >
                <span
                  className="inline-flex items-center justify-center font-display font-extrabold text-base text-[var(--accent-red)] bg-[var(--accent-red)]/12 w-10 h-10 rounded-lg mb-4"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[var(--ink-muted)] leading-relaxed">{challenge}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream section-pad">
        <div className="section-inner max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[var(--cta)]/10 flex items-center justify-center text-[var(--cta)]">
              <Target className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
              {content.outcomesTitle}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="sticker-card card-hover-lift flex items-start gap-3 p-5 lg:p-6"
              >
                <Check
                  className="w-5 h-5 text-[var(--cta)] shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span className="text-[var(--ink-muted)] leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-navy section-pad">
        <div className="section-inner">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Wrench className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {content.capabilitiesTitle}
            </h2>
          </div>
          <ul className="flex flex-wrap gap-3">
            {content.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 card-hover-lift"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
