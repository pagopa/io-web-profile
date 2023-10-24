import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Vuoi bloccare l’accesso all’app IO?',
  description:
    'In questa pagina trovi le identità digitali che hai utilizzato per entrare su IO. Puoi verificarle e bloccare l’accesso all’app se non hai effettuato tu l’accesso.',
};
export default function LockAccessLayout({ children }: Props) {
  return children;
}
