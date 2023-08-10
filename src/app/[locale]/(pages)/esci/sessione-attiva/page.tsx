'use client';

import { useTranslations } from 'next-intl';
import SessionExistingComp from '@/app/[locale]/_component/sessionExistingComp/sessionExistingComp';
import { storageUserOps } from '@/app/[locale]/_utils/storage';

const Session = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();

  return (
    <SessionExistingComp
      title={t('common.hello', { nome: userFromStorage?.name })}
      showArrowBackBtn={false}
    />
  );
};

export default Session;
