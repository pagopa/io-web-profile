'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { isIDPKnown } from '../../_utils/idps';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import { Flows } from '../../_enums/Flows';
import { ROUTES } from '../../_utils/routes';

const ProfileBlock = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  const renderSummary = (isIDPKnown: boolean) => {
    if (isIDPKnown) {
      return <>{t('lockaccess.accessidentity')}</>;
    }
    return <>{t('lockaccess.accessidentitycompromise')}</>;
  };

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <BackButton />
        <Introduction
          title={'Vuoi bloccare l’accesso a IO?'}
          summary={renderSummary(isIDPKnown)}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          {isIDPKnown && <IdpListOnApp />}
          <Typography mb={5}>{t('common.lockaccessinfo')}</Typography>
          <Link href={ROUTES.PROFILE_BLOCK_SUCCESS}>
            <Button variant="contained" size="medium">
              {t('profile.lockaccess')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FAQ flow={Flows.BLOCK} />
    </>
  );
};

export default ProfileBlock;
