'use client';

import { Grid, Button, Box, Typography, Card } from '@mui/material';
import Link from 'next/link';
import { IllusSms } from '@pagopa/mui-italia';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundLight } from '../../_utils/styles';
import { FAQDefault } from '../../_component/accordion/faqDefault';
import { ROUTES } from '../../_utils/routes';

const Session = (): React.ReactElement => (
  <>
    <Grid sx={commonBackgroundLight} container>
      <Grid item xs={12} justifySelf={'center'}>
        <Introduction
          title={'Ciao Mario!'}
          summary={
            <>
              <span>
                Al momento hai attiva una sessione su app IO con il dispositivo{' '}
                <strong>iPhone 12 Pro</strong>, se lo hai perso o non lo riconosci esci dal tuo
                account. Potrai accedere nuovamente da qualsiasi dispositivo.
              </span>
            </>
          }
          summaryColumns={{ xs: 12, md: 6 }}
        />
      </Grid>

      <Grid item xs={12} justifySelf={'center'}>
        <Card
          sx={{
            display: 'flex',
            p: 2,
          }}
        >
          <Box>
            <IllusSms size={72} />
          </Box>
          <Box sx={{ ml: 2 }} alignSelf={'center'}>
            <Box>
              <Typography
                fontSize={18}
                fontWeight={700}
                py={0}
                px={0}
                color="textPrimary"
                sx={{
                  textAlign: 'left',
                }}
              >
                <strong>Iphone 12 Pro</strong>
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={14}
                fontWeight={400}
                py={0}
                px={0}
                color="textPrimary"
                sx={{
                  textAlign: 'left',
                }}
              >
                Sessione attiva fino al 08/06/2023
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} mt={4}>
        <Link href={ROUTES.THANK_YOU}>
          <Button sx={{ mr: 2 }} variant="contained">
            Esci da IO
          </Button>
        </Link>
      </Grid>
    </Grid>
    <FAQDefault />
  </>
);

export default Session;
