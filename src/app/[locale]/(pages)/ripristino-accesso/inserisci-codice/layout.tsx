import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Sblocca l’app IO con il codice di ripristino.',
  description: 'Inserisci il codice di ripristino per sbloccare l’accesso al’app IO.',
};
export default function InsertCodeLayout({ children }: Props) {
  return children;
}
