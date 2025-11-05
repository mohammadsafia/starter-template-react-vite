import { useIsFetching } from "@tanstack/react-query";

export const useIsFetchingQuery = (queryKey: string) => {
  const isFetching = useIsFetching({ queryKey: [queryKey] });
  const isLoading = isFetching > 0;
  
  return {
    isLoading
  };
};