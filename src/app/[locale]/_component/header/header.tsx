'use client';
import { HeaderAccount } from '@pagopa/mui-italia';
import React from 'react';
import { IconButton } from '@mui/material';
import useLogin from '../../_hooks/useLogin';

const Header = (): React.ReactElement => {
  const { userLogged, isLoggedIn } = useLogin();

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
        userActions={[
          {
            id: 'logout',
            label: 'Esci',
            onClick: () => {
              // eslint-disable-next-line no-console
              console.log('User logged out');
            },
            icon: <IconButton />,
          },
        ]}
      />
    </>
  );
};

export default Header;
