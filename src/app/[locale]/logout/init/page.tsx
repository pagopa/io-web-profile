'use client';

import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Index = (): React.ReactElement => {
  const t = useTranslations('logout');
  return (
    <>
      <Grid sx={{ backgroundColor: '#FAFAFA', pt: 5 }} container item>
        <Grid item xs={1} />
        <Grid item xs={10} maxWidth="100%">
          <Typography
            variant="h3"
            py={1}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'left',
            }}
          >
            {t('title')}
          </Typography>
          <Grid item xs={1} />
        </Grid>
      </Grid>
      <Grid sx={{ backgroundColor: '#FAFAFA' }} container item columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={1} />
        <Grid item xs={4} maxWidth="100%">
          <Typography
            variant="subtitle1"
            py={1}
            px={0}
            color="textPrimary"
            sx={{
              textAlign: 'left',
            }}
          >
            {t('description')}
          </Typography>
        </Grid>
        <Grid item xs={7} />
      </Grid>
      <Grid sx={{ backgroundColor: '#FFFFFF', pt: 5 }} container item>
        <Grid item xs={1} />
        <Grid item xs={10} maxWidth="100%">
          <Typography
            variant="h4"
            py={1}
            px={0}
            color="#0062C3"
            sx={{
              textAlign: 'left',
            }}
          >
            {'Dubbi o domande?'}
          </Typography>
          <Accordion expanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#0062C3">Cosa vuol dire uscire da app IO?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#0062C3">Come posso rientrare in app IO?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#0062C3">
                Sospetto che qualcuno possa accedere al mio account IO, cosa posso fare?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#0062C3">A cosa serve effettuare il logout da web?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
