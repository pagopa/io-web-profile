import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Il link per bloccare l’accesso a IO è scaduto',
  description:
    'Il link per bloccare l’accesso a IO non è più valido. Per bloccare l’accesso a IO, accedi con le tue credenziali SPID o CIE.',
};
export default function MagicLinkExpiredLayout({ children }: Props) {
  return children;
}
