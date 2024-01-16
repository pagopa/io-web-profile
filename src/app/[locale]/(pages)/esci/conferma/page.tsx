'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import SessionActiveComp from '@/app/[locale]/_component/sessionActiveComp/sessionActiveComp';
import { WebProfileApi, callFetchWithRetries } from '@/api/webProfileApiClient';
import NoSessionActiveComp from '@/app/[locale]/_component/noSessionActiveComp/noSessionActiveComp';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import { SessionState } from '@/api/generated/webProfile/SessionState';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';
import { getSessionStatus } from '@/app/[locale]/_utils/common';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { ROUTES } from '@/app/[locale]/_utils/routes';

const LogoutConfirm = (): React.ReactElement => {
  const [sessionData, setSessionData] = useState<SessionState>();
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();
  const isL1 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;
  const pushWithLocale = useLocalePush();
  useEffect(() => {
    if (sessionData) {
      trackEvent(isL1 ? 'IO_SESSION_EXIT_STATUS_PAGE' : 'IO_PROFILE_SESSION_EXIT_STATUS_PAGE', {
        event_category: 'UX',
        event_type: 'screen_view',
        session_status: getSessionStatus(sessionData),
      });
    }
  }, [isL1, sessionData]);

  useEffect(() => {
    callFetchWithRetries(WebProfileApi, 'getUserSessionState', [], [500])
      .then((res) => {
        setSessionData(res);
      })
      .catch(() => pushWithLocale(ROUTES.INTERNAL_ERROR));
  }, []);

  const renderSessionActive = (): React.ReactElement => {
    if (sessionData?.session_info.active) {
      return (
        <SessionActiveComp
          title={
            isL1 ? t('common.hello', { nome: userFromStorage?.name }) : t('profilelogout.logout')
          }
          showArrowBackBtn={isL1 ? false : true}
          expirationDate={sessionData.session_info?.expiration_date}
        />
      );
    }

    return <NoSessionActiveComp title={t('common.hello', { nome: userFromStorage?.name })} />;
  };

  return renderSessionActive();
};

export default LogoutConfirm;
