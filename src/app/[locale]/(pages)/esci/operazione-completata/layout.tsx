import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Non hai più sessioni attive su IO',
  description:
    'Hai terminato la sessione su IO. Per entrare nuovamente in app IO, accedi con le tue credenziali SPID o CIE da qualsiasi dispositivo.',
};
export default function LogOutCompletedLayout({ children }: Props) {
  return children;
}
