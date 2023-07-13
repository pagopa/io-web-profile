import React from 'react';
import { Typography, Grid } from '@mui/material';

interface IntroductionProps {
  title: string;
  summary: string | JSX.Element;
}

export function Introduction(props: IntroductionProps) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} maxWidth="100%">
          <Typography
            fontSize={32}
            fontWeight={700}
            py={0}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'left',
            }}
          >
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={6} maxWidth="100%">
          <Typography
            variant="subtitle1"
            py={1}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'left',
            }}
          >
            {props.summary}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
