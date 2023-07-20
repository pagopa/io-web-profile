'use client';

import { Grid, Button, Box, Typography, Card } from '@mui/material';
import Link from 'next/link';
import { IllusSms } from '@pagopa/mui-italia';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';
import { FAQ } from '../../_component/accordion/faqDefault';

const Session = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
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
          summaryColumns={{ xs: 12, md: 10 }}
        />
      </Grid>

      <Grid item xs={4} justifySelf={'center'}>
        <Card
          sx={{
            boxShadow: '0px 0px 0px 1px #E0E0E0',
            width: '400px',
            display: 'flex',
            padding: '30px',
          }}
        >
          <Box>
            <IllusSms size={48} />
          </Box>
          <Box sx={{ ml: 1 }}>
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
        <Link href={'/thankyou'}>
          <Button sx={{ mr: 2 }} variant="contained">
            Esci da IO
          </Button>
        </Link>
      </Grid>
    </Grid>
    <FAQ />
  </>
);

export default Session;
