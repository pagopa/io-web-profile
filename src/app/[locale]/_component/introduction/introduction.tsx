import React from 'react';
import { Typography, Grid } from '@mui/material';

interface IntroductionObj {
  title: string;
  summary: string | JSX.Element;
  summaryColumns: {
    xs: number;
    md: number;
  };
}

export function Introduction({ title, summary, summaryColumns }: IntroductionObj) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={8} maxWidth="100%" pb={2}>
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
            {title}
          </Typography>
        </Grid>
        <Grid item xs={summaryColumns.xs} md={summaryColumns.md} maxWidth="100%" pb={4}>
          <Typography
            fontSize={20}
            fontWeight={400}
            py={0}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'left',
            }}
          >
            {summary}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
