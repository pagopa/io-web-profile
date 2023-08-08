'use client';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import Link from 'next-intl/link';
import { useRouter } from 'next-intl/client';
import { BackButton } from '../../../_component/backButton/backButton';
import { CopyCodeCard } from '../../../_component/copyCodeCard/copyCodeCard';
import { IdpListOnApp } from '../../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../../_component/introduction/introduction';
import { isIDPKnown } from '../../../_utils/idps';
import { commonBackgroundWithBack } from '../../../_utils/styles';
import { ROUTES } from '../../../_utils/routes';
import { unlockCodeSelector } from '@/app/[locale]/_redux/slices/blockAccessSlice';
import { addSpacesEvery3Chars } from '@/app/[locale]/_utils/common';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

const unlockioaccessRich = {
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
  ul: (chunks: React.ReactNode) => (
    <List
      sx={{
        listStyleType: 'square',
        marginBottom: '42px',
        padding: '8px',
      }}
    >
      {chunks}
    </List>
  ),
  li: (chunks: React.ReactNode) => (
    <ListItem>
      <Typography sx={{ display: 'list-item' }}>{chunks}</Typography>
    </ListItem>
  ),
  u: (chunks: React.ReactNode) => (
    <Link href="#" color="textPrimary">
      {chunks}
    </Link>
  ),
  em: (chunks: React.ReactNode) => <em>{chunks}</em>,
};

const ProfileBlock = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const unlockCode = useSelector(unlockCodeSelector);

  const router = useRouter();
  return (
    <Grid sx={commonBackgroundWithBack}>
      <BackButton />
      <Introduction
        title={t('common.lockedioaccess')}
        summary={
          <>
            {t.rich('lockaccess.lockaccess', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </>
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />
      <CopyCodeCard code={addSpacesEvery3Chars(unlockCode)} />

      {isIDPKnown && <IdpListOnApp />}

      <Typography variant="h6" my={3}>
        {t('common.howrestoreprofile')}
      </Typography>
      <Typography>{t.rich('common.unlockioaccess', unlockioaccessRich)}</Typography>
      <Button
        onClick={() => router.push(`${ROUTES.PROFILE}`, { locale: localeFromStorage })}
        variant="outlined"
        size="medium"
      >
        {t('common.backtoprofile')}
      </Button>
    </Grid>
  );
};

export default ProfileBlock;
