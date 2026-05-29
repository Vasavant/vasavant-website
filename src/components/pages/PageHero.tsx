import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  layout?: 'centered' | 'split';
  priority?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  layout = 'centered',
  priority = false,
}: PageHeroProps) {
  if (layout === 'split') {
    return (
      <section className="section-cream relative overflow-hidden">
        <DoodleDecor
          variant="dots"
          className="absolute top-20 right-[8%] w-10 h-10 text-[var(--cta)] opacity-25 hidden lg:block"
        />
        <div className="section-inner section-pad pb-8 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="hand-label mb-4">{eyebrow}</p>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--ink)] leading-tight mb-5">
                {title}
              </h1>
              <p className="text-lg text-[var(--ink-muted)] leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </div>
            <GeneratedIllustration
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={675}
              priority={priority}
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-cream relative overflow-hidden">
      <DoodleDecor
        variant="hatch-circle"
        className="absolute top-24 left-[5%] w-14 h-14 text-[var(--cta)] opacity-30 hidden lg:block"
      />
      <div className="section-inner section-pad pb-8 lg:pb-12">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
          <p className="hand-label mb-4">{eyebrow}</p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] tracking-tight text-[var(--ink)] leading-tight mb-5">
            {title}
          </h1>
          <p className={cn('text-lg text-[var(--ink-muted)] leading-relaxed')}>{subtitle}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <GeneratedIllustration
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            priority={priority}
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
