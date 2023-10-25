import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Sblocca l’accesso a IO',
  description:
    'Se hai bloccato l’accesso all’app IO per ragioni di sicurezza, puoi ripristinare l’accesso seguendo le indicazioni in questa pagina.',
};
export default function RestoreAccessLayout({ children }: Props) {
  return children;
}
