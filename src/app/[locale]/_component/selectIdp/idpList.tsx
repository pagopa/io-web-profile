import React from 'react';
import { Grid, Button, Icon } from '@mui/material';
import { IDPS, IdentityProvider } from '../../_utils/idps';

interface IIdpList {
  spidLevel: SpidLevels;
}

interface ISpidLevelL1 {
  type: 'L1';
}

interface ISpidLevelL2 {
  type: 'L2';
}

interface ISpidLevelL3 {
  type: 'L3';
}

export type SpidLevels = ISpidLevelL1 | ISpidLevelL2 | ISpidLevelL3;

export function IdpList({ spidLevel }: IIdpList) {
  const getSPID = (IDP: IdentityProvider) => {
    window.location.assign(
      `${process.env.NEXT_PUBLIC_URL_SPID_LOGIN}?entityID=${IDP.entityId}&authLevel=Spid${spidLevel.type}`
    );
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
                onClick={() => getSPID(IDP)}
                sx={{ backgroundColor: 'background.default', alignItems: 'center' }}
                aria-label={IDP.name}
                id={IDP.entityId}
              >
                <Icon
                  sx={{ width: '100px', height: '48px', display: 'flex', alignItems: ' center' }}
                >
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
