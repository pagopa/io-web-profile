import React, { useCallback } from 'react';
import MUIAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

export interface AccordionItemProps {
  header: string;
  content: string | JSX.Element;
  onChange?: (isOpen: boolean) => void
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  header,
  content,
  onChange
}) => {
  const controlsId = React.useId() + '-controls';
  const headerId = React.useId() + '-header';

  const _onChange = useCallback((_: React.SyntheticEvent<Element, Event>, isOpen: boolean) => {
    onChange?.(isOpen)
  },[onChange])

  return (
    <MUIAccordion
      disableGutters
      onChange={_onChange}
      // Removes MUI accordion's top border
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={controlsId}
        id={headerId}
      >
        <Typography sx={{ my: 1.2 }} fontWeight={600}>
          {header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {typeof content === 'string' ? (
          <Typography variant="body2">{content}</Typography>
        ) : (
          content
        )}
      </AccordionDetails>
    </MUIAccordion>
  );
};