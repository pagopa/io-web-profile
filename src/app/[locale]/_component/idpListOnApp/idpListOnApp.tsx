import { Divider, Grid, Icon, Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const IdpListOnApp = () => {
  const t = useTranslations('ioesco.common');
  const mockedIdentityProviders = [
    {
      identifier: 'Ultimo accesso il 06 ott 2022 alle 16:43',
      entityId: 'arubaid',
      name: 'Aruba.it ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-arubaid.png',
    },
    {
      identifier: 'Sessione attiva in app',
      entityId: 'posteid',
      name: 'Poste ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-posteid.png',
    },
    {
      identifier: 'Ultimo accesso il 21 gen 2023 alle 11:07',
      entityId: 'infocertid',
      name: 'Infocert ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-infocertid.png',
    },
  ];

  return (
    <>
      <Typography variant="overline" color={'textSecondary'}>
        {t('youridentityonio')}
      </Typography>
      <Paper
        elevation={2}
        variant="outlined"
        sx={{
          marginTop: '22px',
          marginBottom: '60px',
          maxWidth: '550px',
        }}
      >
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
                <Grid item display={{ xs: 'none', sm: 'block' }}>
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
