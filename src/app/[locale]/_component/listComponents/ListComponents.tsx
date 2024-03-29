import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { theme } from '@pagopa/mui-italia';

type ListItemComponentProps = {
  chunks: React.ReactNode;
};
export const ListItemComponent = ({ chunks }: ListItemComponentProps) => (
  <ListItem>
    <Typography sx={{ display: 'list-item', fontSize: theme.typography.body2.fontSize }}>
      {chunks}
    </Typography>
  </ListItem>
);

type MarginBottom = 'unset' | '8px' | '16px' | '24px' | '32px' | '40px';

type ListComponentProps = {
  chunks: React.ReactNode;
  marginBottom: MarginBottom;
};
export const ListComponent = ({ marginBottom, chunks }: ListComponentProps) => (
  <List
    sx={{
      listStyleType: 'square',
      marginBottom,
      padding: '8px',
    }}
  >
    {chunks}
  </List>
);
