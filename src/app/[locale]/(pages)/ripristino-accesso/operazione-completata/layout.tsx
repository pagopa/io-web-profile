import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Hai sbloccato l’accesso a IO',
  description:
    'L’accesso all’app IO è sbloccato. Puoi entrare di nuovo in app con tutte le tue identità SPID o CIE.',
};
export default function RestoreAccessCompletedLayout({ children }: Props) {
  return children;
}
