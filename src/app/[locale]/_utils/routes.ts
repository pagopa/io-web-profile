export const ROUTES = {
  LOGIN: `/accedi/`,
  LOGIN_L2: `/ripristino-accesso/accedi-livello-2/`,
  LOGIN_L3: `/ripristino-accesso/accedi-livello-3/`,
  LOGOUT_INIT: `/esci/`,
  THANK_YOU: '/esci/operazione-completata/',
  LOGOUT_KO: '/esci/errore/',
  LOGOUT_CONFIRM: '/esci/conferma/',
  PROFILE: `/`,
  PROFILE_BLOCK: `/blocco-accesso/`,
  PROFILE_BLOCK_KO: `/blocco-accesso/errore/`,
  PROFILE_RESTORE: `/ripristino-accesso/`,
  PROFILE_RESTORE_KO: `/ripristino-accesso/errore/`,
  RESTORE_CODE: `/ripristino-accesso/inserisci-codice/`,
  RESTORE_THANK_YOU: `/ripristino-accesso/operazione-completata/`,
  PROFILE_BLOCK_SUCCESS: `/blocco-accesso/operazione-completata/`,
  KO: '/ko/',
  ERROR: '/accedi/errore/',
  EXPIRED_MAGIC_LINK: '/blocco-accesso/link-scaduto/',
  MAGIC_LINK: '/blocco-accesso/magic-link/',
  ALREADY_LOCKED: '/accesso-bloccato/',
  NOT_FOUND_PAGE: '/404/',
  INTERNAL_ERROR: '/500/',
  PRIVACY_POLICY: '/informativa-privacy/',
  REVOKE_WALLET: '/revoca-wallet/',
  WALLET_THANK_YOU: '/revoca-wallet/operazione-completata/',
  WALLET_REVOKE_ERROR: '/revoca-wallet/errore/',
  EMAIL_CONFIRMATION: '/conferma-email/',
  EMAIL_CONFIRMATION_LINK_EXPIRED: '/conferma-email/link-scaduto/',
  EMAIL_NOT_CONFIRMED: '/conferma-email/non-confermata/',
  EMAIL_CONFIRMED: '/conferma-email/email-confermata/',
  EMAIL_CONFIRMATION_ALREADY_COMPLETED: '/conferma-email/email-gia-confermata/',
};

// Get an array of values from the ROUTES object
export const EXISTING_ROUTES: string[] = Object.values(ROUTES);

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.LOGOUT_INIT,
  ROUTES.ERROR,
  ROUTES.EXPIRED_MAGIC_LINK,
  ROUTES.MAGIC_LINK,
  ROUTES.NOT_FOUND_PAGE,
  ROUTES.INTERNAL_ERROR,
  ROUTES.PRIVACY_POLICY,
  ROUTES.REVOKE_WALLET,
  ROUTES.EMAIL_CONFIRMATION,
  ROUTES.EMAIL_CONFIRMATION_LINK_EXPIRED,
  ROUTES.EMAIL_NOT_CONFIRMED,
  ROUTES.EMAIL_CONFIRMED,
  ROUTES.EMAIL_CONFIRMATION_ALREADY_COMPLETED,
];

export const LOGIN_ROUTES = [ROUTES.LOGIN, ROUTES.LOGOUT_INIT];

export const EMAIL_VALIDATION_ROUTES = [ROUTES.EMAIL_CONFIRMATION,ROUTES.EMAIL_CONFIRMED,ROUTES.EMAIL_NOT_CONFIRMED,ROUTES.EMAIL_CONFIRMATION_LINK_EXPIRED,ROUTES.EMAIL_CONFIRMATION_ALREADY_COMPLETED];

export const PRIVATE_ROUTES = EXISTING_ROUTES.filter((route) => !PUBLIC_ROUTES.includes(route));

