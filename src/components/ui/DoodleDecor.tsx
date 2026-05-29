import { cn } from '@/lib/utils';

type DoodleVariant = 'hatch-circle' | 'dots' | 'squiggle' | 'cross' | 'stripe-circle';

interface DoodleDecorProps {
  variant: DoodleVariant;
  className?: string;
}

export function DoodleDecor({ variant, className }: DoodleDecorProps) {
  const base = cn('pointer-events-none select-none', className);

  if (variant === 'hatch-circle') {
    return (
      <svg className={base} viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: 11 }, (_, i) => (
          <line
            key={i}
            x1={4 + i * 7}
            y1="2"
            x2={4 + i * 7}
            y2="78"
            stroke="currentColor"
            strokeWidth="1"
            clipPath="url(#hatch-clip)"
          />
        ))}
        <clipPath id="hatch-clip">
          <circle cx="40" cy="40" r="38" />
        </clipPath>
      </svg>
    );
  }

  if (variant === 'stripe-circle') {
    return (
      <svg className={base} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={8 + i * 7}
            y1="4"
            x2={8 + i * 7}
            y2="60"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </svg>
    );
  }

  if (variant === 'dots') {
    return (
      <svg className={base} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={(i % 4) * 12 + 6}
            cy={Math.floor(i / 4) * 12 + 6}
            r="2"
            fill="currentColor"
          />
        ))}
      </svg>
    );
  }

  if (variant === 'squiggle') {
    return (
      <svg className={base} viewBox="0 0 56 40" fill="none" aria-hidden="true">
        <path
          d="M4 20 Q10 4 18 20 Q26 36 34 20 Q42 4 52 20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
