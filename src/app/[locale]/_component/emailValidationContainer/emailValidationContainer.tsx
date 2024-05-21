import { Box, Button, Grid, Typography } from '@mui/material';

type ButtonProps = {
  text: string;
  variant: 'outlined' | 'contained' | 'text' | 'naked';
  onClick: () => void;
};

type IntroductionProps = {
  icon?: JSX.Element;
  title: string;
  subtitle?: string;
  summary: string | JSX.Element | React.ReactNode;
  button: ButtonProps;
};

export function EmailValidationContainer({
  icon,
  title,
  subtitle,
  summary,
  button,
}: IntroductionProps) {

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Grid container>
        <Grid item xs={12} textAlign={'center'} pb={2}>
          {icon}
        </Grid>
        <Grid item xs={12} pb={2}>
          <Typography
            fontSize={28}
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
        {subtitle && (
          <Grid item xs={12} pb={2}>
            <Typography
              fontSize={16}
              fontWeight={600}
              py={0}
              px={0}
              color="textSecondary"
              sx={{
                textAlign: 'center',
              }}
            >
              {subtitle}
            </Typography>
          </Grid>
        )}
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
            <Button onClick={() => button.onClick()} variant={button.variant}>
              {button.text}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
