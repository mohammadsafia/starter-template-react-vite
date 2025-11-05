import { Button, LoadingButton } from '@components/ui';
import { Step } from '@components/shared';
import { Fragment, ReactNode, useEffect, useRef } from 'react';

export type StepOption = { title: string; step?: ReactNode };
export type StepperProps = {
  steps: StepOption[];
  currentStep: number;
  handleNextStepChange: (step: number) => void;
  handleBackStepChange: (step: number) => void;
  isLoading: boolean;
};

export default function Stepper({ steps, currentStep, handleNextStepChange, handleBackStepChange, isLoading }: StepperProps) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const activeStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeStepElement = activeStepRefs.current[currentStep];
    const container = stepsContainerRef.current;

    if (activeStepElement && container) {
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        const containerRect = container.getBoundingClientRect();
        const stepRect = activeStepElement.getBoundingClientRect();
        const scrollLeft = stepRect.left - containerRect.left + container.scrollLeft - containerRect.width / 2 + stepRect.width / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [currentStep]);

  return (
    <div className="mt-8 w-full lg:mt-12">
      <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
        <div
          ref={stepsContainerRef}
          className="mb-6 flex flex-row items-center gap-4 overflow-x-auto scroll-smooth pb-2 lg:mb-8 lg:flex-col lg:items-start lg:gap-8 lg:overflow-x-visible lg:pb-0"
        >
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <div
                ref={(el) => {
                  activeStepRefs.current[index] = el;
                }}
                className="flex-shrink-0 lg:flex-shrink"
              >
                <Step title={step.title} isCompleted={index < currentStep} isActive={index === currentStep} currentStep={index + 1} />
              </div>
            </Fragment>
          ))}
        </div>
        <div className="w-full min-w-0">{steps[currentStep].step}</div>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <Button
          variant="outline"
          onClick={() => handleBackStepChange(currentStep)}
          disabled={currentStep === 0}
          className="order-2 w-full sm:order-1 sm:w-auto"
        >
          Previous
        </Button>
        <LoadingButton
          type="button"
          onClick={() => handleNextStepChange(currentStep)}
          loading={isLoading}
          disabled={isLoading}
          className="order-1 w-full sm:order-2 sm:w-auto"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </LoadingButton>
      </div>
    </div>
  );
}
