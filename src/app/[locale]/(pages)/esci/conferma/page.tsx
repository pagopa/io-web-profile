'use client';

import { useTranslations } from 'next-intl';
import SessionExistingComp from '@/app/[locale]/_component/sessionExistingComp/sessionExistingComp';

const Session = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  return <SessionExistingComp title={t('profilelogout.logout')} showArrowBackBtn={true} />;
};

export default Session;
