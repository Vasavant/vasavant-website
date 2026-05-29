import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Testimonial } from '@/components/sections/Testimonial';
import { Solution } from '@/components/sections/Solution';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Services } from '@/components/sections/Services';
import { UseCases } from '@/components/sections/UseCases';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Testimonial />
        <Solution />
        <HowWeWork />
        <Services />
        <UseCases />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
