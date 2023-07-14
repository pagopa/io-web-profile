'use client';
import { HeaderAccount } from '@pagopa/mui-italia';
import React from 'react';

const Header = (): React.ReactElement => (
  <>
    <HeaderAccount
      rootLink={{
        ariaLabel: 'io WEB',
        href: '#',
        label: 'io WEB beta',
        title: 'io WEB beta',
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
      enableAssistanceButton={false}
    />
  </>
);

export default Header;
