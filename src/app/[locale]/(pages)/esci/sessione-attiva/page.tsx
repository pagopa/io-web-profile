'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import NoSessionActiveComp from '@/app/[locale]/_component/noSessionActiveComp/noSessionActiveComp';
import SessionActiveComp from '@/app/[locale]/_component/sessionActiveComp/sessionActiveComp';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import { SessionState } from '@/api/generated/webProfile/SessionState';
import { WebProfileApi } from '@/api/webProfileApiClient';

const Session = (): React.ReactElement => {
  const [sessionData, setSessionData] = useState<SessionState>();
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();

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
          title={t('common.hello', { nome: userFromStorage?.name })}
          showArrowBackBtn={false}
        />
      );
    }

    return <NoSessionActiveComp title={t('common.hello', { nome: userFromStorage?.name })} />;
  };

  return renderSessionActive();
};

export default Session;
