import { cn } from '@/lib/utils';
import { VasaVantMark } from '@/components/ui/VasaVantMark';

interface VasaVantLogoProps {
  variant?: 'default' | 'on-dark';
  showWordmark?: boolean;
  className?: string;
}

export function VasaVantLogo({
  variant = 'default',
  showWordmark = true,
  className,
}: VasaVantLogoProps) {
  const isOnDark = variant === 'on-dark';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <VasaVantMark size={28} variant={variant} className="shrink-0" />
      {showWordmark ? (
        <span
          className={cn(
            'font-display font-bold text-lg tracking-tight',
            isOnDark ? 'text-white/90' : 'text-[var(--ink)]'
          )}
        >
          vasavant
        </span>
      ) : null}
    </span>
  );
}
