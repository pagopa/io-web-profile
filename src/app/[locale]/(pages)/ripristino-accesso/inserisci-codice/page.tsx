'use client';
import { Button, Grid, Link, TextField } from '@mui/material';
import { IPatternStringTag } from '@pagopa/ts-commons/lib/strings';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FAQ } from '../../../_component/accordion/faqDefault';
import { Introduction } from '../../../_component/introduction/introduction';
import { Flows } from '../../../_enums/Flows';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundLight } from '../../../_utils/styles';
import { TransientErrorType } from '../../../_utils/api-utils';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import { isBrowser, localeFromStorage } from '@/app/[locale]/_utils/common';
import Loader from '@/app/[locale]/_component/loader/loader';

const ReactivateCode = (): React.ReactElement => {
  const [restoreCode, setRestoreCode] = useState('');
  const [isCodeNotValid, setIsCodeNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const pushWithLocale = useLocalePush();
  const baseUrl = isBrowser() && window.location.origin;
  const userFromStorage = storageUserOps.read();
  const isL3 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3;
  const { callFetchWithRetries, isLoading } = useFetch();

  const t = useTranslations('ioesco');

  const MAXRETRY_ERROR: TransientErrorType = 'max-retries';

  useEffect(() => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_INSERT_CODE', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, []);

  const handleRestoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input only numeric characters
    setRestoreCode(e.target.value.replace(/\D/g, ''));
    setIsCodeNotValid(false);
  };

  const explanationrestorecodeRich = {
    link: (chunks: React.ReactNode) => (
      <Link href={`${baseUrl}/${localeFromStorage}${ROUTES.LOGIN_L3}`} fontWeight={600}>
        {chunks}
      </Link>
    ),
    br: () => <br />,
  };

  const handleClick = () => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_UX_CONVERSION', {
      event_category: 'UX',
      event_type: 'action',
    });
    callFetchWithRetries(
      WebProfileApi,
      'unlockUserSession',
      {
        unlock_code: restoreCode as string & IPatternStringTag<'^\\d{9}$'>,
      },
      [500]
    )
      .then(() => {
        setIsCodeNotValid(false);
        setErrorMessage('');
        pushWithLocale(ROUTES.RESTORE_THANK_YOU);
      })
      .catch(err => {
        if (err === MAXRETRY_ERROR) {
          pushWithLocale(ROUTES.PROFILE_RESTORE_KO);
        } else {
          trackEvent('IO_PROFILE_UNLOCK_ACCESS_ERROR_CODE', {
            event_category: 'UX',
            event_type: 'error',
          });
          setIsCodeNotValid(true);
          setErrorMessage(t('restore.notvalidcode'));
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLight} container>
        <Grid item xs={12} justifySelf={'center'} sx={{ pb: { xs: 0, md: '10px' } }}>
          <Introduction
            title={t('restore.insertrestorecode')}
            summary={t.rich('restore.explanationrestorecode', explanationrestorecodeRich)}
            summaryColumns={{ xs: 12, md: 8 }}
          />
        </Grid>
        <Grid item xs={12} sx={{ pb: { sm: 4, md: '60px' } }}>
          <TextField
            id="reactivationCode"
            label={t('common.resetcode')}
            value={restoreCode}
            fullWidth={true}
            inputProps={{ maxLength: 9, pattern: '[0-9]*' }}
            onChange={handleRestoreCodeChange}
            sx={{ maxWidth: '317px', pb: { xs: 6, sm: 0 } }}
            error={isCodeNotValid}
            helperText={errorMessage}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Button
            sx={{
              mr: { sm: 3 },
              mb: { xs: '20px', sm: 0 },
              width: { xs: '100%', sm: 'auto' },
            }}
            variant="contained"
            disabled={restoreCode.length !== 9}
            onClick={handleClick}
          >
            {t('restore.restoreprofile')}
          </Button>
          <Button
            onClick={() => pushWithLocale(ROUTES.PROFILE)}
            variant="outlined"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {t('common.cancel')}
          </Button>
        </Grid>
      </Grid>
      <FAQ flow={isL3 ? Flows.RESTOREL3 : Flows.RESTORE} />
    </>
  );
};

export default ReactivateCode;
