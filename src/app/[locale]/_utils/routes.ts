export const ROUTES = {
  LOGIN: `/access`,
  LOGOUT_INIT: `/logoutInit`,
  SESSION: `/session`,
  PROFILE: `/profile`,
  VALIDATE_SESSION: '/validateSession',
  THANK_YOU: '/thankyou',
  LOGOUT_AUTH_KO: '/logoutKoAuth',
  LOGOUT_KO: '/logoutKo',
  LOGOUT_NO_SESSION_L1: '/logoutNoSession/l1',
  LOGOUT_NO_SESSION_L2: '/logoutNoSession/l2',
};

export const PUBBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT, ROUTES.VALIDATE_SESSION];
export const LOGIN_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT];
