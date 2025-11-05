import 'axios';
import { type Auth0ContextInterface } from '@auth0/auth0-react';
import { AppConfig } from '@app-config';

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
