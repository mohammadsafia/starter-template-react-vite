import { type ComponentPropsWithoutRef, useId } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';

import { FormControl, FormLabel, FormMessage } from '@components/forms';
import { Checkbox } from '@components/ui';

import { cn } from '@utils';

import type { ControlledFieldBaseProps } from '@app-types';

type FormCheckboxProps<TFieldValues extends FieldValues> = ControlledFieldBaseProps<
  TFieldValues,
  ComponentPropsWithoutRef<typeof Checkbox>
>;

function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  rules,
  control,
  label,
  containerClassName,
  labelClassName,
  className,
  errorClassName,
  required,
  ...props
}: FormCheckboxProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl className={cn('flex flex-row items-center space-y-0 space-x-2 rounded-md', error && 'ps-8', containerClassName)}>
          <Checkbox
            id={`${id}-${name}`}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            className={cn(
              error && 'border-destructive data-[state=checked]:bg-destructive hover:ring-destructive focus-within:ring-destructive',
              className,
            )}
            {...field}
            {...props}
          />

          <div className="leading-none">
            <FormLabel
              className={cn('cursor-pointer', labelClassName)}
              hidden={!label}
              error={error!}
              htmlFor={`${id}-${name}`}
              required={required}
            >
              {label}
            </FormLabel>
          </div>

          <FormMessage className={errorClassName} hidden={!error} error={error!} />
        </FormControl>
      )}
    />
  );
}

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
