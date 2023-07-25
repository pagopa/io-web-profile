import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';

interface CopyCardProps {
  code: string;
}

export const CopyCodeCard = ({ code }: CopyCardProps) => {
  const t = useTranslations('ioesco.common');

  const copyTextToClipboard = (text: string | undefined) => {
    if (typeof text === 'string') {
      void navigator.clipboard.writeText(text);
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
          <Typography variant="caption">{t('resetcode')}</Typography>
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
            {t('copy')}
          </ButtonNaked>
        </Grid>
      </CardContent>
    </Card>
  );
};
