import React from 'react';
import {
  Accordion as MUIAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type AccordionEntry = {
  summary: string | JSX.Element;
  details: string | JSX.Element;
};

type StyledAccordionProps = {
  entries: AccordionEntry[];
  summaryColor: string;
  detailColor: string;
};

export function AccordionCustom(props: StyledAccordionProps) {
  return (
    <>
      {props.entries.map(({ summary, details }, i: number) => (
        <MUIAccordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content-${i}`}
            id={`panel-header-${i}`}
            sx={{ px: 0 }}
          >
            <Typography fontWeight={600} fontSize={22} color={props.summaryColor}>
              {summary}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ m: 0, p: 0 }} color={props.detailColor}>
            <Typography fontWeight={400} fontSize={18} color={props.detailColor}>
              {details}
            </Typography>
          </AccordionDetails>
        </MUIAccordion>
      ))}
    </>
  );
}
