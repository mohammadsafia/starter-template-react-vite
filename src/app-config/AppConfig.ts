import type { AppConfig } from '@app-types';

const APP_CONFIGURATIONS: AppConfig = {
    TENANT_KEY: 'tenantKey',
    VITE_APP_API_URL: 'http://localhost:3000/api',
    VITE_APP_SITE_GROUP_ID: 0,
    VITE_APP_USER_ID: '0',
    VITE_APP_LANGUAGE_ID: 'en_US',
    VITE_APP_BCP47_LANGUAGE_ID: 'en-US',
    VITE_APP_LIFERAY_HOST: 'http://localhost:8080',
};

export default Object.freeze(APP_CONFIGURATIONS);
