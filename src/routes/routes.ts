import type { ElementType } from 'react';

import { ROLES } from '@app-types';

import { LayoutDashboard, Users, Book } from 'lucide-react';
import { constructPlainRoutes } from '@utils';

export type AppMenu = {
  id: string;
  path: string;
  name?: string;
  roles: ROLES[];
  icon: ElementType;
  submenu?: AppMenu[];
};

export const FULL_ROUTES_PATH = {
  HOME: {
    INDEX: '/',
    HOME: 'home',
  },
  AUTH: {
    INDEX: 'auth',
    SIGN_IN: 'sign-in',
    SIGNUP: 'sign-up',
    FORGOT_PASSWORD: 'forgot-password',
    INVITED_USER: 'invite',
  },
  USERS: {
    INDEX: 'users',
    PROFILE: ':userId',
    CREATE: 'create',
    UPDATE: 'update/:userId',
    PERSONAL_PROFILE: 'profile/:userId',
    PERSONAL_UPDATE: 'profile/update/:userId',
  },
  DOCS: {
    INDEX: 'components',
  },
  ERRORS: {
    NOT_FOUND: '404',
    UNAUTHORIZED: '401',
    MAINTENANCE: '503',
    SERVER_ERROR: '500',
  },
  ROOT: {
    INDEX: '..',
  },
} as const;

export const ROUTES_PATH = constructPlainRoutes(FULL_ROUTES_PATH);

export const APP_MENU: AppMenu[] = [
  {
    id: '1',
    path: FULL_ROUTES_PATH.HOME.INDEX,
    icon: LayoutDashboard,
    name: 'Home',
    roles: [ROLES.ALL],
  },
  {
    id: '5',
    path: FULL_ROUTES_PATH.USERS.INDEX,
    icon: Users,
    name: 'Team',
    roles: [ROLES.ALL],
  },
  {
    id: '6',
    path: FULL_ROUTES_PATH.DOCS.INDEX,
    icon: Book,
    name: 'Components',
    roles: [ROLES.ALL],
  },
];
