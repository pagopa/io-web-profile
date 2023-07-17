import React from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import Link from 'next/link';

interface IntroductionProps {
  topIcon?: JSX.Element;
  title: string;
  summary: string | JSX.Element;
  button: {
    href: string;
    isVisible: boolean;
    variant: 'text' | 'outlined' | 'contained';
    text: string;
  };
}

export function FeedbackMessage({ topIcon, title, summary, button }: IntroductionProps) {
  return (
    <>
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
          <Grid item xs={12} pb={2}>
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
            {button.isVisible && (
              <Link href={button.href}>
                <Button variant={button.variant}>{button.text || 'Missing Text'}</Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
