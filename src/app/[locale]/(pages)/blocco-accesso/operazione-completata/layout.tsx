import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Hai bloccato l’accesso all’app IO',
  description:
    'Hai bloccato l’accesso all’app IO. Puoi sbloccarlo entrando in app con un’identità digitale con un livello di sicurezza 3 o con il codice di ripristino.',
};
export default function LockAccessCompleteLayout({ children }: Props) {
  return children;
}
