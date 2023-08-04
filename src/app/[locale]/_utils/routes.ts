export const ROUTES = {
  LOGIN: `/accedi`,
  LOGIN_L3: `/ripristino-accesso/accedi-livello-3`,
  LOGOUT_INIT: `/esci`,
  SESSION: `/esci/sessione-attiva`,
  THANK_YOU: '/esci/operazione-completata',
  LOGOUT_NO_SESSION_L1: '/esci/nessuna-sessione-attiva',
  LOGOUT_KO: '/esci/errore',
  PROFILE: `/`,
  PROFILE_BLOCK: `/blocco-accesso`,
  PROFILE_BLOCK_KO: `/blocco-accesso/errore`,
  PROFILE_RESTORE: `/ripristino-accesso`,
  PROFILE_RESTORE_KO: `/ripristino-accesso/errore`,
  RESTORE_CODE: `/ripristino-accesso/inserisci-codice`,
  RESTORE_THANK_YOU: `/ripristino-accesso/operazione-completata`,
  PROFILE_BLOCK_SUCCESS: `/blocco-accesso/operazione-completata`,
  KO: '/ko',
  LOGOUT_NO_SESSION_L2: '/nessun-profilo',
  ERROR: '/accedi/errore',
  EXPIRED_MAGIC_LINK: '/expiredMagicLink',
};

// Get an array of values from the ROUTES object
export const EXISTING_ROUTES: string[] = Object.values(ROUTES);

export const PUBBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.LOGOUT_INIT,
  ROUTES.ERROR,
  ROUTES.EXPIRED_MAGIC_LINK,
];

export const LOGIN_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT];
