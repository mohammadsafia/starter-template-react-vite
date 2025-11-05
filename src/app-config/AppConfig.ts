import type { AppConfig } from '@app-types';

const APP_CONFIGURATIONS: AppConfig = {
  TENANT_KEY: 'tenantKey',
  VITE_APP_API_URL: 'http://localhost:3000/api',
};

export default Object.freeze(APP_CONFIGURATIONS);
