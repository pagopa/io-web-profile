import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Vuoi uscire da IO?',
  description:
    'Se hai perso il tuo dispositivo o non lo riconosci e hai una sessione attiva su IO, esci dall’app per mantenere i tuoi dati al sicuro.',
};
export default function LogOutConfirmLayout({ children }: Props) {
  return children;
}
