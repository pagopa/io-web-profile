'use client';

import { useState } from 'react';

import { Button, Grid, Link, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FAQ } from '../../../_component/accordion/faqDefault';
import { Introduction } from '../../../_component/introduction/introduction';
import { Flows } from '../../../_enums/Flows';
import { commonBackground } from '../../../_utils/styles';
import { ROUTES } from '../../../_utils/routes';

const ReactivateCode = (): React.ReactElement => {
  const { push } = useRouter();
  const [restoreCode, setRestoreCode] = useState('');
  const [isCodeNotValid, setIsCodeNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const reactivationCodePattern: string = '[0-9]{3}[ -]*[0-9]{3}[ -]*[0-9]{3}';
  const t = useTranslations('ioesco');

  const handleRestoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input only numeric characters
    setRestoreCode(e.target.value.replace(/\D/g, ''));
  };

  const explanationrestorecodeRich = {
    link: (chunks: React.ReactNode) => (
      <Link href="#" fontWeight={600}>
        {chunks}
      </Link>
    ),
    br: () => <br />,
  };

  const handleClick = () => {
    // TODO: remove mocked logic
    if (restoreCode === '123456789') {
      setIsCodeNotValid(false);
      setErrorMessage('');
      void push(ROUTES.RESTORE_THANK_YOU);
    } else {
      setIsCodeNotValid(true);
      setErrorMessage(t('restore.notvalidcode'));
    }
  };

  return (
    <>
      <Grid sx={commonBackground} container>
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
          <Link href={ROUTES.PROFILE}>
            <Button variant="outlined" sx={{ width: { xs: '100%', sm: 'auto' } }}>
              {t('common.cancel')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FAQ flow={Flows.RESTORE} />
    </>
  );
};

export default ReactivateCode;
