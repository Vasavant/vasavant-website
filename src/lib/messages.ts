import type {
  NavLink,
  ProcessPillar,
  ServiceCard,
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

export function getUseCaseCards(raw: unknown): UseCaseCard[] {
  return raw as UseCaseCard[];
}
