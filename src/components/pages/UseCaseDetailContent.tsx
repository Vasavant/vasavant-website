import { Check } from 'lucide-react';
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
          <h2 className="hand-label mb-8">{content.challengesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {content.challenges.map((challenge) => (
              <article key={challenge} className="sticker-card p-6 lg:p-7">
                <p className="text-[var(--ink-muted)] leading-relaxed">{challenge}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream section-pad">
        <div className="section-inner max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-8">
            {content.outcomesTitle}
          </h2>
          <ul className="space-y-4">
            {content.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
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
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-8">
            {content.capabilitiesTitle}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {content.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
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
