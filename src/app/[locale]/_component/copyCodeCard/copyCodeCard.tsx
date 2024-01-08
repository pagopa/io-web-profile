import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Card, CardContent, Grid, Snackbar, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useIsMobile from '../../_hooks/useMobile';

type CopyCardProps = {
  code: string | undefined;
};

export const CopyCodeCard = ({ code }: CopyCardProps) => {
  const { isMobile } = useIsMobile();
  const t = useTranslations('ioesco');
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const copyTextToClipboard = (text: string | undefined) => {
    if (typeof text === 'string') {
      void navigator.clipboard.writeText(text.replaceAll(' ', ''));
      setOpenSnackBar(true);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: '352px',
        alignItems: 'center',
        marginBottom: '60px',
        boxShadow: '0px 8px 38px 7px #002B551A',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Grid>
          <Typography variant="caption">{t('common.resetcode')}</Typography>
          <Typography fontWeight={600} fontSize="32px">
            {code}
          </Typography>
        </Grid>
        <Grid alignSelf="center">
          <ButtonNaked
            startIcon={<ContentCopyIcon />}
            onClick={() => copyTextToClipboard(code)}
            color="primary"
          >
            {t('common.copy')}
          </ButtonNaked>
        </Grid>
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={2000}
      >
        <Alert
          sx={
            isMobile
              ? {
                  width: '100%',
                }
              : null
          }
          severity="success"
        >
          {t('restore.restorecodecopied')}
        </Alert>
      </Snackbar>
    </Card>
  );
};
