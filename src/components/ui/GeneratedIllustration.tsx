import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GeneratedIllustrationProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function GeneratedIllustration({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: GeneratedIllustrationProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto w-full object-contain', className)}
    />
  );
}
