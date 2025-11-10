import 'axios';
import { type Auth0ContextInterface } from '@auth0/auth0-react';
import { AppConfig } from '@app-config';
import { FilterVariant, Option } from './data-table';

declare global {
  interface Window {
    generateToken: (getAccessToken: Auth0ContextInterface['getAccessTokenSilently']) => Promise<void>;
    appConfig: AppConfig;
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    withToken?: boolean;
    withTenantKey?: boolean;
  }
}

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
}
