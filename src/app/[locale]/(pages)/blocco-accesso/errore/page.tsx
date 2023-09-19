'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FeedbackMessage } from '../../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pathName = usePathname();

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={t('error.somewrong')}
          summary={<span>{t('error.systemerrorcontactassistence')}</span>}
          firstButton={{
            href: ROUTES.PROFILE_BLOCK,
            variant: 'contained',
            text: t('error.retry'),
            onClick: () => trackEvent('IO_PROFILE_UNLOCK_ACCESS_TRY_AGAIN'),
          }}
          secondButton={{
            variant: 'outlined',
            href: ROUTES.PROFILE,
            text: t('common.backtoprofile'),
            onClick: () => trackEvent('IO_BACK_TO_PROFILE', { page_name: pathName }),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginKo;
