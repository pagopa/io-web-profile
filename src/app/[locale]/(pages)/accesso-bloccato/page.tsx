'use client';

import { Grid, Link } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';
import Firework from '@/app/[locale]/_icons/firework';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { ROUTES } from '@/app/[locale]/_utils/routes';

const AlreadyLocked = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();

  const explanationrestorecodeRich = {
    link: (chunks: React.ReactNode) => (
      <Link href={'https://io.italia.it/faq#n1_6'} fontWeight={600} target="_blank">
        {chunks}
      </Link>
    ),
    br: () => <br />,
  };

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<Firework />}
          title={t('magiclink.errorlockedaccess')}
          summary={t.rich('magiclink.errorlockedaccessl3', explanationrestorecodeRich)}
          firstButton={{
            onClick: () => pushWithLocale(ROUTES.PROFILE),
            variant: 'contained',
            text: t('common.backtoprofile'),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AlreadyLocked;
