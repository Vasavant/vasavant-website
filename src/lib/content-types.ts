export interface NavLink {
  name: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessPillar {
  title: string;
  description: string;
  icon: 'clock' | 'search' | 'layers' | 'bot';
}

export interface ServiceCard {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

export type UseCaseAccent = 'blue' | 'green' | 'amber' | 'coral' | 'navy';

export interface UseCaseCard {
  number: string;
  title: string;
  description: string;
  tag: string;
  accent: UseCaseAccent;
  featured?: boolean;
}
