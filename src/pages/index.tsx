import React from 'react';
import { HeaderAccount } from '@pagopa/mui-italia/dist/components/HeaderAccount/HeaderAccount';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderAccount
        rootLink={{
          ariaLabel: 'string',
          href: 'string',
          label: 'string',
          title: 'string',
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
      />
    </>
  );
};

export async function getStaticProps(context: { readonly locale: any }) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Home;
