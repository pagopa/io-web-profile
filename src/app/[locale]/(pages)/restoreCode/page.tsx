'use client';

import { useState } from 'react';

import { Button, Grid, Link, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FAQDefault } from '../../_component/accordion/faqDefault';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';

const ReactivateCode = (): React.ReactElement => {
  const { push } = useRouter();
  const [restoreCode, setRestoreCode] = useState('');
  const [notValidCode, setNotValidCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const reactivationCodePattern: string = '[0-9]{3}[ -]*[0-9]{3}[ -]*[0-9]{3}';
  // const t = useTranslations('logout');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input only numeric characters
    setRestoreCode(e.target.value.replace(/\D/g, ''));
  };

  const handleClick = () => {
    // TODO: remove mocked logic
    if (restoreCode === '123456789') {
      setNotValidCode(false);
      setErrorMessage('');
      void push('/restoreThankYou');
    } else {
      setNotValidCode(true);
      setErrorMessage('Codice non valido, controlla e riprova');
    }
  };

  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'} pb={'10px'}>
          <Introduction
            title="Inserisci il codice di ripristino"
            summary={
              <>
                Ha 9 cifre, ti è stato fornito in fase di blocco dell'accesso a IO.
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
        <Grid item xs={12} pb={'60px'}>
          <TextField
            id="reactivationCode"
            label="Codice di ripristino"
            value={restoreCode}
            fullWidth={true}
            inputProps={{ maxLength: 9, pattern: '[0-9]*' }}
            onChange={handleChange}
            sx={{ maxWidth: '317px' }}
            error={notValidCode}
            helperText={errorMessage}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mr: 3 }}
            variant="contained"
            disabled={restoreCode.length !== 9}
            onClick={handleClick}
          >
            Ripristina profilo IO
          </Button>
          <Link href="/profileRestore">
            <Button variant="outlined">Annulla</Button>
          </Link>
        </Grid>
      </Grid>
      {/* TODO: change texts for reactivation flow */}
      <FAQDefault />
    </>
  );
};

export default ReactivateCode;
