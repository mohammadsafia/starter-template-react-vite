export const ApiEndpoints = {
  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    INDEX: '/users',
    SEND_INVITE: '/users/:inviteId/send-invite',
    ACTIVATE_INVITED_USER: '/users/:inviteId/activate',
    PROFILE: '/users/:userId',
    PERSONAL_PROFILE: '/users/:userId/profile',
  }
} as const;
