'use client';
import { Backdrop, Box } from '@mui/material';
import { MISpinner } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';

const Loader = (): React.ReactElement => {
  const t = useTranslations('ioesco.common');

  return (
    <>
      <Box sx={{ minHeight: '100vh' }} />
      <Backdrop
        open
        slotProps={{ root: { 'aria-hidden': false } }}
        sx={{
          backgroundColor: 'rgba(23, 50, 77, 0.7)',
          zIndex: theme => theme.zIndex.modal,
        }}
      >
        <MISpinner color="primary" size={32} aria-label={t('loading')} />
      </Backdrop>
    </>
  );
};

export default Loader;
