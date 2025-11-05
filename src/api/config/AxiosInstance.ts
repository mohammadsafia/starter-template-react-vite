import axios, { type AxiosInstance } from 'axios';
import { type Auth0ContextInterface } from '@auth0/auth0-react';

import { getPersistentData } from '@utils';
import { AppConfig } from '@app-config';

const instance: AxiosInstance = axios.create({
  baseURL: AppConfig.VITE_APP_API_URL,
});

export const setupAccessTokenInterceptor = (getAccessTokenSilently: Auth0ContextInterface['getAccessTokenSilently']) => {
  instance.interceptors.request.use(async (req) => {
    const token = await getAccessTokenSilently({ detailedResponse: true });

    if (req.withToken && token) req.headers.set('Authorization', `Bearer ${token.id_token}`);

    return req;
  });
};

instance.interceptors.request.use((req) => {
  const storageTenantKey = getPersistentData<string>(AppConfig.TENANT_KEY);

  if (req.withTenantKey && storageTenantKey) req.headers.set('TenantKey', storageTenantKey);

  return req;
});

export default instance;
