export const ROUTES = {
  LOGIN: `/accedi`,
  LOGIN_L3: `/ripristino-accesso/accedi-livello-3`,
  LOGOUT_INIT: `/esci`,
  SESSION: `/esci/sessione-attiva`,
  PROFILE: `/`,
  PROFILE_BLOCK: `/blocco-accesso`,
  PROFILE_RESTORE: `/ripristino-accesso`,
  PROFILE_RESTORE_L3: `/profileRestoreL3`, // DUPLICATE?
  RESTORE_CODE: `/ripristino-accesso/inserisci-codice`, // ON JIRA, THEY EXPECT TWO PAGE FOR THIS?
  RESTORE_THANK_YOU: `/ripristino-accesso/operazione-completata`,
  PROFILE_BLOCK_SUCCESS: `/blocco-accesso/operazione-completata`,
  PROFILE_ACCESS_BLOCK: `/profileAccessBlock`, // TO DELETE AND INTEGRATE INSIDE PROFILE (3 CARDS DYNAMIC)
  VALIDATE_SESSION: '/validateSession', // MISSING ON JIRA
  THANK_YOU: '/esci/operazione-completata',
  LOGOUT_AUTH_KO: '/logoutKoAuth', // MISSING ON JIRA
  LOGOUT_KO: '/esci/errore',
  KO: '/ko',
  LOGOUT_NO_SESSION_L1: '/esci/nessuna-sessione-attiva',
  LOGOUT_NO_SESSION_L2: '/nessun-profilo',
  ERROR: '/accedi/errore',
  EXPIRED_MAGIC_LINK: '/expiredMagicLink', // MISSIN ON JIRA
};

export const PUBBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.LOGOUT_INIT,
  ROUTES.VALIDATE_SESSION,
  ROUTES.ERROR,
  ROUTES.EXPIRED_MAGIC_LINK,
];
export const LOGIN_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT, ROUTES.EXPIRED_MAGIC_LINK];
