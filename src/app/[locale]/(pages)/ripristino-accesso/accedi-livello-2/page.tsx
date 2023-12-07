'use client';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { SpidLevels } from '../../../_component/selectIdp/idpList';
import { SelectIdp } from '../../../_component/selectIdp/selectIdp';
import { goCIE } from '@/app/[locale]/_utils/idps';
import useToken from '@/app/[locale]/_hooks/useToken';

const Access = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const { removeToken } = useToken();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const spidLevel: SpidLevels = {
    type: 'L2',
  };

  const handleCIELogin = () => {
    removeToken();
    goCIE(spidLevel);
  };

  const handleSPIDLogin = () => {
    setOpenDialog(true);
  };

  return (
    <Grid container justifyContent="center" bgcolor="background.default">
      <Grid item xs={12} sm={7.2} md={8}>
        <Grid container direction={'column'} alignItems={'center'} pt={{ xs: 4, sm: 8, md: 20 }}>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textAlign: 'center',
            }}
            mb={2}
          >
            {t('common.restoreioaccess')}
          </Typography>

          <Grid item justifyContent="center">
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
              mb={{ xs: 4, md: 6 }}
              maxWidth={{ xs: '327px', sm: '330px', md: '480px' }}
            >
              {t('magiclink.restore')}
            </Typography>
          </Grid>

          <Grid item justifyContent="center" maxWidth="500px" mb={{ xs: 6, sm: 8, md: 16 }}>
            <Card
              sx={{
                boxShadow:
                  '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                borderRadius: '16px',
                bgcolor: 'background.paper',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 }, width: { sm: '276px', md: '416px' } }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    id="spidButton"
                    sx={{
                      borderRadius: '4px',
                      width: '100%',
                      height: '50px',
                    }}
                    onClick={() => handleSPIDLogin()}
                    variant="contained"
                    startIcon={<SpidIcon />}
                  >
                    {t('common.loginspid')}
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    sx={{
                      borderRadius: '4px',
                      width: '100%',
                      height: '50px',
                      marginTop: 2,
                    }}
                    variant="contained"
                    startIcon={<CieIcon />}
                    onClick={() => handleCIELogin()}
                  >
                    {t('common.logincie')}
                  </Button>
                </Box>
                <Divider sx={{ my: { xs: 2, md: 4 } }} variant="fullWidth" />
                <Grid
                  textAlign={'center'}
                  container
                  gap={1}
                  alignItems={'baseline'}
                  justifyContent={'center'}
                >
                  <Typography variant="body1">{t('lpaccess.nospidorcie')}</Typography>
                  <Typography variant="body1" color={'primary.dark'}>
                    <Link target="blank" href={'https://identitadigitale.gov.it'}>
                      {t('common.more')}
                    </Link>
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <SelectIdp
        isOpen={openDialog}
        spidLevel={spidLevel}
        onClose={(opn) => {
          setOpenDialog(opn);
        }}
      />
    </Grid>
  );
};

export default Access;
