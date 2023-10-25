import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Sblocca l’accesso a IO senza il codice di ripristino',
  description:
    'Se hai un’identità SPID o CIE con un livello di sicurezza 3, non è necessario inserire il codice di ripristino per sbloccare l’app IO.',
};
export default function RestoreAccessAccessL3Layout({ children }: Props) {
  return children;
}
