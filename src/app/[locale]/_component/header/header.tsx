'use client';
import { HeaderAccount, HeaderProduct, LogoIOApp } from '@pagopa/mui-italia';
import React, { useMemo } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { Link } from '@mui/material';
import useLogin from '../../_hooks/useLogin';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { assistenceEmail, isBrowser } from '../../_utils/common';
import { trackEvent } from '../../_utils/mixpanel';
import { useConsent } from '../../_hooks/useConsent';

const Header = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const { userLogged, isLoggedIn, logOut } = useLogin();
  const pushWithLocale = useLocalePush();
  const JWT_SPID_LEVEL_L1 = process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;
  const pathName = usePathname();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userMenuActionsBasic = [
    {
      id: '2',
      label: t('common.logoutprofile'),
      onClick: () => {
        trackEvent('IO_LOGOUT', {
          event_category: 'UX',
          event_type: 'action',
        });
        logOut();
      },
      icon: <ExitToAppIcon fontSize="small" color="inherit" />,
    },
  ];

  const userMenuActions = useMemo(
    () =>
      isLoggedIn && userLogged?.spidLevel !== JWT_SPID_LEVEL_L1
        ? [
            ...userMenuActionsBasic,
            {
              id: '1',
              label: t('common.profile'),
              onClick: () => {
                trackEvent('IO_BACK_TO_PROFILE', {
                  page_name: pathName,
                  event_category: 'UX',
                  event_type: 'exit',
                });
                pushWithLocale(ROUTES.PROFILE);
              },
              icon: <ManageAccountsIcon fontSize="small" color="inherit" />,
            },
          ]
        : userMenuActionsBasic,
    [
      JWT_SPID_LEVEL_L1,
      isLoggedIn,
      pathName,
      pushWithLocale,
      t,
      userLogged?.spidLevel,
      userMenuActionsBasic,
    ]
  );

  const sortedUserMenuActions = useMemo(
    () => userMenuActions.slice().sort((a, b) => Number(a.id) - Number(b.id)),
    [userMenuActions]
  );

  // useMemo(() => {
  //   if (isBrowser()) {
  //     return initAnalytics();
  //   }
  // }, [isBrowser()]);

  useConsent();

  return (
    <>
      <HeaderAccount
        rootLink={{
          ariaLabel: 'PagoPA',
          href: 'https://www.pagopa.it/',
          label: 'PagoPA S.p.a.',
          title: 'PagoPA S.p.a.',
        }}
        enableDropdown
        loggedUser={
          userLogged
            ? {
                id: userLogged.uid,
                name: userLogged.name,
                surname: userLogged.surname,
                email: userLogged.email,
              }
            : false
        }
        onAssistanceClick={(): void => {
          if (isBrowser()) {
            window.location.assign(`mailto:${assistenceEmail}`);
          }
        }}
        onLogin={(): void => {
          // eslint-disable-next-line no-console
          console.log('User login');
        }}
        enableLogin={isLoggedIn}
        enableAssistanceButton={isLoggedIn}
        // eslint-disable-next-line functional/immutable-data
        userActions={sortedUserMenuActions}
      />
      <HeaderProduct
        productsList={[
          {
            id: '1',
            title: ``,
            productUrl: 'https://io.italia.it/',
            linkType: 'internal',
            icon: (
              <Link href={'https://io.italia.it/'} target="_blank">
                <LogoIOApp size={32} title="io" color="default" />
              </Link>
            ),
          },
        ]}
      />
    </>
  );
};

export default Header;
