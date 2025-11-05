import { type HTMLAttributes } from 'react';

import { cn } from '@utils';

type FormControlProps = HTMLAttributes<HTMLDivElement>;

const FormControl = ({ className, ...props }: FormControlProps) => {
  return <div data-slot="form-control" className={cn('relative space-y-2', className)} {...props} />;
};

export default FormControl;
