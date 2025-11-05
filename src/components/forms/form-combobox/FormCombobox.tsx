import { Controller, type FieldValues } from 'react-hook-form';

import { FormControl, FormLabel, FormMessage } from '@components/forms';
import { Button, Command, type CommandProps, Popover } from '@components/ui';

import { cn } from '@utils';

import { Check, ChevronsUpDown } from 'lucide-react';

import type { ControlledFieldBaseProps, FormSelectOption } from '@app-types';

type FormComboboxProps<TFieldValues extends FieldValues, TOption = FormSelectOption> = ControlledFieldBaseProps<
  TFieldValues,
  CommandProps
> & {
  options: TOption[];
  placeholder?: string;
  noOptionsText?: string;
  valueType?: 'flat' | 'contain';
  getOptionLabel(option: TOption): string;
  getOptionValue(option: TOption): string;
  getOptionDisabled?(option: TOption): boolean;
  optionMapper?(option: TOption): TOption;
};

function FormCombobox<TFieldValues extends FieldValues, TOption = FormSelectOption>({
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
  options,
  placeholder = 'Select',
  noOptionsText = 'No options',
  valueType = 'flat',
  getOptionLabel,
  getOptionValue,
  getOptionDisabled,
  optionMapper,
  ...props
}: FormComboboxProps<TFieldValues, TOption>) {
  const mappedOptions = options.map((option) => (optionMapper ? optionMapper(option) : option));

  const findOptionByValue = (value: string): TOption | undefined => {
    return options.find((option) => getOptionValue(option) === value);
  };

  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
        const internalValue = valueType === 'contain' ? getOptionValue(value as TOption) : value;

        const selectedOption = internalValue ? findOptionByValue(internalValue) : undefined;
        const displayValue = selectedOption ? getOptionLabel(selectedOption) : placeholder;

        const onValueChange = (selectedValue: string) => {
          onChange(internalValue === selectedValue ? null : valueType === 'contain' ? findOptionByValue(selectedValue) : selectedValue);
        };

        return (
          <FormControl className={containerClassName}>
            <FormLabel className={labelClassName} hidden={!label} error={error!} htmlFor={name} required={required}>
              {label}
            </FormLabel>

            <div className="relative">
              <Popover>
                <Popover.Trigger asChild>
                  <Button
                    id={name}
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      'aria-expanded:bg-accent/50 w-full justify-between px-2',
                      error &&
                        'border-destructive hover:ring-destructive focus-within:ring-destructive border bg-transparent ps-8 focus-within:ring hover:bg-transparent hover:ring',
                      className,
                    )}
                    {...field}
                  >
                    {displayValue}

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </Popover.Trigger>

                <Popover.Content className="w-full p-0" align="start">
                  <Command {...props}>
                    <Command.Input placeholder={placeholder} />

                    <Command.List>
                      <Command.Empty>{noOptionsText}</Command.Empty>

                      <Command.Group>
                        {mappedOptions.map((option) => (
                          <Command.Item
                            key={getOptionValue(option)}
                            value={getOptionLabel(option)}
                            disabled={getOptionDisabled?.(option)}
                            onSelect={() => onValueChange(getOptionValue(option))}
                            className="cursor-pointer"
                          >
                            <Check className={cn('mr-2 h-4 w-4', internalValue === getOptionValue(option) ? 'opacity-100' : 'opacity-0')} />
                            {getOptionLabel(option)}
                          </Command.Item>
                        ))}
                      </Command.Group>
                    </Command.List>
                  </Command>
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

FormCombobox.displayName = 'FormCombobox';

export default FormCombobox;
