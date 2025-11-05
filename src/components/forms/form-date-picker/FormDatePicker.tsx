import { Controller, type FieldValues } from 'react-hook-form';

import { FormControl, FormLabel, FormMessage } from '@components/forms';
import { Button, Calendar, type CalendarProps, Popover } from '@components/ui';
import { Conditional } from '@components/shared';

import { useDate } from '@hooks/shared';
import { cn } from '@utils';

import { CalendarIcon, XIcon } from 'lucide-react';

import type { ControlledFieldBaseProps } from '@app-types';

type FormDatePickerProps<TFieldValues extends FieldValues> = ControlledFieldBaseProps<
  TFieldValues,
  Omit<CalendarProps, 'mode' | 'selected'>
> & {
  placeholder?: string;
};

function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  rules,
  control,
  label,
  containerClassName,
  labelClassName,
  className,
  errorClassName,
  required,
  disabled,
  placeholder = 'Pick a date',
  ...props
}: FormDatePickerProps<TFieldValues>) {
  const { formatNullableDate, constants } = useDate();

  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        const date = value as Date;

        return (
          <FormControl className={containerClassName}>
            <FormLabel className={labelClassName} hidden={!label} error={error!} htmlFor={name} required={required}>
              {label}
            </FormLabel>

            <div className="relative">
              <Popover>
                <Popover.Trigger id={name} asChild>
                  <Button
                    className={cn(
                      'aria-expanded:bg-accent/50 flex w-full justify-between',
                      error &&
                        'border-destructive hover:ring-destructive focus-within:ring-destructive border bg-transparent ps-8 focus-within:ring hover:bg-transparent hover:ring',
                      className,
                    )}
                    variant="outline"
                    disabled={disabled}
                    {...field}
                  >
                    <div className="flex grow items-center gap-2">
                      <CalendarIcon size={20} />

                      <Conditional>
                        <Conditional.If condition={!!date}>
                          {formatNullableDate(date, constants.DateFormats.FULL_MONTH_DAY_YEAR, '')}
                        </Conditional.If>

                        <Conditional.Else>
                          <span>{placeholder}</span>
                        </Conditional.Else>
                      </Conditional>
                    </div>

                    <Conditional.If condition={!!date}>
                      <XIcon
                        className="hover:text-destructive"
                        size={16}
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(undefined);
                        }}
                      />
                    </Conditional.If>
                  </Button>
                </Popover.Trigger>

                <Popover.Content className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={onChange} initialFocus {...props} />
                </Popover.Content>
              </Popover>

              <FormMessage className={errorClassName} hidden={!error} error={error!} />
            </div>
          </FormControl>
        );
      }}
    />
  );
}

FormDatePicker.displayName = 'FormDatePicker';

export default FormDatePicker;
