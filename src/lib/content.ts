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

export const navLinks: NavLink[] = [
  { name: 'Problem', href: '#problem' },
  { name: 'Method', href: '#method' },
  { name: 'Services', href: '#services' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Process', href: '#process' },
];

export const heroStats: StatItem[] = [
  { value: '4-12', label: 'weeks to deploy' },
  { value: '6+', label: 'capabilities built' },
  { value: '100%', label: 'custom systems' },
  { value: '∞', label: 'continuous iteration' },
];

export const trustedTools: string[] = [
  'WhatsApp',
  'Airtable',
  'n8n',
  'Make',
  'Zapier',
  'PostgreSQL',
];

export const processPillars: ProcessPillar[] = [
  {
    title: 'Map the operation',
    description: 'Understand workflows, data sources, and where decisions actually happen.',
    icon: 'search',
  },
  {
    title: 'Structure the data',
    description: 'Unified schemas and process rules so intelligence has something solid to run on.',
    icon: 'layers',
  },
  {
    title: 'Automate & report',
    description: 'Dashboards, triggers, and routing that remove manual reporting overhead.',
    icon: 'clock',
  },
  {
    title: 'Deploy agents',
    description: 'Conversational access and autonomous execution on top of your operational layer.',
    icon: 'bot',
  },
];

export const featuredServices: ServiceCard[] = [
  {
    title: 'Conversational Business Intelligence',
    subtitle: 'Query your operation from WhatsApp',
    description:
      'Ask your business what is happening and get an answer. Natural-language access to operational data without opening another dashboard.',
    bullets: [
      'Instant answers from live operational data',
      'No new app for your team to learn',
      'Built on structured, auditable sources',
    ],
  },
  {
    title: 'Agentic Operations',
    subtitle: 'Autonomous execution on solid architecture',
    description:
      'Digital agents that navigate internal systems, parse documents, update records, and run repetitive administration.',
    bullets: [
      'Document parsing and record updates',
      'Workflow triggers and task routing',
      'Rock-solid data layer underneath',
    ],
  },
];

export const coreCapabilities: string[] = [
  'Operational intelligence systems',
  'Data automation & workflow design',
  'Business dashboards & reporting',
  'Internal tools & lightweight apps',
];

export const useCaseCards: UseCaseCard[] = [
  {
    number: '01',
    tag: 'Logistics',
    title: 'Logistics & Trucking',
    description:
      'Fleet tracking, trip logging, maintenance scheduling, and delivery optimization across your entire network.',
    accent: 'blue',
    featured: true,
  },
  {
    number: '02',
    tag: 'Field Ops',
    title: 'Field Operations & Assets',
    description: 'Equipment utilization, location tracking, and field team coordination in real time.',
    accent: 'green',
  },
  {
    number: '03',
    tag: 'Sales',
    title: 'Sales Operations',
    description: 'Pipeline visibility, lead routing, and automated follow-up across your CRM stack.',
    accent: 'coral',
  },
  {
    number: '04',
    tag: 'Production',
    title: 'Production & Yield',
    description: 'Daily production dashboards, quality metrics, and bottleneck identification.',
    accent: 'amber',
  },
  {
    number: '05',
    tag: 'Projects',
    title: 'Client & Project Management',
    description: 'Centralized timelines, client communication logs, and delivery milestone alerts.',
    accent: 'navy',
  },
];
