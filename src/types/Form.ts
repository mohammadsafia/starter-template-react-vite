import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ControllerProps, FieldValues, Path } from 'react-hook-form';

// Uncontrolled field base props that are generic and every uncontrolled-field must-have
export type FieldBaseProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>;
  label?: ReactNode;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

// Controlled field base props that are generic and every controlled-field must-have
export type ControlledFieldBaseProps<TFieldValues extends FieldValues = FieldValues, TInput = InputHTMLAttributes<HTMLInputElement>> = Omit<
  TInput,
  'name'
> &
  Omit<ControllerProps<TFieldValues>, 'render'> &
  FieldBaseProps<TFieldValues>;

export type FormSelectOption = Record<string, any> | string;
