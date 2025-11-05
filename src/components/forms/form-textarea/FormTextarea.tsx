import { type TextareaHTMLAttributes, useId } from 'react';
import { type FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormControl, FormLabel, FormMessage } from '@components/forms';

import { cn } from '@utils';

import type { FieldBaseProps } from '@app-types';

type FormTextareaProps<TFieldValues extends FieldValues> = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldBaseProps<TFieldValues>;

function FormTextarea<TFieldValues extends FieldValues>({
  name,
  label,
  className,
  containerClassName,
  labelClassName,
  errorClassName,
  required,
  ...props
}: FormTextareaProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();
  const { fieldState } = useController<TFieldValues>({ name });

  const { error } = fieldState;
  const id = `${name}-${useId()}`;

  return (
    <FormControl className={containerClassName}>
      <FormLabel className={labelClassName} error={error!} hidden={!label} htmlFor={id} required={required}>
        {label}
      </FormLabel>

      <div className="relative">
        <textarea
          id={id}
          className={cn(
            'border-accent bg-background ring-offset-background focus-visible:ring-accent hover:ring-accent flex min-h-[80px] w-full',
            'rounded-md border px-3 py-2 text-sm shadow-xs transition-colors hover:ring focus-visible:ring',
            'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive hover:ring-destructive focus-visible:ring-destructive ps-8',
            className,
          )}
          {...register(name)}
          {...props}
        />

        <FormMessage className={cn('top-5', errorClassName)} hidden={!error} error={error!} />
      </div>
    </FormControl>
  );
}

export default FormTextarea;
