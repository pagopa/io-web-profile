import { Divider, Grid, Icon, Paper, Typography } from '@mui/material';

export const IdpListOnApp = () => {
  const mockedIdentityProviders = [
    {
      identifier: 'Aruba',
      entityId: 'arubaid',
      name: 'Aruba.it ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-arubaid.png',
    },
    {
      identifier: 'Poste',
      entityId: 'posteid',
      name: 'Poste ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-posteid.png',
    },
    {
      identifier: 'Infocert',
      entityId: 'infocertid',
      name: 'Infocert ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-infocertid.png',
    },
  ];

  return (
    <>
      <Typography variant="overline" color={'textSecondary'}>
        Le tue identitÀ SU APP IO:
      </Typography>
      <Paper elevation={2} sx={{ marginTop: '22px', marginBottom: '60px', maxWidth: '550px' }}>
        {mockedIdentityProviders &&
          mockedIdentityProviders.map((item) => (
            <>
              <Grid
                key={item.entityId}
                container
                justifyContent={'space-between'}
                py={2}
                pl={4}
                pr={6}
              >
                <Grid item>
                  <Typography variant="sidenav">{item.name}</Typography>
                  <Typography variant="body2">{item.identifier}</Typography>
                </Grid>
                <Grid item>
                  <Icon
                    sx={{ width: '100px', height: '48px', display: 'flex', alignItems: 'center' }}
                  >
                    <img width="85.44px" src={item.imageUrl} alt={item.entityId} />
                  </Icon>
                </Grid>
              </Grid>
              <Divider />
            </>
          ))}
      </Paper>
    </>
  );
};
