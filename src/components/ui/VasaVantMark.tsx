interface VasaVantMarkProps {
  size?: number;
  variant?: 'default' | 'on-dark';
  className?: string;
}

/** Circular V mark used in navbar, footer, and favicon. */
export function VasaVantMark({
  size = 32,
  variant = 'default',
  className,
}: VasaVantMarkProps) {
  const isOnDark = variant === 'on-dark';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="16"
        fill={isOnDark ? 'rgba(255,255,255,0.92)' : '#2563EB'}
      />
      <path
        d="M8 11 C8 11 11 11 16 21.5 C21 11 24 11 24 11"
        stroke={isOnDark ? '#071A2D' : 'white'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
