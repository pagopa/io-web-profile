import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Esci da IO',
  description:
    'Se hai perso o hanno rubato il tuo dispositivo e hai una sessione attiva su IO, esci dall’app per mantenere i tuoi dati al sicuro.',
};
export default function LogOutLayout({ children }: Props) {
  return children;
}
