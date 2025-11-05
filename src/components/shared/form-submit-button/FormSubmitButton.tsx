import { LoadingButton, type LoadingButtonProps } from '@components/ui';

import { cn } from '@utils';

type FormSubmitButton = LoadingButtonProps & {
  textContent?: string;
};

function FormSubmitButton({ className, size = 'lg', textContent = 'Save', variant = 'default', ...props }: FormSubmitButton) {
  return (
    <LoadingButton
      className={cn('block w-fit max-lg:mx-auto lg:ms-auto', className)}
      variant={variant}
      size={size}
      type="submit"
      {...props}
    >
      {textContent}
    </LoadingButton>
  );
}

export default FormSubmitButton;
