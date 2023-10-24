import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Entra su IO, l’app dei servizi pubblici',
  description:
    'Entra nel tuo profilo di IO per vedere i tuoi dati e ottenere le informazioni sull’accesso all’app',
};
export default function AccessLayout({ children }: Props) {
  return children;
}
