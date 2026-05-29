import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[var(--paper)] flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 lg:pt-[4.5rem]">{children}</main>
      <Footer />
    </div>
  );
}
