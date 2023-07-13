import React from 'react';
import { Typography, Grid, Button } from '@mui/material';

interface IntroductionProps {
  topIcon?: JSX.Element;
  title: string;
  summary: string | JSX.Element;
  button: ButtonProperty;
}

interface ButtonProperty {
  onClick(): void;
  isVisible: boolean;
  variant: 'text' | 'outlined' | 'contained';
  text: string;
}

export function FeedbackMessage({ topIcon, title, summary, button }: IntroductionProps) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} maxWidth="100%" textAlign={'center'}>
          {topIcon}
        </Grid>
        <Grid item xs={12} maxWidth="100%">
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
        <Grid item xs={12} maxWidth="100%">
          <Typography
            variant="subtitle1"
            py={1}
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
          {button.isVisible ? (
            <Button onClick={() => button.onClick()} variant={button.variant}>
              {button.text || 'Missing Text'}
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
