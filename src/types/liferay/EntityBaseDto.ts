import { CreatorForReadDto } from "./CreatorForReadDto";
import { EntityItemActions } from "./EntityItemActions";
import { EntityStatusForReadDto } from "./EntityStatusForReadDto";

export type EntityBaseDto = {
  dateCreated: string;
  dateModified: string;
  externalReferenceCode: string;
  creator: CreatorForReadDto;
  id: number;
  status: EntityStatusForReadDto;
  keywords: unknown[];
  taxonomyCategoryBriefs: unknown[];
  actions: EntityItemActions
};
