import { Button, Grid, Icon } from '@mui/material';
import { SHA256 } from 'crypto-js';
import useLogin from '../../_hooks/useLogin';
import { IDPS, IdentityProvider } from '../../_utils/idps';

import { storageLoginInfoOps, storagePrivilegeOps, storageTokenOps } from '../../_utils/storage';
import { userFromJwtToken } from '../../_utils/jwt';
import { trackEvent } from '../../_utils/mixpanel';
import { getLoginFlow, isBrowser } from '../../_utils/common';
import useToken from '../../_hooks/useToken';

type IdpList = {
  spidLevel: SpidLevels;
  loginPage: string;
};

type SpidLevelL1 = {
  type: 'L1';
};

type SpidLevelL2 = {
  type: 'L2';
};

type SpidLevelL3 = {
  type: 'L3';
};

export type SpidLevels = SpidLevelL1 | SpidLevelL2 | SpidLevelL3;

export function IdpList({ spidLevel, loginPage }: IdpList) {
  const { userLogged } = useLogin();
  const { removeToken } = useToken();
  const token = storageTokenOps.read();
  const taxCode = token ? userFromJwtToken(storageTokenOps.read()).taxCode : undefined;

  const savePrivilegesData = () => {
    if (taxCode) {
      storagePrivilegeOps.write({
        previousSecurityLevel: userLogged?.spidLevel || undefined,
        identity: SHA256(taxCode).toString(),
      });
    }
  };

  const getSPID = (IDP: IdentityProvider, page: string) => {
    storageLoginInfoOps.write({
      idpId: IDP.entityId,
      idpName: IDP.name,
      idpSecurityLevel: spidLevel,
      loginPage: page,
    });
    savePrivilegesData();
    if (spidLevel.type === 'L1') {
      trackEvent('IO_SESSION_EXIT_LOGIN_IDP_SELECTED', {
        event_category: 'UX',
        event_type: 'action',
      });
    } else {
      trackEvent('IO_PROFILE_LOGIN_IDP_SELECTED', {
        SPID_IDP_ID: IDP.entityId,
        SPID_IDP_NAME: IDP.name,
        event_category: 'UX',
        event_type: 'action',
      });
    }

    trackEvent('IO_LOGIN_START', {
      SPID_IDP_ID: IDP.entityId,
      SPID_IDP_NAME: IDP.name,
      Flow: getLoginFlow(storageLoginInfoOps.read()),
      event_category: 'TECH',
    });
    removeToken();
    if (isBrowser()) {
      window.location.assign(
        `${process.env.NEXT_PUBLIC_URL_SPID_LOGIN}?entityID=${IDP.entityId}&authLevel=Spid${spidLevel.type}&RelayState=ioapp`
      );
    }
  };

  return (
    <>
      <Grid item maxWidth={375}>
        <Grid container direction="row" justifyItems="center">
          {IDPS.identityProviders.map((IDP, i) => (
            <Grid
              item
              key={IDP.entityId}
              xs={6}
              p={1}
              textAlign={i % 2 === 0 ? 'right' : 'left'}
              sx={{ minWidth: '100px' }}
            >
              <Button
                onClick={() => getSPID(IDP, loginPage)}
                sx={{ backgroundColor: 'background.default', alignItems: 'center' }}
                aria-label={IDP.name}
                id={IDP.entityId}
              >
                <Icon
                  sx={{ width: '100px', height: '48px', display: 'flex', alignItems: ' center' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img width="100px" src={IDP.imageUrl} alt={IDP.name} />
                </Icon>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
