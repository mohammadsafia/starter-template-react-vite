import { type ComponentPropsWithoutRef } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';

import { FormControl, FormLabel, FormMessage } from '@components/forms';
import { Select } from '@components/ui';

import { cn } from '@utils';

import type { ControlledFieldBaseProps, FormSelectOption } from '@app-types';
import { Conditional } from '@components/shared';

type FormSelectProps<TFieldValues extends FieldValues, TOption = FormSelectOption> = ControlledFieldBaseProps<
  TFieldValues,
  ComponentPropsWithoutRef<typeof Select>
> & {
  className?: string;
  options: TOption[];
  placeholder?: string;
  valueType?: 'flat' | 'contain';
  noOptionsText?: string;
  getOptionLabel(option: TOption): string;
  getOptionValue(option: TOption): string;
  getOptionGroup?(option: TOption): string;
  optionMapper?(option: TOption): TOption;
};

function FormSelect<TFieldValues extends FieldValues, TOption = FormSelectOption>({
  name,
  rules,
  control,
  label,
  containerClassName,
  labelClassName,
  className,
  errorClassName,
  required,
  options,
  placeholder = 'Select',
  noOptionsText = 'No Options',
  valueType = 'flat',
  getOptionLabel,
  getOptionValue,
  optionMapper,
  getOptionGroup,
  ...props
}: FormSelectProps<TFieldValues, TOption>) {
  const mappedOptions = options.map((option) => (optionMapper ? optionMapper(option) : option));

  const findOptionByValue = (value: string): TOption | undefined => {
    return options.find((option) => getOptionValue(option) === value);
  };
  const groupedOptions = getOptionGroup
    ? Array.from(
        mappedOptions.reduce((acc, option) => {
          const group = getOptionGroup!(option);
          if (!acc.has(group)) acc.set(group, []);
          acc.get(group)!.push(option);
          return acc;
        }, new Map<string, typeof mappedOptions>()),
      )
    : [];
  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, value, onChange, ...field }, fieldState: { error } }) => {
        const internalValue = valueType === 'contain' && value !== null ? getOptionValue(value as TOption) : value;

        const onValueChange = (selectedValue: string) => {
          onChange(valueType === 'contain' ? findOptionByValue(selectedValue) : selectedValue);
        };

        return (
          <FormControl className={containerClassName}>
            <FormLabel className={labelClassName} hidden={!label} error={error!} htmlFor={name} required={required}>
              {label}
            </FormLabel>

            <div className="relative">
              <Select value={internalValue ?? ''} onValueChange={onValueChange} {...field} {...props}>
                <Select.Trigger
                  ref={(el) => ref(el)}
                  id={name}
                  className={cn(
                    'aria-expanded:bg-accent/50 text-start',
                    error && 'border-destructive hover:ring-destructive focus-visible:ring-destructive focus:ring-destructive ps-8',
                    className,
                  )}
                >
                  <Select.Value placeholder={placeholder} />
                </Select.Trigger>

                <Select.Content position="popper">
                  <Select.Item
                    aria-hidden="true"
                    className={cn('cursor-pointer', mappedOptions.length > 0 && 'hidden')}
                    value="none"
                    disabled
                  >
                    {noOptionsText}
                  </Select.Item>
                  <Conditional>
                    <Conditional.If condition={!!getOptionGroup}>
                      {groupedOptions.map(([group, options]) => (
                        <Select.Group key={group}>
                          <Select.Label>{group}</Select.Label>
                          {options.map((option) => (
                            <Select.Item key={getOptionValue(option)} value={getOptionValue(option)} className="cursor-pointer">
                              {getOptionLabel(option)}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      ))}
                    </Conditional.If>
                    <Conditional.If condition={mappedOptions.length > 0}>
                      {mappedOptions.map((option) => (
                        <Select.Item key={getOptionValue(option)} value={getOptionValue(option)} className="cursor-pointer">
                          {getOptionLabel(option)}
                        </Select.Item>
                      ))}
                    </Conditional.If>
                    <Conditional.Else>
                      <Select.Item disabled value="">
                        {noOptionsText}
                      </Select.Item>
                    </Conditional.Else>
                  </Conditional>
                </Select.Content>
              </Select>

              <FormMessage className={errorClassName} hidden={!error} error={error!} />
            </div>
          </FormControl>
        );
      }}
    />
  );
}

FormSelect.displayName = 'FormSelect';

export default FormSelect;
