'use client';
import { Button, Grid, Typography, Link } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CopyCodeCard } from '../../../_component/copyCodeCard/copyCodeCard';
import { IdpListOnApp } from '../../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../../_component/introduction/introduction';
import { isIdpKnown } from '../../../_utils/idps';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundLight } from '../../../_utils/styles';
import { addSpacesEvery3Chars } from '@/app/[locale]/_utils/common';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { unlockCodeSelector } from '@/app/[locale]/_redux/slices/blockAccessSlice';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';
import {
  ListComponent,
  ListItemComponent,
} from '@/app/[locale]/_component/listComponents/ListComponents';

const unlockioaccessRich = {
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
  ul: (chunks: React.ReactNode) => <ListComponent chunks={chunks} marginBottom="40px" />,
  li: (chunks: React.ReactNode) => <ListItemComponent chunks={chunks} />,
  u: (chunks: React.ReactNode) => (
    <Link target="_blank" fontWeight={600} href="https://ioapp.it/" color="textPrimary">
      {chunks}
    </Link>
  ),
  em: (chunks: React.ReactNode) => <em>{chunks}</em>,
};

const ProfileBlock = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const unlockCode = useSelector(unlockCodeSelector);
  const pushWithLocale = useLocalePush();
  const pathName = usePathname();

  useEffect(() => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_UX_SUCCESS', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, []);

  const handleGoProfileBtn = () => {
    trackEvent('IO_BACK_TO_PROFILE', {
      page_name: pathName,
      event_category: 'UX',
      event_type: 'exit',
    });
    pushWithLocale(ROUTES.PROFILE);
  };

  useEffect(() => {
    trackEvent('IO_PROFILE_LOCK_ACCESS_UX_SUCCESS', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, []);

  return (
    <Grid sx={commonBackgroundLight}>
      <Introduction
        title={t('common.lockedioaccess')}
        summary={
          <>
            {t.rich('thankyoupage.accesslocked', {
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => (
                <Link href={'https://io.italia.it/faq#n1_6'} target="_blank" fontWeight={600}>
                  {chunks}
                </Link>
              ),
              br: () => (
                <>
                  <br />
                  <br />
                </>
              ),
            })}
          </>
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />
      <CopyCodeCard code={addSpacesEvery3Chars(unlockCode)} />

      {isIdpKnown() && <IdpListOnApp />}

      <Typography variant="h6" my={3}>
        {t('common.howrestoreprofile')}
      </Typography>
      <Typography variant="subtitle2" fontSize={18}>
        {t.rich('common.unlockioaccess', unlockioaccessRich)}
      </Typography>
      <Button onClick={() => handleGoProfileBtn()} variant="outlined" size="medium">
        {t('common.backtoprofile')}
      </Button>
    </Grid>
  );
};

export default ProfileBlock;
