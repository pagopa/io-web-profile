import React from 'react';
import { Grid, Button, Icon } from '@mui/material';
import { IDPS, IdentityProvider } from '../../_utils/idps';

export function IdpList() {
  const getSPID = (IDP: IdentityProvider) => {
    window.location.assign(`http://localhost:9090/login?entityID=${IDP.entityId}&authLevel=SpidL1`);
  };

  return (
    <>
      <Grid item pb={5} width={400}>
        <Grid container direction="row" justifyItems="center" spacing={2}>
          {IDPS.identityProviders.map((IDP, i) => (
            <Grid
              item
              key={IDP.entityId}
              xs={6}
              textAlign={i % 2 === 0 ? 'right' : 'left'}
              sx={{ minWidth: '100px' }}
            >
              <Button
                onClick={() => getSPID(IDP)}
                sx={{ width: '100px', padding: '0', marginLeft: '10px' }}
                aria-label={IDP.name}
                id={IDP.entityId}
              >
                <Icon sx={{ width: '100px', height: '48px' }}>
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
