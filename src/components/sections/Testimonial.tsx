import Image from 'next/image';
import { DoodleDecor } from '@/components/ui/DoodleDecor';

export function Testimonial() {
  return (
    <section className="section-cream section-pad">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
          <blockquote className="max-w-3xl">
            <p className="font-display font-medium text-2xl sm:text-3xl lg:text-[2rem] leading-snug text-[var(--ink)]">
              &ldquo;The agent is only as useful as the system underneath it. We structure the
              operation first, then deploy intelligence.&rdquo;
            </p>
            <footer className="mt-8 text-sm text-[var(--ink-muted)]">
              <span className="font-semibold text-[var(--ink)]">VasaVant</span>
              <span className="block mt-1">Operational Intelligence Studio</span>
            </footer>
          </blockquote>

          <div className="relative flex flex-col items-center lg:items-end">
            <DoodleDecor
              variant="stripe-circle"
              className="absolute -top-4 -right-2 w-20 h-20 text-[var(--accent-red)] opacity-40"
            />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[var(--ink)]">
              <Image
                src="/images/testimonial-avatar.png"
                alt="Abstract editorial portrait representing a VasaVant client voice"
                width={288}
                height={288}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-[var(--ink)] text-center lg:text-right">
              Operations lead
            </p>
            <p className="text-xs text-[var(--ink-muted)] text-center lg:text-right">
              Mid-market logistics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
