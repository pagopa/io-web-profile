import { Box, Button, Dialog, Typography } from '@mui/material';
import { IdpList, SpidLevels } from './idpList';

type Dialog = {
  isOpen: boolean;
  spidLevel: SpidLevels;
  onClose: (open: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  currentPage: string;
};

export function SelectIdp({ isOpen, spidLevel, onClose, currentPage }: Dialog) {
  return (
    <>
      <Dialog open={isOpen}>
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
        <IdpList spidLevel={spidLevel} loginPage={currentPage} />
        <Box p={4}>
          <Button onClick={e => onClose(false, e)} fullWidth variant="outlined">
            Annulla
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
