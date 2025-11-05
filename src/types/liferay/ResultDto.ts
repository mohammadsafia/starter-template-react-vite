import { Pagination, ResourceActionsDto } from '@app-types';

type FacetValue = {
  numberOfOccurrences: number;
  term: string;
};

type Facet = {
  facetCriteria: string;
  facetValues: FacetValue[];
};

export type ResultDto<T extends Record<string, any>> = Pagination & {
  actions: ResourceActionsDto;
  facets?: Facet[];
  items: T[];
};
