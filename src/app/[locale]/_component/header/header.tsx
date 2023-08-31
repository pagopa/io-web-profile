'use client';
import { HeaderAccount, HeaderProduct, LogoIOApp } from '@pagopa/mui-italia';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useLogin from '../../_hooks/useLogin';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';

const Header = (): React.ReactElement => {
  const { userLogged, isLoggedIn, logOut } = useLogin();
  const pushWithLocale = useLocalePush();
  const JWT_SPID_LEVEL_L1 = process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;

  const userMenuActionsBasic = [
    {
      id: 'logout',
      label: 'Esci dal portale',
      onClick: () => {
        logOut();
      },
      icon: <ExitToAppIcon fontSize="small" color="inherit" />,
    },
  ];

  const userMenuActions =
    isLoggedIn && userLogged?.spidLevel !== JWT_SPID_LEVEL_L1
      ? [
          {
            id: 'profile',
            label: 'Vai al profilo',
            onClick: () => {
              pushWithLocale(ROUTES.PROFILE);
            },
            icon: <ManageAccountsIcon fontSize="small" color="inherit" />,
          },
          ...userMenuActionsBasic,
        ]
      : userMenuActionsBasic;

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
          // eslint-disable-next-line no-console
          console.log('Clicked/Tapped on Assistance');
        }}
        onLogin={(): void => {
          // eslint-disable-next-line no-console
          console.log('User login');
        }}
        enableLogin={isLoggedIn}
        enableAssistanceButton={true}
        userActions={userMenuActions}
      />
      <HeaderProduct
        productsList={[
          {
            id: '1',
            title: ``,
            productUrl: '#io-web',
            linkType: 'internal',
            icon: <LogoIOApp size={32} title="io" color="default" />,
          },
        ]}
      />
    </>
  );
};

export default Header;
