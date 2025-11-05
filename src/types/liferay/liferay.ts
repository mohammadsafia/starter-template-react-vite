export type LangsDash = 'en-US' | 'ar-SA' | 'en-GB' | 'ar-AE';
export type Langs = 'en_US' | 'ar_SA' | 'en_GB' | 'ar_AE';

export type Liferay = {
  ThemeDisplay: {
    getSiteGroupId(): number;
    isSignedIn(): boolean;
    getUserId(): string;
    getPortalURL(): string;
    getPlid(): string;
    getLanguageId(): Langs;
    getBCP47LanguageId(): LangsDash;
    getUserName(): string;
    getPathMain(): string;
  };
  authToken?: string;
};

export type WorkflowTask = {
  completed: boolean;
  dateCreated: string;
  description: string;
  id: number;
  label: string;
  name: string;
  objectReviewed: { assetTitle: string; assetType: string; id: number };
  workflowDefinitionId: number;
  workflowDefinitionName: string;
  workflowDefinitionVersion: string;
  workflowInstanceId: number;
};
