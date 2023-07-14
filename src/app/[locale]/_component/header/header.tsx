'use client';
import { HeaderAccount } from '@pagopa/mui-italia';
import React from 'react';

const Header = (): React.ReactElement => (
  <>
    <HeaderAccount
      rootLink={{
        ariaLabel: 'PagoPA',
        href: 'https://www.pagopa.it/',
        label: 'PagoPA S.p.a.',
        title: 'PagoPA S.p.a.',
      }}
      loggedUser={false}
      onAssistanceClick={(): void => {
        // eslint-disable-next-line no-console
        console.log('Clicked/Tapped on Assistance');
      }}
      onLogin={(): void => {
        // eslint-disable-next-line no-console
        console.log('User login');
      }}
      enableLogin={false}
      enableAssistanceButton={true}
    />
  </>
);

export default Header;
