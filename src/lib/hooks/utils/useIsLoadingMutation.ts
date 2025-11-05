import { useIsMutating } from "@tanstack/react-query";

export const useIsLoadingMutation = (mutationKey: string) => {
  const isFetching = useIsMutating({ mutationKey: [mutationKey] });
  const isLoading = isFetching > 0;
  
  return {
    isLoading
  };
};