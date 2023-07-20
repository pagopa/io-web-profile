import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';

interface CopyCardProps {
  code: string;
}

export const CopyCodeCard = ({ code }: CopyCardProps) => {
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
          <Typography variant="caption">Codice di ripristino</Typography>
          <Typography fontWeight={600}>{code}</Typography>
        </Grid>
        <Grid alignSelf="center">
          <ButtonNaked
            startIcon={<ContentCopyIcon />}
            onClick={() => copyTextToClipboard(code)}
            color="primary"
          >
            Copia
          </ButtonNaked>
        </Grid>
      </CardContent>
    </Card>
  );
};
