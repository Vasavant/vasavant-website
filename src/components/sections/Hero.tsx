import { Button } from '@/components/ui/Button';
import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="section-cream relative overflow-hidden pt-20 lg:pt-24">
      <DoodleDecor
        variant="hatch-circle"
        className="absolute top-[14%] left-[4%] w-16 h-16 text-[var(--cta)] opacity-35 hidden lg:block"
      />
      <DoodleDecor
        variant="stripe-circle"
        className="absolute top-[18%] right-[6%] w-14 h-14 text-[var(--accent-red)] opacity-50 hidden lg:block"
      />
      <DoodleDecor
        variant="squiggle"
        className="absolute top-[28%] left-[2%] w-12 h-8 text-[var(--ink)] opacity-25 hidden md:block"
      />
      <DoodleDecor
        variant="dots"
        className="absolute bottom-[42%] right-[10%] w-10 h-10 text-[var(--cta)] opacity-30 hidden lg:block"
      />

      <div className="section-inner section-pad pb-12 lg:pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-display font-extrabold text-[2.75rem] sm:text-6xl lg:text-[4.25rem] tracking-tight text-[var(--ink)] leading-[1.02] mb-6 animate-fade-in-up">
            Does your business
            <br />
            actually run on intelligence?
          </h1>

          <p
            className="text-lg sm:text-xl text-[var(--ink-muted)] max-w-2xl leading-relaxed mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.08s' }}
          >
            VasaVant turns scattered data and manual workflows into structured intelligence
            systems you can query, automate, and operate through AI-assisted agents.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center gap-3 mb-14 lg:mb-20 animate-fade-in-up"
            style={{ animationDelay: '0.12s' }}
          >
            <Button variant="primary" size="lg" href="#cta">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" href="#method">
              See how it works
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <GeneratedIllustration
            src="/images/hero-workflow.png"
            alt="Team collaborating on operational workflows with dashboards and connected tools"
            width={1920}
            height={1080}
            priority
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
