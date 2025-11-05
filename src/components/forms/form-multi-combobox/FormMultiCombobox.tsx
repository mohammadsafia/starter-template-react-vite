import type { MouseEvent } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';

import { Badge, Button, Command, type CommandProps, Popover } from '@components/ui';
import { Conditional } from '@components/shared';
import { FormControl, FormLabel, FormMessage } from '@components/forms';

import { cn } from '@utils';

import { Check, ChevronsUpDown, XIcon } from 'lucide-react';

import type { ControlledFieldBaseProps, FormSelectOption } from '@app-types';

type FormComboboxProps<TFieldValues extends FieldValues, TOption = FormSelectOption[]> = ControlledFieldBaseProps<
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

function FormMultiCombobox<TFieldValues extends FieldValues, TOption = FormSelectOption[]>({
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
        const internalValue = valueType === 'contain' ? value.map((option: TOption) => getOptionValue(option)) : value;

        const selectedValues = new Set<string>(internalValue);

        const onValueChange = (selectedValue: string) => {
          selectedValues.has(selectedValue) ? selectedValues.delete(selectedValue) : selectedValues.add(selectedValue);

          const valueToSet = valueType === 'contain' ? Array.from(selectedValues).map(findOptionByValue) : Array.from(selectedValues);

          onChange(valueToSet);
        };

        const onClearSelections = (event: MouseEvent) => {
          event.stopPropagation();

          onChange(undefined);
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
                      'aria-expanded:bg-accent/50 w-full justify-between px-2 h-auto',
                      error &&
                        'border-destructive hover:ring-destructive focus-within:ring-destructive border bg-transparent ps-8 focus-within:ring hover:bg-transparent hover:ring h-auto',
                      className,
                    )}
                    {...field}
                  >
                    <div>
                      <Conditional>
                        <Conditional.If condition={selectedValues.size > 0}>
                          {Array.from(selectedValues).map((selectedVal) => (
                            <Badge key={selectedVal} className="me-1 my-1">
                              {getOptionLabel(findOptionByValue(selectedVal)!)}
                            </Badge>
                          ))}
                        </Conditional.If>

                        <Conditional.Else>{placeholder}</Conditional.Else>
                      </Conditional>
                    </div>

                    <div className="flex items-center gap-2">
                      <Conditional.If condition={selectedValues.size > 0}>
                        <Button asChild variant="outline-destructive" size="icon" className="h-4 w-4" onClick={onClearSelections}>
                          <XIcon size={16} />
                        </Button>
                      </Conditional.If>

                      <ChevronsUpDown size={16} className="opacity-50" />
                    </div>
                  </Button>
                </Popover.Trigger>

                <Popover.Content className="min-w-96 p-0" align="start">
                  <Command {...props}>
                    <Command.Input placeholder={placeholder} />

                    <Command.List>
                      <Command.Empty>{noOptionsText}</Command.Empty>

                      <Command.Group>
                        {mappedOptions.map((option) => {
                          return (
                            <Command.Item
                              key={getOptionValue(option)}
                              value={getOptionLabel(option)}
                              disabled={getOptionDisabled?.(option)}
                              onSelect={() => onValueChange(getOptionValue(option))}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn('mr-2 h-4 w-4', selectedValues.has(getOptionValue(option)) ? 'opacity-100' : 'opacity-0')}
                              />

                              {getOptionLabel(option)}
                            </Command.Item>
                          );
                        })}
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

FormMultiCombobox.displayName = 'FormCombobox';

export default FormMultiCombobox;
