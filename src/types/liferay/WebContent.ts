import { CreatorForReadDto } from "./CreatorForReadDto";

export type ContentFieldResult<T, type extends string = string> = {
  contentFieldValue: type extends '' ? {} : T;
  dataType: string;
  inputControl?: string;
  label: string;
  name: string;
  nestedContentFields: type extends '' ? ContentFieldResult<ContentFieldValue>[] : never;
  repeatable: boolean;
};

export type WebContentMediaResult = {
  contentType: string;
  contentUrl: string;
  description: string;
  encodingFormat: string;
  fileExtension: string;
  id: number;
  sizeInBytes: number;
  title: string;
};

export type ContentFieldValue = {
  data?: string;
  image?: WebContentMediaResult;
  document?: WebContentMediaResult;
  link?: string;
};

export type WebContentResult = {
  availableLanguages: string[];
  contentFields: ContentFieldResult<ContentFieldValue>[];
  contentStructureId: number;
  creator: CreatorForReadDto;
  customFields: any[];
  dateCreated: string;
  dateModified: string;
  datePublished: string;
  description: string;
  externalReferenceCode: string;
  friendlyUrlPath: string;
  id: number;
  key: string;
  keywords: any[];
  numberOfComments: number;
  siteId: number;
  structuredContentFolderId: number;
  taxonomyCategoryBriefs: any[];
  title: string;
  uuid: string;
};
