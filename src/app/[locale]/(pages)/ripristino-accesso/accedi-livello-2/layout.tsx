import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Sblocca l’accesso a IO',
  description:
    'Accedi con le tue credenziali SPID o CIE e segui i passaggi indicati per sbloccare l’app IO',
};
export default function RestoreAccessAccessL2Layout({ children }: Props) {
  return children;
}
