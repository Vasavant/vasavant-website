import { DoodleDecor } from '@/components/ui/DoodleDecor';
import { UseCasesGrid } from '@/components/sections/UseCasesGrid';

export function UseCases() {
  return (
    <div className="relative">
      <DoodleDecor
        variant="dots"
        className="absolute top-24 right-[6%] w-12 h-12 text-[var(--cta)] opacity-25 hidden lg:block pointer-events-none z-10"
      />
      <DoodleDecor
        variant="squiggle"
        className="absolute bottom-32 left-[4%] w-14 h-10 text-[var(--ink)] opacity-20 hidden md:block pointer-events-none z-10"
      />
      <UseCasesGrid id="use-cases" />
    </div>
  );
}
