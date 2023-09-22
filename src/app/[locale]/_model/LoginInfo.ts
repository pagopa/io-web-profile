import { SpidLevels } from '../_component/selectIdp/idpList';

export type LoginInfo = {
  idpSecurityLevel: SpidLevels;
  idpId: string;
  idpName: string;
};
