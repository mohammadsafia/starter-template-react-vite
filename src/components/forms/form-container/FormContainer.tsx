import type { PropsWithChildren } from 'react';
import { type FieldValues, FormProvider, type SubmitHandler, type UseFormProps, type UseFormReturn } from 'react-hook-form';

export type FormContainerProps<TFieldValues extends FieldValues = FieldValues> = PropsWithChildren<
  UseFormProps<TFieldValues> & {
    formContext: UseFormReturn<TFieldValues>;
    onSuccess: SubmitHandler<TFieldValues>;
    className?: string;
  }
>;

function FormContainer<TFieldValues extends FieldValues = FieldValues>({
  children,
  formContext,
  onSuccess,
  ...props
}: FormContainerProps<TFieldValues>) {
  return (
    <FormProvider<TFieldValues> {...formContext}>
      <form autoComplete="new-password" noValidate {...props} onSubmit={formContext.handleSubmit(onSuccess)}>
        {children}
      </form>
    </FormProvider>
  );
}

export default FormContainer;
