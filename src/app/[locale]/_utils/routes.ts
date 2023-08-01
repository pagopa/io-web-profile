export const ROUTES = {
  LOGIN: `/access`,
  LOGIN_L3: `/accessL3`,
  LOGOUT_INIT: `/logoutInit`,
  SESSION: `/session`,
  PROFILE: `/profile`,
  PROFILE_BLOCK: `/profileBlock`,
  PROFILE_RESTORE: `/profileRestore`,
  PROFILE_RESTORE_L3: `/profileRestoreL3`,
  RESTORE_CODE: `/restoreCode`,
  RESTORE_THANK_YOU: `/restoreThankYou`,
  PROFILE_BLOCK_SUCCESS: `/profileBlockSuccess`,
  PROFILE_ACCESS_BLOCK: `/profileAccessBlock`,
  VALIDATE_SESSION: '/validateSession',
  THANK_YOU: '/thankyou',
  LOGOUT_AUTH_KO: '/logoutKoAuth',
  LOGOUT_KO: '/logoutKo',
  KO: '/ko',
  LOGOUT_NO_SESSION_L1: '/logoutNoSession/l1',
  LOGOUT_NO_SESSION_L2: '/logoutNoSession/l2',
  ERROR: '/error',
  EXPIRED_MAGIC_LINK: '/expiredMagicLink',
};

export const PUBBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.LOGOUT_INIT,
  ROUTES.VALIDATE_SESSION,
  ROUTES.ERROR,
  ROUTES.EXPIRED_MAGIC_LINK,
];
export const LOGIN_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT, ROUTES.EXPIRED_MAGIC_LINK];
