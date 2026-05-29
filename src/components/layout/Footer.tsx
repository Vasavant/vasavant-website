import { Mail, Share2 } from 'lucide-react';
import { VasaVantLogo } from '@/components/ui/VasaVantLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Services',
      links: [
        { label: 'Intelligence Systems', href: '#services' },
        { label: 'Data Automation', href: '#services' },
        { label: 'Conversational BI', href: '#services' },
        { label: 'Agentic Operations', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'The Problem', href: '#problem' },
        { label: 'The Method', href: '#method' },
        { label: 'Use Cases', href: '#use-cases' },
        { label: 'Process', href: '#process' },
      ],
    },
    {
      title: 'Contact',
      links: [{ label: 'hello@vasavant.com', href: 'mailto:hello@vasavant.com' }],
    },
  ];

  return (
    <footer className="section-navy">
      <div className="section-inner pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          <div className="max-w-xs">
            <a href="#" className="inline-flex mb-5 opacity-90 hover:opacity-100 transition-opacity">
              <VasaVantLogo variant="on-dark" />
            </a>
            <p className="font-display font-semibold text-lg text-white mb-2">
              Your workflow, but smarter.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Operational intelligence systems for real-world businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@vasavant.com"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-white/50">
            &copy; {currentYear} VasaVant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
