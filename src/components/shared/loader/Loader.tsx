import { Conditional } from '@components/shared';
import { cn } from '@utils';

import { HourglassIcon, Loader2 } from 'lucide-react';

type LoaderProps = {
  displayLogo?: boolean;
  withOverlay?: boolean;
};

function Loader({ displayLogo = false, withOverlay = true }: LoaderProps) {
  return (
    <div className={cn('absolute inset-0 z-30 flex flex-col items-center justify-center', withOverlay && 'bg-background')}>
      <Conditional.If condition={displayLogo}>
        <HourglassIcon size={64} className="text-primary animate-pulse" />
      </Conditional.If>
      <Loader2 size={64} className="text-primary mt-10 animate-spin transition-all" />
    </div>
  );
}

export default Loader;
