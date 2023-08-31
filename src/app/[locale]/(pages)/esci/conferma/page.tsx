'use client';

import { useTranslations } from 'next-intl';
import SessionActiveComp from '@/app/[locale]/_component/sessionActiveComp/sessionActiveComp';

const Session = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  return <SessionActiveComp title={t('profilelogout.logout')} showArrowBackBtn={true} />;
};

export default Session;
