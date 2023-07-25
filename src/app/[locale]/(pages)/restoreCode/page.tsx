'use client';

import { useState } from 'react';

import { Button, Grid, Link, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FAQ } from '../../_component/accordion/faqDefault';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';

const ReactivateCode = (): React.ReactElement => {
  const { push } = useRouter();
  const [restoreCode, setRestoreCode] = useState('');
  const [isCodeNotValid, setIsCodeNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const reactivationCodePattern: string = '[0-9]{3}[ -]*[0-9]{3}[ -]*[0-9]{3}';
  // const t = useTranslations('logout');

  const handleRestoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input only numeric characters
    setRestoreCode(e.target.value.replace(/\D/g, ''));
  };

  const handleClick = () => {
    // TODO: remove mocked logic
    if (restoreCode === '123456789') {
      setIsCodeNotValid(false);
      setErrorMessage('');
      void push('/restoreThankYou');
    } else {
      setIsCodeNotValid(true);
      setErrorMessage('Codice non valido, controlla e riprova');
    }
  };

  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'} sx={{ pb: { xs: 0, md: '10px' } }}>
          <Introduction
            title="Inserisci il codice di ripristino"
            summary={
              <>
                Ha 9 cifre, ti è stato fornito in fase di blocco dell&apos;accesso a IO.
                <br />
                Non lo trovi?{' '}
                <Link href="#" fontWeight={600}>
                  Scopri cosa fare
                </Link>
              </>
            }
            summaryColumns={{ xs: 12, md: 8 }}
          />
        </Grid>
        <Grid item xs={12} sx={{ pb: { sm: 4, md: '60px' } }}>
          <TextField
            id="reactivationCode"
            label="Codice di ripristino"
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
            Ripristina profilo IO
          </Button>
          <Link href="/profile">
            <Button variant="outlined" sx={{ width: { xs: '100%', sm: 'auto' } }}>
              Annulla
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FAQ flow="RESTORE" />
    </>
  );
};

export default ReactivateCode;
