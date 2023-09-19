import { SpidLevels } from '../_component/selectIdp/idpList';

export type LoginAttempt = {
  idpSecurityLevel: SpidLevels;
  idpId: string;
  idpName: string;
};
