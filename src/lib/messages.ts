import type {
  CoreCapability,
  FaqItem,
  NavItem,
  NavLink,
  ProcessPillar,
  ProcessStep,
  ServiceCard,
  ServiceDetailed,
  StatItem,
  UseCaseCard,
} from '@/lib/content-types';

export function getNavLinks(
  raw: unknown
): NavLink[] {
  return raw as NavLink[];
}

export function getHeroStats(raw: unknown): StatItem[] {
  return raw as StatItem[];
}

export function getTrustedTools(raw: unknown): string[] {
  return raw as string[];
}

export function getProcessPillars(raw: unknown): ProcessPillar[] {
  return raw as ProcessPillar[];
}

export function getFeaturedServices(raw: unknown): ServiceCard[] {
  return raw as ServiceCard[];
}

export function getCoreCapabilities(raw: unknown): string[] {
  return raw as string[];
}

export function getCoreCapabilitiesDetailed(raw: unknown): CoreCapability[] {
  return raw as CoreCapability[];
}

export function getServicesDetailed(raw: unknown): ServiceDetailed[] {
  return raw as ServiceDetailed[];
}

export function getFaqItems(raw: unknown): FaqItem[] {
  return raw as FaqItem[];
}

export function getUseCaseCards(raw: unknown): UseCaseCard[] {
  return raw as UseCaseCard[];
}

export function getNavItems(raw: unknown): NavItem[] {
  return raw as NavItem[];
}

export function getProcessSteps(raw: unknown): ProcessStep[] {
  return raw as ProcessStep[];
}
