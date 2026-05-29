import type { UseCaseSlug } from '@/lib/routes';

export interface NavLink {
  name: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: '/use-cases' | '/services' | '/process' | '/contact';
  children?: NavUseCaseChild[];
}

export interface NavUseCaseChild {
  label: string;
  slug: UseCaseSlug;
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

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceCard {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

export type UseCaseAccent = 'blue' | 'green' | 'amber' | 'coral' | 'navy';

export interface UseCaseCard {
  slug: UseCaseSlug;
  number: string;
  title: string;
  description: string;
  tag: string;
  accent: UseCaseAccent;
  featured?: boolean;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageAlt: string;
}

export interface UseCaseDetailContent {
  meta: PageMeta;
  hero: PageHeroContent;
  challengesTitle: string;
  challenges: string[];
  outcomesTitle: string;
  outcomes: string[];
  capabilitiesTitle: string;
  capabilities: string[];
  imageAlt: string;
}
