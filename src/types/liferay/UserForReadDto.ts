import { ActionDto } from "./ActionDto";

type RoleBrief = {
  id: number;
  name: string;
};

type SiteBrief = {
  descriptiveName: string;
  id: number;
  name: string;
  roleBriefs: RoleBrief[];
};

type UserAccountContactInformation = {
  emailAddresses: string[];
  facebook: string;
  jabber: string;
  postalAddresses: string[];
  skype: string;
  sms: string;
  telephones: string[];
  twitter: string;
  webUrls: string[];
};

export type UserForReadDto = {
  accountBriefs: any[];
  actions: ActionDto;
  additionalName: string;
  alternateName: string;
  birthDate: string;
  customFields: any[];
  dashboardURL: string;
  dateCreated: string;
  dateModified: string;
  emailAddress: string;
  externalReferenceCode: string;
  familyName: string;
  givenName: string;
  id: number;
  image: string;
  imageId: number;
  jobTitle: string;
  keywords: any[];
  languageDisplayName: string;
  languageId: string;
  lastLoginDate: string;
  name: string;
  organizationBriefs: any[];
  profileURL: string;
  roleBriefs: RoleBrief[];
  siteBriefs: SiteBrief[];
  status: string;
  userAccountContactInformation: UserAccountContactInformation;
  userGroupBriefs: any[];
};
