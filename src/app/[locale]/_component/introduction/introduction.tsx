import React from 'react';
import { Typography, Grid } from '@mui/material';

type IntroductionObj = {
  title: string;
  summaryColor?: string;
  titleColor?: string;
  summary: string | JSX.Element | React.ReactNodeArray | React.ReactNode;
  summaryColumns: {
    xs: number;
    sm?: number;
    md: number;
  };
};

export function Introduction({
  title,
  summary,
  summaryColumns,
  titleColor,
  summaryColor,
}: IntroductionObj) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={8} maxWidth="100%" pb={2}>
          <Typography
            fontSize={42}
            fontWeight={700}
            py={0}
            px={0}
            color={titleColor || 'textPrimary'}
            sx={{
              textAlign: 'left',
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={summaryColumns.xs}
          sm={summaryColumns.sm || summaryColumns.xs}
          md={summaryColumns.md}
          maxWidth="100%"
          pb={4}
        >
          <Typography
            fontSize={20}
            fontWeight={400}
            py={0}
            px={0}
            color={summaryColor || 'textPrimary'}
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
