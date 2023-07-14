import { Box, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IdpList } from './idpList';

interface IDialog {
  open: boolean;
  onClose: (open: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SelectIdp({ open, onClose }: IDialog) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (open === true) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [open]);

  return (
    <>
      <Dialog open={openDialog}>
        <Typography
          fontSize={24}
          fontWeight={600}
          py={4}
          px={2}
          color="textPrimary"
          sx={{
            textAlign: 'center',
          }}
        >
          {'Scegli il tuo Identity Provider'}
        </Typography>
        <IdpList />
        <Box p={4}>
          <Button onClick={(e) => onClose(false, e)} fullWidth variant="outlined">
            Annulla
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
