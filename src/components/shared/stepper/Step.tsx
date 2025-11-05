import { cn } from '@utils';
import { Check } from 'lucide-react';
import { Conditional } from '@components/shared';

export type StepProps = {
  title: string;
  currentStep?: number;
  isCompleted?: boolean;
  isActive?: boolean;
};

export default function Step({ title, currentStep, isCompleted, isActive }: StepProps) {
  return (
    <div className="flex min-w-[100px] flex-row items-center gap-3 text-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn('flex h-10 w-10 items-center justify-center rounded-full border-2', {
            'border-primary bg-primary text-primary-foreground': isCompleted,
            'border-primary': isActive,
            'border-muted': !isActive && !isCompleted,
          })}
        >
          <Conditional>
            <Conditional.If condition={!!isCompleted}>
              <Check className="h-4 w-4" />
            </Conditional.If>
            <Conditional.Else>
              <span className="text-base font-bold">{currentStep}</span>
            </Conditional.Else>
          </Conditional>
        </div>
      </div>
      <p
        className={cn('text-base font-bold whitespace-nowrap', {
          'text-foreground': isActive || isCompleted,
          'text-muted-foreground': !isActive && !isCompleted,
        })}
      >
        {title}
      </p>
    </div>
  );
}
