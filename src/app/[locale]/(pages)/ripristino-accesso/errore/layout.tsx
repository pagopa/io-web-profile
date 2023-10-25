import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'C’è un problema temporaneo',
  description:
    'C’è un problema sui nostri sistemi, non è possibile sbloccare l’app IO in questo momento. Riprova tra poco.',
};
export default function RestoreAccessErrorLayout({ children }: Props) {
  return children;
}
