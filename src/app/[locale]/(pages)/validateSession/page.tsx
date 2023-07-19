'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '../../_utils/routes';
import useToken from '../../_hooks/useToken';
import Loader from '../../_component/loader/loader';

const Check = (): React.ReactElement => {
  const { tokenError } = useToken();

  useEffect(() => {
    if (tokenError === 'error') {
      redirect(ROUTES.LOGOUT_AUTH_KO);
    }
    if (tokenError === 'ok') {
      redirect(ROUTES.SESSION);
    }
  }, [tokenError]);

  return (
    <>
      <Loader />
    </>
  );
};

export default Check;
