import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Non è stato possibile uscire da IO',
  description:
    'C’è un problema sui nostri sistemi, non è possibile uscire da IO in questo momento. Riprova ad uscire tra poco.',
};
export default function LogOutErrorLayout({ children }: Props) {
  return children;
}
