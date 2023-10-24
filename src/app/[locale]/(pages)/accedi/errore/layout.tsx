import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Errore di accesso',
  description: 'Si è verificato un problema con il tuo Identity Provider durante l’accesso a IO',
};
export default function AccessErrorLayout({ children }: Props) {
  return children;
}
