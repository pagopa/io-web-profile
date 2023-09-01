'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import SessionActiveComp from '@/app/[locale]/_component/sessionActiveComp/sessionActiveComp';
import { WebProfileApi } from '@/api/webProfileApiClient';
import NoSessionActiveComp from '@/app/[locale]/_component/noSessionActiveComp/noSessionActiveComp';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import { SessionState } from '@/api/generated/webProfile/SessionState';

const LogoutConfirm = (): React.ReactElement => {
  const [sessionData, setSessionData] = useState<SessionState>();
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();
  const isL1 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;

  useEffect(() => {
    WebProfileApi.getUserSessionState()
      .then((res) => {
        setSessionData(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const renderSessionActive = (): React.ReactElement => {
    if (sessionData?.session_info.active) {
      return (
        <SessionActiveComp
          title={
            isL1 ? t('common.hello', { nome: userFromStorage?.name }) : t('profilelogout.logout')
          }
          showArrowBackBtn={isL1 ? false : true}
        />
      );
    }

    return <NoSessionActiveComp title={t('common.hello', { nome: userFromStorage?.name })} />;
  };

  return renderSessionActive();
};

export default LogoutConfirm;
