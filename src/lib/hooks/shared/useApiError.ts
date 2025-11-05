import { useToast } from '@hooks/shared/useToast';
import type { ApiError } from '@app-types';

export const useApiError = () => {
  const { toast } = useToast();
  const renderApiError = (e: Error) => {
    const errors = e as unknown as ApiError;
    if (!errors?.details) {
      return toast({
        title: errors.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }

    return Object.entries(errors.details).flatMap(([_, messages]) => {
      return messages.map((message) =>
        toast({
          title: message,
          variant: 'destructive',
        }),
      );
    });
  };
  return { renderApiError };
};
