'use client';
import { Backdrop } from '@mui/material';
import { MISpinner } from '@pagopa/mui-italia';

const Loader = () => (
  <Backdrop
    open
    sx={{
      backgroundColor: 'rgba(23, 50, 77, 0.7)',
      zIndex: 1,
    }}
  >
    <MISpinner color="primary" size={32} role="status" />
  </Backdrop>
);

export default Loader;
