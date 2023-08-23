import { Box, Button, Grid, Typography } from '@mui/material';
import useLocalePush from '../../_hooks/useLocalePush';

type CustomMaterialButtonProps = {
  href?: string;
  text: string;
  variant: 'outlined' | 'contained' | 'text' | 'naked';
};

type IntroductionProps = {
  topIcon?: JSX.Element;
  title: string;
  summary: string | JSX.Element;
  firstButton: CustomMaterialButtonProps;
  secondButton: CustomMaterialButtonProps;
};

export function FeedbackMessage({
  topIcon,
  title,
  summary,
  firstButton,
  secondButton,
}: IntroductionProps) {
  const pushWithLocale = useLocalePush();
  return (
    <Box sx={{ maxWidth: 448, margin: '0 auto' }}>
      <Grid container>
        <Grid item xs={12} textAlign={'center'} pb={2}>
          {topIcon}
        </Grid>
        <Grid item xs={12} pb={2}>
          <Typography
            fontSize={32}
            fontWeight={700}
            py={0}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} pb={4}>
          <Typography
            variant="subtitle1"
            fontSize={18}
            fontWeight={400}
            py={0}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'center',
            }}
          >
            {summary}
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Grid display={'flex'} justifyContent="center">
            <Button
              onClick={() => pushWithLocale(firstButton.href || '/')}
              variant={firstButton.variant}
              sx={{
                marginRight: 2,
              }}
            >
              {firstButton.text}
            </Button>

            <Button
              onClick={() => pushWithLocale(secondButton.href || '')}
              variant={secondButton.variant}
            >
              {secondButton.text}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
