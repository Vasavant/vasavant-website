import { Button } from '@/components/ui/Button';
import { GeneratedIllustration } from '@/components/ui/GeneratedIllustration';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="cta" className="section-cream section-pad overflow-hidden">
      <div className="section-inner">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] leading-[1.05] mb-6">
            Ready to transform your everyday?
          </h2>
          <p className="text-lg text-[var(--ink-muted)] leading-relaxed mb-8">
            Turn scattered operations into structured intelligence. We&apos;ll help you build the
            operational layer for AI-assisted execution.
          </p>
          <Button variant="primary" size="lg" href="mailto:hello@vasavant.com">
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <GeneratedIllustration
            src="/images/cta-illustration.png"
            alt="Person at a desk with connected workflow and application icons"
            width={1600}
            height={800}
          />
        </div>
      </div>
    </section>
  );
}
